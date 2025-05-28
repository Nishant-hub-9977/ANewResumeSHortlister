import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, File, Loader2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface ResumeUploaderProps {
  onUploadComplete: (files: File[]) => void;
  multiple?: boolean;
  maxFiles?: number;
}

const ResumeUploader: React.FC<ResumeUploaderProps> = ({ 
  onUploadComplete, 
  multiple = true,
  maxFiles = 10
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedTypes.includes(file.type)) {
      return 'Invalid file type. Only PDF and Word documents are accepted.';
    }

    if (file.size > maxSize) {
      return 'File is too large. Maximum size is 5MB.';
    }

    return null;
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    
    const validFiles = acceptedFiles.filter(file => {
      const error = validateFile(file);
      if (error) {
        toast.error(error);
        return false;
      }
      return true;
    });
    
    if (validFiles.length > 0) {
      const newFiles = [...files, ...validFiles];
      const finalFiles = multiple 
        ? newFiles.slice(0, maxFiles) 
        : [validFiles[0]];
        
      setFiles(finalFiles);
      
      if (!multiple && finalFiles.length > 0) {
        handleUpload(finalFiles);
      }
    }
  }, [files, multiple, maxFiles]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxSize: 5 * 1024 * 1024 // 5MB
  });
  
  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    setError(null);
  };
  
  const handleUpload = async (filesToUpload: File[]) => {
    setIsUploading(true);
    setError(null);
    
    try {
      // Simulate upload delay for demo
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onUploadComplete(filesToUpload);
      toast.success(`${filesToUpload.length} resume${filesToUpload.length > 1 ? 's' : ''} uploaded successfully!`);
      
      if (multiple) {
        setFiles([]);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload resumes';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragActive 
            ? 'border-blue-500 bg-blue-50' 
            : error 
              ? 'border-red-300 bg-red-50'
              : 'border-gray-300 hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          {error ? (
            <>
              <AlertCircle className="h-10 w-10 text-red-500" />
              <p className="text-lg font-medium text-red-600">{error}</p>
            </>
          ) : (
            <>
              <Upload className="h-10 w-10 text-blue-500" />
              <p className="text-lg font-medium">
                {isDragActive ? 'Drop the files here' : 'Drag & drop resume files here'}
              </p>
            </>
          )}
          <p className="text-sm text-gray-500">or click to browse files</p>
          <p className="text-xs text-gray-400">
            Supports PDF, DOC, DOCX (Max size: 5MB)
          </p>
        </div>
      </div>
      
      {files.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700">
            {files.length} file{files.length > 1 ? 's' : ''} selected
          </h4>
          
          <ul className="mt-2 divide-y divide-gray-200 border border-gray-200 rounded-md">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between py-2 px-4 text-sm">
                <div className="flex items-center">
                  <File className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="truncate max-w-xs">{file.name}</span>
                  <span className="ml-2 text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-gray-400 hover:text-red-500"
                  disabled={isUploading}
                >
                  <X className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
          
          {multiple && (
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => handleUpload(files)}
                disabled={isUploading || files.length === 0}
                className="btn btn-primary"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>Upload {files.length} Resume{files.length > 1 ? 's' : ''}</>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeUploader;