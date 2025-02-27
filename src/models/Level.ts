import mongoose, { Schema } from "mongoose";

const levelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  label: { type: String, required: true },
  index:{ type: Number,require:true},
  description: { type: String, default: null },
  course_id: { 
    type:Schema.Types.ObjectId ,
    ref:"Course",
    required:true,
  }
},{
  timestamps:true,
});

const Level = mongoose.models.Level||mongoose.model("Level", levelSchema);
export default Level;