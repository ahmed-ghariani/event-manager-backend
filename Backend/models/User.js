const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, "A name is missing"]
    },
    email: {
        type: String,
        required: [ true, "An email is missing" ],
        unique: true,
        match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,9})+$/, "Email not valid" ]
    },
    password: {
        type: String,
        required: [ true , "A password is missing"],
    },
    role: {
        type: String,
        required: [ true, "A Role is missing"],
        enum: ['admin', 'user']
    }
});

userSchema.methods.checkPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};



 module.exports = mongoose.model("User",userSchema);