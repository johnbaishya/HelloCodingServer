import mongoose, { Schema } from "mongoose";

const codeFileSchema  = new mongoose.Schema({
    language:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"Language"
    },
    code:{type:String,required:true},
    filename:{type:String}
});

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  user_id:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },
  description: { type: String, default: null },
  platform_id:{
    type:Schema.Types.ObjectId,
    ref:"Platform",
    required:true,
  },
  files:{type:[codeFileSchema],required:true}
  
},{
  timestamps:true,
});

const Project = mongoose.models.Project||mongoose.model("Project", projectSchema);
export default Project;