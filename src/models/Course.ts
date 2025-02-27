import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  label: { type: String, required: true },
  description: { type: String, default: null },
  image:{type:String,required:false},
},{
  timestamps:true,
});

const Course = mongoose.models.Course||mongoose.model("Course", courseSchema);
export default Course;