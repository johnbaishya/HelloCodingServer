import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true,required:true },
  profile_pic:{type:String,required:false},
  role:{type:String,enum:["admin","user"],default:"user"},
  password: { type: String,required:true },
});

const User = mongoose.models.User||mongoose.model("User", userSchema);
export default User;