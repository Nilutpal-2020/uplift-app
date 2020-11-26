const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchemea = new Schema( {
    username: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchemea);

module.exports = User;