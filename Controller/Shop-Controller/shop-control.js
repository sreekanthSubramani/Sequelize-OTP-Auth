const User = require('../../Seq-DB/Usermodel')
const Users = require('../../Seq-DB/Usermodel')
const bcrypt = require('bcrypt')
const emailSender = require('./nodeMailerUse')
const ejs = require('ejs')
const path = require('path')

const otp = String(Math.floor(1000 + Math.random() * 9000));

exports.shopRender= (req, res, next)=>{
    res.render('Loginform.ejs', ({
        pageTitle : "Login Form",
        message :  req.flash('user created')
    }))
}

exports.signUpPage = (req, res)=>{
    
    res.render('Signupform.ejs', ({
        pageTitle : "Sign up page",
        message : req.flash('err')
    }))
}


exports.signUsersUp = (req, res)=>{
    const {password, cnfPassword,name, emailid} = req.body
    
    if(password !== cnfPassword){
        req.flash('err', "passwords don't match")
        return res.redirect('/signup')
    }

    Users.findOne({where : {email : emailid}})
    .then(user=>{
        if(!user){
        return bcrypt
                    .hash(password, 12)
                    .then(hashedPass=>{
                        return User.create({
                            name : name,
                            email : emailid,
                            password : hashedPass
                        })
                        .then(user=>{
                            req.flash('user created', 'Please login with details')
                            return res.redirect('/')
                        })
                    })
        }
        return res.redirect('/')

    })
    .catch(err=> console.log(err))  
}

exports.mainPageRenderer = (req, res)=>{
    res.render('MainPage.ejs', ({
        pageTitle: "Main Page Render"
    }))
}


exports.sendEmailContent = (req, res)=>{
    const paths = path.join(__dirname, '..', '..', 'views', 'htmlEmail.ejs');
   
    
        const {password, emailid} = req.body
        

        const data = {
            username : emailid || 'User',
            welcomeMsg : "Welcome to deepseek tribe !!",
            otpRender : otp || '0000'
        }


        Users.findOne({where : {email : emailid }})
        .then(user=>{
            if  (!user){
               return res.redirect('/signup')
            }
            return bcrypt
            .compare(password, user.password)
            .then(isMatch=>{
                console.log(password, user.password , 'Password Check !!!!')
                if(!isMatch){
                    return res.redirect('/')
                }
                    
                req.session.isLoggedIn = true,
                req.session.user = user
                req.session.save(err=>{
                    if(err){
                        console.log('Error by here ')
                        return res.redirect('/')
                    }

                    ejs.renderFile(paths, data, (err, html)=>{
                        if(err){
                            console.error("Ejs read error", err)
                        }

                        emailSender(emailid,'Welcome to Deepseekers',html)
                        .then(()=>{
                            console.log('Welcome email sent !!')
                            return res.redirect('/verifyOTP')
                        })
                        .catch(err=>{
                            console.log(err, "EJS ERROR")
                        })
                    })
                    console.log(err, "session error")
                })
            })
        })
        .catch(err=> console.log(err))
    }   


    exports.verifyOTP = (req, res)=>{
        res.render('verifyOtp.ejs', ({
            pageTitle : "Verify OTP",
            otpRender : otp
        }))
    }


    exports.postOTPPage = (req, res)=>{
        const {verifyOTP} = req.body
        if(verifyOTP == otp){
            return res.redirect('/mainPage')
        }

        if(verifyOTP !== otp){
            res.send('<h1> Sorry Error - OTP not verified !!</h1>')
        }
    }