const nodemailer = require('nodemailer')

const sendEmail = nodemailer.createTransport({
    service : 'gmail',
    auth :{
        user : 'deepseeksree@gmail.com',
        pass : "kwgr mwef ulej ujdr"
    }
})


const emailSender = (to, subject, html)=>{
    const mailOption = {
        from : 'deepseeksree@gmail.com',
        to,
        subject,
        html
    }

    return sendEmail.sendMail(mailOption)
    .then(info=>{
        console.log(info.response , "Email sent !!")
    })
    .catch(err=>{
        console.log(err)
    })
}

module.exports = emailSender