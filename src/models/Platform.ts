import mongoose, { Schema } from "mongoose";

const platformSchema = new mongoose.Schema({
  name: { type: String, required: true },
  label: { type: String, required: true },
  description:{type:String,default:""},
},{
  timestamps:true,
});

const Platform = mongoose.models.Platform||mongoose.model("Platform", platformSchema);
export default Platform;