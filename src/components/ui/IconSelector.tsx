import { useState } from 'react';

interface IconSelectorProps {
  onIconSelected: (icon: string | File | null) => void;
  currentIcon?: string | File | null;
  label?: string;
}

const defaultIcons = [
  { name: 'Folder', icon: '📁' },
  { name: 'Photos', icon: '📷' },
  { name: 'Gallery', icon: '🖼️' },
  { name: 'Collection', icon: '📚' },
  { name: 'Archive', icon: '🗂️' },
  { name: 'Memory', icon: '💭' },
];

export function IconSelector({ onIconSelected, currentIcon, label = 'Icon' }: IconSelectorProps) {
  const [selectedType, setSelectedType] = useState<'default' | 'upload' | null>(
    currentIcon ? (typeof currentIcon === 'string' ? 'default' : 'upload') : null
  );

  const handleDefaultIconSelect = (icon: string) => {
    onIconSelected(icon);
    setSelectedType('default');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onIconSelected(file);
      setSelectedType('upload');
    }
  };

  const handleRemoveIcon = () => {
    onIconSelected(null);
    setSelectedType(null);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} (Optional)
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Choose a default icon or upload your own image
        </p>
      </div>

      {/* Selection Type */}
      <div className="flex space-x-4">
        <button
          onClick={() => setSelectedType('default')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            selectedType === 'default'
              ? 'bg-dustyRose text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Default Icons
        </button>
        <button
          onClick={() => setSelectedType('upload')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            selectedType === 'upload'
              ? 'bg-dustyRose text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Upload Image
        </button>
        {currentIcon && (
          <button
            onClick={handleRemoveIcon}
            className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700"
          >
            Remove Icon
          </button>
        )}
      </div>

      {/* Default Icons */}
      {selectedType === 'default' && (
        <div className="grid grid-cols-3 gap-3">
          {defaultIcons.map((iconData, index) => (
            <button
              key={index}
              onClick={() => handleDefaultIconSelect(iconData.icon)}
              className={`p-4 text-center border rounded-lg transition-colors ${
                currentIcon === iconData.icon
                  ? 'border-dustyRose bg-dustyRose/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-1">{iconData.icon}</div>
              <div className="text-xs text-gray-600">{iconData.name}</div>
            </button>
          ))}
        </div>
      )}

      {/* File Upload */}
      {selectedType === 'upload' && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="icon-upload"
          />
          <label
            htmlFor="icon-upload"
            className="cursor-pointer"
          >
            <div className="text-gray-400 mb-2">
              <svg className="mx-auto h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-sm text-gray-600">
              Click to upload an image
            </p>
            <p className="text-xs text-gray-400 mt-1">
              PNG, JPG, WebP up to 2MB
            </p>
          </label>
        </div>
      )}

      {/* Current Icon Preview */}
      {currentIcon && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-2">Selected Icon:</p>
          <div className="flex items-center space-x-3">
            {typeof currentIcon === 'string' ? (
              <span className="text-3xl">{currentIcon}</span>
            ) : (
              <img
                src={URL.createObjectURL(currentIcon)}
                alt="Uploaded icon"
                className="w-12 h-12 object-cover rounded"
              />
            )}
            <div>
              <p className="text-sm text-gray-600">
                {typeof currentIcon === 'string' ? 'Default Icon' : currentIcon.name}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
