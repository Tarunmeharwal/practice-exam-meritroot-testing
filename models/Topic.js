

// import mongoose from "mongoose";

// const topicSchema = new mongoose.Schema({
//   name: String,
//   courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
//   slug: { type: String, unique: true },
//   createdAt: { type: Date, default: Date.now }
// });

// topicSchema.pre('save', function(next) {
//   if (this.isModified('name')) {
//     this.slug = this.name
//       .toLowerCase()
//       .replace(/\s+/g, '-')
//       .replace(/[^a-zA-Z0-9-]/g, '');
//   }
//   next();
// });

// export default mongoose.models.Topic || mongoose.model("Topic", topicSchema);


import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  slug: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
});

topicSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9-]/g, '');
  }
  next();
});

export default mongoose.models.Topic || mongoose.model('Topic', topicSchema);
