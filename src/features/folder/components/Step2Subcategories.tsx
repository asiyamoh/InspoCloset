import { IconSelector } from '../../../components/ui/IconSelector';
import { FormInput } from '../../../components/ui/FormInput';
import { Button } from '../../../components/ui/Button';
import { Subcategory } from '../types';

interface Step2SubcategoriesProps {
  subcategories: Subcategory[];
  onSubcategoriesChange: (subcategories: Subcategory[]) => void;
  errors: Record<string, string>;
  hasSubcategories: boolean;
  onToggleHasSubcategories: (value: boolean) => void;
}

export function Step2Subcategories({
  subcategories,
  onSubcategoriesChange,
  errors,
  hasSubcategories,
  onToggleHasSubcategories
}: Step2SubcategoriesProps) {
  const addSubcategory = () => {
    const newSubcategory: Subcategory = {
      id: `subcategory-${Date.now()}`,
      name: '',
      icon: null,
      pictures: []
    };
    onSubcategoriesChange([...subcategories, newSubcategory]);
  };

  const removeSubcategory = (id: string) => {
    onSubcategoriesChange(subcategories.filter(sub => sub.id !== id));
  };

  const updateSubcategory = (id: string, updates: Partial<Subcategory>) => {
    onSubcategoriesChange(
      subcategories.map(sub =>
        sub.id === id ? { ...sub, ...updates } : sub
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Subcategories
        </h3>
        <p className="text-sm text-gray-600">
          Add subcategories to organize your photos. Each subcategory can have its own name and icon.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <label htmlFor="has-subcategories" className="text-sm font-medium text-gray-700">
          Do you want to add subcategories?
        </label>
        <input
          type="checkbox"
          id="has-subcategories"
          checked={hasSubcategories}
          onChange={(e) => onToggleHasSubcategories(e.target.checked)}
          className="h-4 w-4 text-dustyRose focus:ring-dustyRose border-gray-300 rounded"
        />
      </div>

      {hasSubcategories && (
        <>
          {/* Subcategories List */}
          <div className="space-y-4">
            {subcategories.map((subcategory, index) => (
              <div key={subcategory.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-gray-700">
                    Subcategory {index + 1}
                  </h4>
                  <button
                    onClick={() => subcategory.id && removeSubcategory(subcategory.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Subcategory Name */}
                  <FormInput
                    label="Subcategory Name"
                    value={subcategory.name}
                    onChange={(e) => updateSubcategory(subcategory.id!, { name: e.target.value })}
                    placeholder="Enter subcategory name..."
                    error={errors[`subcategory-${index}`]}
                    required
                  />

                  {/* Subcategory Icon */}
                  <IconSelector
                    label="Subcategory Icon"
                    currentIcon={subcategory.icon}
                    onIconSelected={(icon) => updateSubcategory(subcategory.id!, { icon })}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Add Subcategory Button */}
          <Button
            onClick={addSubcategory}
            outline
            className="w-full"
          >
            + Add Subcategory
          </Button>
        </>
      )}

      {/* Instructions */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-green-800">
              Ready for Photos?
            </h4>
            <p className="text-sm text-green-700 mt-1">
              Next, you'll be able to upload photos for each subcategory and add tags to help organize them. You can upload multiple photos at once and add individual tags to each photo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
