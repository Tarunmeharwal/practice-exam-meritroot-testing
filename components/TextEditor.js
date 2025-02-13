"use client";
import React, { useRef, useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const TextEditor = ({ value, onChange, height = 200 }) => {
  const editor = useRef(null);
  const [content, setContent] = useState(value || "");

  useEffect(() => {
    setContent(value || "");
  }, [value]);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
      height,
      uploader: {
        insertImageAsBase64URI: true,
      },
      image: {
        edit: true,
        upload: true,
        preview: true,
        defaultWidth: "auto",
      },
    }),
    [height]
  );

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1}
      onBlur={(newContent) => {
        setContent(newContent);
        onChange?.(newContent);
      }}
    />
  );
};

export default TextEditor;
