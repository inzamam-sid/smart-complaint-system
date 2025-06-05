const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
    },
    profilePicture: {
        type: String,
        default: null,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['student', 'faculty', 'admin'],
        default: 'student',
        required: true,
    },
    department: {
        type: String,
        required: function() {
            return this.role === 'student' || this.role === 'faculty';
        },

    }, 
}, {timestamps: true});

const User = mongoose.model("User", userSchema)

module.exports = User;