// "use client";
// import { useState } from "react";

// const OptionInput = ({ option, onChange }) => {
//   const [uploading, setUploading] = useState(false);

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
//     const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
//     if (!uploadPreset || !cloudName) {
//       alert("Cloudinary environment variables are not set");
//       return;
//     }
//     setUploading(true);
//     try {
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("upload_preset", uploadPreset);

//       const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.error?.message || "Failed to upload image to Cloudinary");
//       }
//       const data = await res.json();
//       const imageUrl = data.secure_url;
//       if (!imageUrl) {
//         throw new Error("Invalid Cloudinary response: No image URL returned");
//       }
//       onChange({ ...option, image: imageUrl });
//     } catch (error) {
//       console.error("Option image upload error:", error);
//       alert(error.message);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="border p-4 mb-4">
//       <input
//         type="text"
//         placeholder="Option text"
//         value={option.text}
//         onChange={(e) => onChange({ ...option, text: e.target.value })}
//         className="mb-2 p-2 border rounded w-full"
//       />
//       <div>
//         <label className="block mb-1">Upload Option Image:</label>
//         <input type="file" onChange={handleImageUpload} />
//         {uploading && <p>Uploading image...</p>}
//         {option.image && (
//           <img src={option.image} alt="Option" className="mt-2" style={{ width: "100px" }} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default OptionInput;
