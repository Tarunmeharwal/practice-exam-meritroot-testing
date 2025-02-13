// "use client";
// import dynamic from 'next/dynamic';

// const Editor = dynamic(
//   () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
//   { ssr: false }
// );

// const TextEditor = ({ value, onChange, height = 200 }) => {
//   return (
//     <Editor
//     apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
//       value={value}
//       onEditorChange={onChange}
//       init={{
//         height: height,
//         menubar: true,
//         plugins: "image",
//         toolbar:
//           "undo redo | formatselect | bold italic | alignleft aligncenter alignright | image",
//         file_picker_types: "image",
//         images_upload_handler: (blobInfo, success, failure) => {
//           // Create a new FormData object and append the file data.
//           const formData = new FormData();
//           formData.append("file", blobInfo.blob());
//           // Append your Cloudinary upload preset
//           formData.append("upload_preset", "your-upload-preset");

//           // Upload the image to Cloudinary
//           fetch("https://api.cloudinary.com/v1_1/your-cloud-name/image/upload", {
//             method: "POST",
//             body: formData,
//           })
//             .then((response) => response.json())
//             .then((data) => {
//               if (data.secure_url) {
//                 // On success, pass Cloudinary's secure URL back to TinyMCE.
//                 success(data.secure_url);
//               } else {
//                 // If Cloudinary returns an error, pass the error message back.
//                 failure(
//                   `Upload failed: ${
//                     data.error && data.error.message
//                       ? data.error.message
//                       : "Unknown error"
//                   }`
//                 );
//               }
//             })
//             .catch((error) => {
//               failure("Upload error: " + error);
//             });
//         },
//       }}
//     />
//   );
// };

// export default TextEditor;


"use client";
import dynamic from "next/dynamic";
import { useState } from "react";

const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  { ssr: false }
);

const TextEditor = ({ value, onChange, height = 200 }) => {
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (blobInfo) => {
    // Use the correct environment variable name for the upload preset
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!uploadPreset || !cloudName) {
      throw new Error("Cloudinary environment variables are not set");
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", blobInfo.blob(), blobInfo.filename());
      formData.append("upload_preset", uploadPreset);

      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        { method: "POST", body: formData }
      );

      if (!cloudinaryResponse.ok) {
        const errorData = await cloudinaryResponse.json();
        throw new Error(errorData.error?.message || "Failed to upload image to Cloudinary");
      }

      const cloudinaryData = await cloudinaryResponse.json();
      const imageUrl = cloudinaryData.secure_url;
      if (!imageUrl) {
        throw new Error("Invalid Cloudinary response: No image URL returned");
      }
      return imageUrl;
    } catch (error) {
      console.error("Upload error:", error);
      throw new Error(error.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative">
      {uploading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <span className="text-white">Uploading...</span>
        </div>
      )}
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        value={value}
        onEditorChange={onChange}
        init={{
          height,
          menubar: true,
          plugins: "image",
          toolbar: "undo redo | formatselect | bold italic | alignleft aligncenter alignright | image",
          images_upload_handler: handleImageUpload,
          file_picker_types: "image",
        }}
      />
    </div>
  );
};

export default TextEditor;
