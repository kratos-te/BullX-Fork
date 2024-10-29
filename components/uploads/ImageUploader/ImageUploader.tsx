"use client";

import FileUploadIcon from "@/components/icons/FileUploadIcon";
import {
  useRef,
  useState,
  DragEventHandler,
  FormEventHandler,
  ChangeEventHandler,
} from "react";

export type ImageUploaderProps = {
  onChangeFile(file: File): void;
};

export default function ImageUploader({ onChangeFile }: ImageUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file =
      event.target.files && event.target.files.length > 0
        ? event.target.files[0]
        : null;

    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      onChangeFile(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];

    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      onChangeFile(file);
    } else {
      alert("Please drop a valid image file.");
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      className="cursor-pointer rounded-md border border-dashed border-gray-400 px-6 py-11"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <div
        className="flex cursor-pointer flex-col items-center gap-4"
        onClick={handleClick}
      >
        <FileUploadIcon width={40} height={40} className="text-gray-400" />

        {selectedFile ? (
          <p className="text-base font-bold leading-[30px] text-gray-400 md:text-xl">
            {selectedFile.name}
          </p>
        ) : (
          <>
            <p className="text-base font-bold leading-[30px] text-gray-400 md:text-xl">
              Select Files to Upload
            </p>
            <p className="text-sm leading-normal text-gray-400 md:text-base">
              or Drag and drop, Copy and Paste Files
            </p>
          </>
        )}
      </div>
    </div>
  );
}
