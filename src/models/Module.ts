import mongoose, { Schema } from "mongoose";

const moduleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  label: { type: String, required: true },
  index:{ type: Number,require:true},
  description: { type: String, default: null },
  content:{type:String, default:"" },
  type:{type:String,required:true,enum:["common","quiz"],default:"common"},
  course_id: { 
    type:Schema.Types.ObjectId ,
    ref:"Course",
    required:true,
  },
  level_id:{
    type:Schema.Types.ObjectId,
    ref:"Level",
    required:true,
  },
},{
  timestamps:true,
  discriminatorKey:"type",
});

const QuizOptionSchema = new mongoose.Schema({
  name: { type: String, required: true },  // Option name
  content: { type: String, required: true }, // Option content
});

const quizModuleSchema = new mongoose.Schema({
  question:{type:String,required:true},
  options: {type:[QuizOptionSchema],required:true},
  correct_answer:{type:String,required:true}
})

const Module = mongoose.models.Module||mongoose.model("Module", moduleSchema);
const QuizModule = Module.discriminator("quiz",quizModuleSchema);

export {Module,QuizModule};