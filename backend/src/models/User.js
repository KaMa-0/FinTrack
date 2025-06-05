const mongoose = require('mongoose'); // Imports mongoose library for MongoDB interactions
const bcrypt = require('bcryptjs'); // Imports bcrypt for password hashing

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }, // Defines email field as required and unique
    password: { type: String, required: true }, // Defines password field as required
    createdAt: { type: Date, default: Date.now } // Adds timestamp with default value of current time
});

// Password hashing middleware that runs before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) { // Only hash the password if it's been modified
        this.password = await bcrypt.hash(this.password, 10); // Hash password with 10 rounds of salting
    }
    next(); // Continue with the save operation
});

module.exports = mongoose.model('User', userSchema);