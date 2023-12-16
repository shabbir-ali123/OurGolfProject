// src/components/FileUpload.tsx
import React, { ChangeEvent, useState } from 'react';

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const onUpload = async () => {
    // Handle file upload logic here
    if (selectedFile) {
      console.log('File uploaded:', selectedFile.name, selectedFile.size, selectedFile.type);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <div className="mb-4">
        <label htmlFor="file" className="block text-gray-700 text-sm font-bold mb-2">
          Select File
        </label>
        <input
          type="file"
          id="file"
          onChange={onFileChange}
          className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        onClick={onUpload}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
