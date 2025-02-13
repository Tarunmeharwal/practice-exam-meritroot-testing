// /pages/api/upload.js or /app/api/upload/route.js (Next.js 13+)
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // We use formidable instead
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const form = new formidable.IncomingForm();
      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error parsing the file");
        }

        // The uploaded file is under files.file (since we used formData.append('file', ...))
        const uploadedFile = files.file;
        const oldPath = uploadedFile.filepath;
        const newFilename = uploadedFile.originalFilename;

        // Save it to the "public/uploads" folder, for example
        const newPath = path.join(process.cwd(), "public", "uploads", newFilename);
        fs.rename(oldPath, newPath, (renameErr) => {
          if (renameErr) {
            console.error(renameErr);
            return res.status(500).send("Error saving file");
          }

          // Return a JSON object with the "imageUrl"
          return res.status(200).json({
            imageUrl: `/uploads/${newFilename}`, // The public URL path
          });
        });
      });
    } catch (error) {
      console.error("Upload error:", error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    // Handle any other HTTP method
    res.status(405).send("Method Not Allowed");
  }
}
