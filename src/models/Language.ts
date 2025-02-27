import mongoose, { Schema } from "mongoose";

const languageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  label: { type: String, required: true },
  description:{type:String,default:""},
},{
  timestamps:true,
});

const Language = mongoose.models.Language||mongoose.model("Language", languageSchema);
export default Language;