const express = require('express');
const contact_detail = require('./src/models/contactDetails');
const nodemailer = require('nodemailer');
const cors = require('cors');

require('./src/db/connection');
require ('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "timeriders9@gmail.com",
        pass: "dtcglerphpqfhjtc"
    },
    tls: {
        rejectUnauthorized: false
    }
});

app.get('/', (req, res) => {
    res.status(200).send('The API is Live');
});

app.get('/savedetails', async (req, res) => {
    res.status(200).send('The Endpoint to Save the Form\'s Details');
});

app.post('/savedetails', async (req, res) => {

    try {
        
        const contact = new contact_detail(req.body);
        
        await contact.save();
        
        let mailOptions = {
            from: "timeriders9@gmail.com",
            to: "chetan.bhardwaj6411@gmail.com",
            subject: `${req.body.subject}`,
            text: `
Name: ${req.body.name}
Email: ${req.body.email}
Message: ${req.body.message}
`
        }

        transporter.sendMail(mailOptions, (err, success)=>{
            if(err) {
                console.log(err);
            }
            else {
                console.log("Mail Sent Successfully!");
                console.log("\nE-Mail Details: ");
                console.log("\t Name: " + req.body.name);
                console.log("\t Email: " + req.body.email);
                console.log("\t Subject: " + req.body.subject);
                console.log("\t Message: " + req.body.message);
            }
        });

        res.status(200).json({
            success: true
        });

    } catch (error) {
        res.status(400).json({
            success: false
        });
    }

});

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});

