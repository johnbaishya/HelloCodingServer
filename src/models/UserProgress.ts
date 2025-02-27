import mongoose, { Schema } from "mongoose";

const userProgressSchema = new mongoose.Schema({
  user_id:{type:Schema.Types.ObjectId,required:true},
  course_id: { 
    type:Schema.Types.ObjectId ,
    ref:"Course",
    required:true,
  },
  latest_completed_module:{type:Number, default:0 },
  latest_module_id: {
    type:Schema.Types.ObjectId,
    ref:"Module",
    required:true,
  },
},{
  timestamps:true,
});


const UserProgress = mongoose.models.UserProgress||mongoose.model("UserProgress", userProgressSchema);


export default UserProgress;