import { useCallback, useState } from 'react';

interface FileUploadZoneProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  acceptedTypes?: string[];
  className?: string;
}

export function FileUploadZone({ 
  onFilesSelected, 
  maxFiles = 50, 
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  className = ''
}: FileUploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      acceptedTypes.includes(file.type)
    );
    
    if (files.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files at once.`);
      return;
    }
    
    onFilesSelected(files);
  }, [onFilesSelected, maxFiles, acceptedTypes]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(file => 
      acceptedTypes.includes(file.type)
    );
    
    if (files.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files at once.`);
      return;
    }
    
    onFilesSelected(files);
  }, [onFilesSelected, maxFiles, acceptedTypes]);

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragOver 
          ? 'border-dustyRose bg-dustyRose/5' 
          : 'border-gray-300 hover:border-gray-400'
      } ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="space-y-4">
        <div className="text-gray-600">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        
        <div>
          <p className="text-lg font-medium text-gray-900">
            Drop your pictures here
          </p>
          <p className="text-sm text-gray-500 mt-1">
            or click to browse files
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Supports JPEG, PNG, WebP (max {maxFiles} files)
          </p>
        </div>
        
        <input
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileInput}
          className="hidden"
          id="file-upload"
        />
        
        <label
          htmlFor="file-upload"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-dustyRose hover:bg-dustyRose/90 cursor-pointer"
        >
          Choose Files
        </label>
      </div>
    </div>
  );
}
