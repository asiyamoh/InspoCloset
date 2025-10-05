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

export function IconSelector({ onIconSelected, currentIcon }: IconSelectorProps) {
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
      {/* Current Icon Preview */}
      {currentIcon && (
        <div className="text-center p-4 bg-champagneBeige/30 rounded-lg border border-dustyRose/20">
          <div className="flex items-center justify-center space-x-3">
            {typeof currentIcon === 'string' ? (
              <span className="text-3xl">{currentIcon}</span>
            ) : (
              <img
                src={URL.createObjectURL(currentIcon)}
                alt="Uploaded icon"
                className="w-10 h-10 object-cover rounded"
              />
            )}
            <div className="text-left">
              <p className="text-sm font-medium text-gray-700">
                {typeof currentIcon === 'string' ? 'Default Icon' : currentIcon.name}
              </p>
              <button
                onClick={handleRemoveIcon}
                className="text-xs text-dustyRose hover:text-dustyRose/80 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Selection Options */}
      <div className="flex space-x-2">
        <button
          onClick={() => setSelectedType('default')}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                selectedType === 'default'
                  ? 'bg-skyBlue text-white'
                  : 'bg-champagneBeige/50 text-dustyRose hover:bg-champagneBeige/70'
              }`}
        >
          Choose Icon
        </button>
        <button
          onClick={() => setSelectedType('upload')}
          className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            selectedType === 'upload'
              ? 'bg-skyBlue text-white'
              : 'bg-champagneBeige/50 text-dustyRose hover:bg-champagneBeige/70'
          }`}
        >
          Upload Image
        </button>
      </div>

      {/* Default Icons */}
      {selectedType === 'default' && (
        <div className="grid grid-cols-3 gap-2">
          {defaultIcons.map((iconData, index) => (
            <button
              key={index}
              onClick={() => handleDefaultIconSelect(iconData.icon)}
              className={`p-3 text-center border rounded-lg transition-colors hover:scale-105 bg-ivoryCream ${
                currentIcon === iconData.icon
                  ? 'border-skyBlue bg-skyBlue/10'
                  : 'border-dustyRose/30 hover:border-dustyRose/50'
              }`}
            >
              <div className="text-2xl mb-1">{iconData.icon}</div>
              <div className="text-xs text-dustyRose/70">{iconData.name}</div>
            </button>
          ))}
        </div>
      )}

      {/* File Upload */}
      {selectedType === 'upload' && (
        <div className="border-2 border-dashed border-dustyRose/40 rounded-lg p-6 text-center hover:border-dustyRose/60 transition-colors bg-ivoryCream">
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
            <div className="text-dustyRose/60 mb-2">
              <svg className="mx-auto h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-sm text-dustyRose">
              Click to upload an image
            </p>
            <p className="text-xs text-dustyRose/60 mt-1">
              PNG, JPG, WebP up to 2MB
            </p>
          </label>
        </div>
      )}
    </div>
  );
}
