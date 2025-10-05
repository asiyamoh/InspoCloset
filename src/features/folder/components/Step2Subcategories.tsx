import { IconSelector } from '../../../components/ui/IconSelector';
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
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-sageGreen mb-2">
          Want to organize your photos further?
        </h3>
        <p className="text-sm text-gray-500">
          Add subcategories to group similar photos together
        </p>
      </div>

      {/* Toggle */}
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between p-4 border border-dustyRose/30 rounded-lg bg-champagneBeige/30">
          <div>
            <p className="text-sm font-medium text-dustyRose">Add subcategories</p>
            <p className="text-xs text-dustyRose/70">Create smaller groups within this folder</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={hasSubcategories}
              onChange={(e) => onToggleHasSubcategories(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-dustyRose/30 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-skyBlue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-ivoryCream after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-ivoryCream after:border-dustyRose/40 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-skyBlue"></div>
          </label>
        </div>
      </div>

      {/* Subcategories */}
      {hasSubcategories && (
        <div className="space-y-6">
          {subcategories.map((subcategory, index) => (
            <div key={subcategory.id} className="border border-dustyRose/30 rounded-lg p-6 bg-champagneBeige/20">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-dustyRose">
                  Subcategory {index + 1}
                </h4>
                <button
                  onClick={() => subcategory.id && removeSubcategory(subcategory.id)}
                  className="text-sm text-dustyRose hover:text-dustyRose/80 transition-colors"
                >
                  Remove
                </button>
              </div>

              <div className="space-y-4">
                {/* Subcategory Name */}
                <div>
                  <label className="block text-sm font-medium text-sageGreen mb-2">
                    Name <span className="text-dustyRose">*</span>
                  </label>
                  <input
                    type="text"
                    value={subcategory.name}
                    onChange={(e) => updateSubcategory(subcategory.id!, { name: e.target.value })}
                    placeholder="e.g., Ceremony, Reception, Getting Ready"
                    className="w-full px-3 py-2 border border-dustyRose/30 rounded-lg focus:ring-2 focus:ring-skyBlue focus:border-skyBlue transition-colors placeholder:text-dustyRose/60 bg-ivoryCream"
                  />
                  {errors[`subcategory-${index}`] && (
                    <p className="text-sm text-dustyRose mt-1">{errors[`subcategory-${index}`]}</p>
                  )}
                </div>

                {/* Subcategory Icon */}
                <div>
                  <p className="text-sm text-dustyRose/70 mb-2">Icon (Optional)</p>
                  <IconSelector
                    currentIcon={subcategory.icon}
                    onIconSelected={(icon) => updateSubcategory(subcategory.id!, { icon })}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Add Subcategory Button */}
          <div className="text-center">
            <Button
              onClick={addSubcategory}
              outline
              className="px-6 py-2"
            >
              + Add Another Subcategory
            </Button>
          </div>
        </div>
      )}

      {/* Skip Option */}
      {!hasSubcategories && (
        <div className="text-center py-8">
          <div className="inline-flex items-center px-4 py-2 bg-champagneBeige/30 rounded-lg border border-dustyRose/20">
            <svg className="w-5 h-5 text-dustyRose/60 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-dustyRose/70">
              You can always add subcategories later
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
