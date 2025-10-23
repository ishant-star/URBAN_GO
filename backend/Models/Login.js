import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    need:{
        type:String,
    },
})

const Login = mongoose.model('Login',loginSchema);

export default Login;