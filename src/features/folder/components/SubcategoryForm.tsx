import { useState } from 'react';
import { FormInput } from '@/components/ui/FormInput';
import { Button } from '@/components/ui/Button';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Subcategory } from '../types';

interface SubcategoryFormProps {
  subcategory: Subcategory;
  onUpdate: (updates: Partial<Subcategory>) => void;
  error?: string;
}

export function SubcategoryForm({ subcategory, onUpdate, error }: SubcategoryFormProps) {
  const [newTag, setNewTag] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ name: e.target.value });
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpdate({ picture: file });
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !subcategory.tags.includes(newTag.trim())) {
      onUpdate({ tags: [...subcategory.tags, newTag.trim()] });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onUpdate({ tags: subcategory.tags.filter(tag => tag !== tagToRemove) });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="space-y-4">
      {/* Subcategory Name */}
      <FormInput
        label="Subcategory Name"
        value={subcategory.name}
        onChange={handleNameChange}
        placeholder="Enter subcategory name..."
        error={error}
        required
      />

      {/* Picture Upload */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-sageGreen">
          Picture (Optional)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handlePictureChange}
          className="block w-full text-sm text-sageGreen file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-dustyRose/10 file:text-dustyRose hover:file:bg-dustyRose/20"
        />
        {subcategory.picture && (
          <p className="text-xs text-dustyRose/70">
            {typeof subcategory.picture === 'string' ? subcategory.picture : subcategory.picture.name}
          </p>
        )}
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-sageGreen">
          Tags (Optional)
        </label>
        
        {/* Add Tag Input */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a tag..."
            className="flex-1 px-3 py-2 text-sm text-sageGreen bg-champagneBeige/50 border border-dustyRose/30 rounded-lg focus:ring-2 focus:ring-skyBlue focus:border-skyBlue placeholder-dustyRose/60"
          />
          <Button
            type="button"
            color="secondary"
            size="sm"
            onClick={handleAddTag}
            disabled={!newTag.trim()}
          >
            <PlusIcon className="w-4 h-4" />
          </Button>
        </div>

        {/* Tags Display */}
        {subcategory.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {subcategory.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-1 bg-skyBlue/20 text-skyBlue text-xs rounded-full"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-dustyRose transition-colors"
                >
                  <XMarkIcon className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
