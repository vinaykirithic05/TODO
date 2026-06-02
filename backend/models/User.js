// backend/models/User.js
import mongoose from "mongoose";
import bcryptjs from 'bcryptjs'

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, trim: true, minlength: 3 },
        email: { type: String, required: true, unique: true, lowercase: true ,trim : true},
        password : {type : String , required :true ,select : false}
    }
    ,{timestamps:true}
)
// Pre Save Middleware to Hash the password which runs automatically before it saves the document in the database
userSchema.pre('save',async function () {
    //Check if the password is modified
    if(!this.isModified('password')){
        return ; 
        // if not modified ,bypass hashing and move on
    }
    try {
        // Generate a secure salt (rounds : 10)
        const salt = await bcryptjs.genSalt(10);
        // Hashing the plain-text password using the salt
        this.password = await bcryptjs.hash(this.password,salt)
       
    
    } catch (error) {
       throw error
    }
})
// Comparing the Password
userSchema.methods.comparePassword = async function(enteredPassword){
    try {
        return await bcryptjs.compare(enteredPassword,this.password)
    } catch (error) {
        return false;
    }
}

const User = mongoose.model('User',userSchema)
export default User;