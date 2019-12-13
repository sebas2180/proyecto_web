var nodemailer = require('nodemailer');
// email sender function
exports.sendEmail = function(req, res){
// Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'sebastianbatalla1@gmail.com',
            pass: 'Asturias12@'
        }
    });
// Definimos el email
var mailOptions = {
    from: 'sebastianbatalla1@gmail.com',
    to: 'destinatario@gmail.com',
    subject: 'Reserva de prueba',
    text: 'Contenido del email'
};
// Enviamos el email
transporter.sendMail(mailOptions, function(error, info){
    if (error){
        console.log(error);
        res.send(500, err.message);
    } else {
        console.log("Email sent");
        res.status(200).jsonp(req.body);
    }
});
};