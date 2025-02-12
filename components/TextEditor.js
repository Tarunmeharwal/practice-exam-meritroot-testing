"use client";
import dynamic from 'next/dynamic';

const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  { ssr: false }
);

const TextEditor = ({ value, onChange, height = 200 }) => {
  return (
    <Editor
      apiKey="8bz2pqlufyeuxaxloptr7cmldvgmopvouunycz781sf688ut"
      value={value}
      onEditorChange={onChange}
      init={{
        height: height,
        menubar: true,
        plugins: "image",
        toolbar:
          "undo redo | formatselect | bold italic | alignleft aligncenter alignright | image",
        file_picker_types: "image",
        images_upload_handler: (blobInfo, success, failure) => {
          // Create a new FormData object and append the file data.
          const formData = new FormData();
          formData.append("file", blobInfo.blob());
          // Append your Cloudinary upload preset
          formData.append("upload_preset", "your-upload-preset");

          // Upload the image to Cloudinary
          fetch("https://api.cloudinary.com/v1_1/your-cloud-name/image/upload", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.secure_url) {
                // On success, pass Cloudinary's secure URL back to TinyMCE.
                success(data.secure_url);
              } else {
                // If Cloudinary returns an error, pass the error message back.
                failure(
                  `Upload failed: ${
                    data.error && data.error.message
                      ? data.error.message
                      : "Unknown error"
                  }`
                );
              }
            })
            .catch((error) => {
              failure("Upload error: " + error);
            });
        },
      }}
    />
  );
};

export default TextEditor;
