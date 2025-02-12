
// import mongoose from 'mongoose';

// const subtopicSchema = new mongoose.Schema({
//   name: String,
//   slug: String,
//   topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
// });

// subtopicSchema.pre('save', function (next) {
//   if (this.isModified('name')) {
//     this.slug = this.name
//       .toLowerCase()
//       .replace(/\s+/g, '-') // Replace spaces with -
//       .replace(/[^a-z0-9-]/g, ''); // Remove special characters
//   }
//   next();
// });

// export default mongoose.models.Subtopic || mongoose.model('Subtopic', subtopicSchema);