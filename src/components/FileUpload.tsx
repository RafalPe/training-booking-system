import React, { useRef } from 'react';
import DeleteIcon from './DeleteIcon';

interface FileUploadProps {
  value: File | null;
  onChange: (file: File | null) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    onChange(null);
  };

  return (
    <div
      onClick={handleClick}
      className={`border-brand-light flex w-full cursor-pointer flex-col items-center justify-center rounded-md border bg-white transition-colors hover:bg-purple-50 ${
        value ? 'py-4' : 'p-9'
      }`}
    >
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        onChange={handleFileChange}
        accept="image/*"
      />
      {value ? (
        <div className="flex items-center gap-2">
          <span className="text-brand-purple text-md font-medium">{value.name}</span>
          <DeleteIcon onClick={handleRemove} />
        </div>
      ) : (
        <p className="text-md font-normal text-gray-500">
          <span className="text-brand-purple text-md font-normal underline">Upload a file</span>
          <span className="hidden md:inline"> or drag and drop here</span>
        </p>
      )}
    </div>
  );
};
