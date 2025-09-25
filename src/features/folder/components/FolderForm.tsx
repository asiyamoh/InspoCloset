import { FormEvent } from 'react';
import { FormInput } from '@/components/ui/FormInput';
import { Toggle } from '@/components/ui/Toggle';
import { Button } from '@/components/ui/Button';
import { ModalActions } from '@/components/ui/Modal';
import { SubcategoryManager } from './SubcategoryManager';
import { FolderFormData, Subcategory } from '../types';

interface FolderFormProps {
  formData: FolderFormData;
  setFormData: (data: FolderFormData) => void;
  subcategories: Subcategory[];
  addSubcategory: () => void;
  removeSubcategory: (id: string) => void;
  updateSubcategory: (id: string, updates: Partial<Subcategory>) => void;
  onSubmit: (data: FolderFormData) => void;
  isSubmitting: boolean;
  errors: Record<string, string>;
}

export function FolderForm({
  formData,
  setFormData,
  subcategories,
  addSubcategory,
  removeSubcategory,
  updateSubcategory,
  onSubmit,
  isSubmitting,
  errors
}: FolderFormProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleHasSubcategoriesChange = (checked: boolean) => {
    setFormData({
      ...formData,
      hasSubcategories: checked,
      subcategories: checked ? subcategories : []
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Folder Name */}
      <FormInput
        label="Folder Name"
        value={formData.name}
        onChange={handleNameChange}
        placeholder="Enter folder name..."
        error={errors.name}
        required
      />

      {/* Has Subcategories Toggle */}
      <Toggle
        label="Has Subcategories?"
        description="Add subcategories to organize your folder content"
        checked={formData.hasSubcategories}
        onChange={handleHasSubcategoriesChange}
      />

      {/* Subcategories Section */}
      {formData.hasSubcategories && (
        <SubcategoryManager
          subcategories={subcategories}
          addSubcategory={addSubcategory}
          removeSubcategory={removeSubcategory}
          updateSubcategory={updateSubcategory}
          errors={errors}
        />
      )}

      {/* Error Message */}
      {errors.general && (
        <div className="p-3 bg-dustyRose/10 border border-dustyRose/20 rounded-lg">
          <p className="text-sm text-dustyRose">{errors.general}</p>
        </div>
      )}

      {/* Submit Buttons */}
      <ModalActions>
        <Button
          type="button"
          color="ghost"
          onClick={() => setFormData({ name: '', hasSubcategories: false, subcategories: [] })}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          color="primary"
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Folder'}
        </Button>
      </ModalActions>
    </form>
  );
}
