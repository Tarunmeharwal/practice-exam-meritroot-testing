// import mongoose from "mongoose";

// const courseSchema = new mongoose.Schema({
//   name: String,
//   slug: { type: String, unique: true },
//   createdAt: { type: Date, default: Date.now }
// });

// courseSchema.pre('save', function(next) {
//   if (this.isModified('name')) {
//     this.slug = this.name
//       .toLowerCase()
//       .replace(/\s+/g, '-')
//       .replace(/[^a-zA-Z0-9-]/g, '');
//   }
//   next();
// });

// export default mongoose.models.Course || mongoose.model("Course", courseSchema);


import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
});

courseSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9-]/g, '');
  }
  next();
});

export default mongoose.models.Course || mongoose.model('Course', courseSchema);
