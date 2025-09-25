import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { SubcategoryForm } from './SubcategoryForm';
import { Subcategory } from '../types';

interface SubcategoryManagerProps {
  subcategories: Subcategory[];
  addSubcategory: () => void;
  removeSubcategory: (id: string) => void;
  updateSubcategory: (id: string, updates: Partial<Subcategory>) => void;
  errors: Record<string, string>;
}

export function SubcategoryManager({
  subcategories,
  addSubcategory,
  removeSubcategory,
  updateSubcategory,
  errors
}: SubcategoryManagerProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-sageGreen">Subcategories</h3>
        <Button
          type="button"
          color="secondary"
          size="sm"
          onClick={addSubcategory}
          className="flex items-center gap-2"
        >
          <PlusIcon className="w-4 h-4" />
          Add Subcategory
        </Button>
      </div>

      {subcategories.length === 0 ? (
        <div className="text-center py-8 text-dustyRose/70">
          <p className="text-sm">No subcategories added yet.</p>
          <p className="text-xs mt-1">Click "Add Subcategory" to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {subcategories.map((subcategory, index) => (
            <div
              key={subcategory.id}
              className="bg-champagneBeige/30 p-4 rounded-lg border border-dustyRose/20 shadow-photo-glue"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-sageGreen">
                  Subcategory {index + 1}
                </h4>
                <Button
                  type="button"
                  color="ghost"
                  size="sm"
                  onClick={() => removeSubcategory(subcategory.id)}
                  className="text-dustyRose hover:text-dustyRose/80 hover:bg-dustyRose/10"
                >
                  <TrashIcon className="w-4 h-4" />
                </Button>
              </div>
              
              <SubcategoryForm
                subcategory={subcategory}
                onUpdate={(updates) => updateSubcategory(subcategory.id, updates)}
                error={errors[`subcategory-${index}`]}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
