import React, { useRef, useState } from 'react';
interface FileUploadProps {
  onChange: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onChange(file);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="border-brand-light flex w-full cursor-pointer flex-col items-center justify-center rounded-md border bg-white p-9 transition-colors hover:bg-purple-50"
    >
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        onChange={handleFileChange}
        accept="image/*"
      />
      {fileName ? (
        <p className="text-brand-purple text-md font-medium">{fileName}</p>
      ) : (
        <p className="text-md font-normal text-gray-500">
          <span className="text-brand-purple text-md font-normal underline">Upload a file</span> or
          drag and drop here
        </p>
      )}
    </div>
  );
};
