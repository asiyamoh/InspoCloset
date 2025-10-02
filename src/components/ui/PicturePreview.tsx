import { useState } from 'react';

interface PicturePreviewProps {
  file: File;
  index: number;
  onRemove: (index: number) => void;
  onTagsChange: (index: number, tags: string[]) => void;
  suggestedTags: string[];
}

export function PicturePreview({ 
  file, 
  index, 
  onRemove, 
  onTagsChange, 
  suggestedTags 
}: PicturePreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  // Create preview URL when component mounts
  useState(() => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  });

  const handleAddTag = (tag: string) => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      const newTags = [...tags, tag.trim()];
      setTags(newTags);
      onTagsChange(index, newTags);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
    onTagsChange(index, newTags);
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag(tagInput);
      setTagInput('');
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex items-start space-x-4">
        {/* Picture Thumbnail */}
        <div className="flex-shrink-0">
          <img
            src={previewUrl}
            alt={file.name}
            className="w-20 h-20 object-cover rounded-lg border border-gray-200"
          />
        </div>
        
        {/* Picture Info and Tags */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-900 truncate">
              {file.name}
            </h4>
            <button
              onClick={() => onRemove(index)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mb-3">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
          
          {/* Suggested Tags */}
          {suggestedTags.length > 0 && (
            <div className="mb-3">
              <p className="text-xs text-gray-600 mb-2">Suggested tags:</p>
              <div className="flex flex-wrap gap-1">
                {suggestedTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleAddTag(tag)}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Current Tags */}
          {tags.length > 0 && (
            <div className="mb-3">
              <p className="text-xs text-gray-600 mb-2">Tags:</p>
              <div className="flex flex-wrap gap-1">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-dustyRose text-white rounded-full flex items-center gap-1"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="text-white hover:text-gray-200"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Tag Input */}
          <div>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleTagInputKeyPress}
              placeholder="Add tags (press Enter or comma to add)"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dustyRose focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              Press Enter or comma to add tags
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
