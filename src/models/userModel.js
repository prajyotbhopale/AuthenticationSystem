import mongoose from 'mongoose';

const userScehma = new mongoose.Schema({
        username:{
            type:String,
            required:[true, "Please provide a username"],
            unique:true
        },
        email:{
            type:String,
            required:[true, "Please provide an email"],
            unique:true
        },
        password:{
            type:String,
            required:[true, "Please provide a password"],
        },
        isVerified:{
            type:Boolean,
            default:false
        },
        isAdmin:{
            type:Boolean,
            default:false
        },
        forgotPasswordToken:String,
        forgotPasswordExiry:Date,
        verifyToken:String,
        verifyTokenExpiry:Date
})

const User = mongoose.models.users || mongoose.model("users", userScehma);

export default User;