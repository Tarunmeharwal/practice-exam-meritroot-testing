// import mongoose from 'mongoose';

// const questionSchema = new mongoose.Schema({
//   question: { type: String, required: true },
//   options: [String],
//   correctAnswer: { type: mongoose.Schema.Types.Mixed, required: true },
//   hint: String,
//   solution: String,
//   tips: String,
//   formula: String,
//   questionType: String,
//   questionLevel: String,
//   image: { type: String },
//   topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// export default mongoose.models.Question || mongoose.model('Question', questionSchema);


import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  image: { type: String } // Optional image for the option
});

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  questionImage: { type: String }, // Optional image for the question
  options: [optionSchema],
  correctAnswer: { type: mongoose.Schema.Types.Mixed, required: true },
  hint: String,
  solution: String,
  tips: String,
  formula: String,
  questionType: String,
  questionLevel: String,
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Question || mongoose.model('Question', questionSchema);
