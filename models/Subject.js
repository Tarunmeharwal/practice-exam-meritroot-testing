// import mongoose from "mongoose";

// const subjectSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   slug: { type: String, required: true, unique: true }, // ✅ Make slug required
//   courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// // Ensure slug is always generated
// subjectSchema.pre('validate', function (next) {
//   if (this.isModified('name') || this.isNew) {
//     this.slug = this.name
//       .toLowerCase()
//       .replace(/\s+/g, '-') // Replace spaces with '-'
//       .replace(/[^a-zA-Z0-9-]/g, ''); // Remove special characters
//   }
//   next();
// });

// export default mongoose.models.Subject || mongoose.model("Subject", subjectSchema);
