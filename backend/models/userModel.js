const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: [true, "please add the username"] },
  email: { type: String, required: [true, "please add user email address"], unique: [true, "email address already taken"] },
  password: { type: String, required: [true, "please add the user password"] },
}, {
    timestamps: true,
});

// Create a model using the schema
const User = mongoose.model('User', userSchema);

// Export the model for use in other parts of the application
module.exports = User;
