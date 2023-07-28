const mongoose = require('mongoose');
const validator = require('validator');

const contact_detailsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [1, "Name cannot have 0 characters"],
        maxLength: [30, "Name cannot have more than 30 characters"]
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Please enter a valid email id");
            }
        }
    },
    subject: {
        type: String,
        required: true,
        minLength: [2, "Subject cannot have less than 2 characters"],
        maxLength: [100, "Subject cannot have more than 100 characters"]
    },
    message: {
        type: String,
        required: true,
        minLength: [2, "Message cannot have 0 characters"],
        maxLength: [1600, "Message cannot have more than 1600 characters"]
    }
});

const contact_detail = new mongoose.model("contact_detail", contact_detailsSchema);

module.exports = contact_detail;



