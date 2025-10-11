import { IconSelector } from '../../../components/ui/IconSelector';
import { Button } from '../../../components/ui/Button';
import { CategoryFormData, Category } from '../types';

interface Step1CategoryInfoProps {
  formData: CategoryFormData;
  onFormDataChange: (data: CategoryFormData) => void;
  errors: Record<string, string>;
}

export function Step1CategoryInfo({
  formData,
  onFormDataChange,
  errors
}: Step1CategoryInfoProps) {
  const addCategory = () => {
    const newCategory: Category = {
      id: `category-${Date.now()}`,
      name: '',
      icon: null,
      pictures: []
    };
    onFormDataChange({
      ...formData,
      categories: [...formData.categories, newCategory]
    });
  };

  const removeCategory = (id: string) => {
    onFormDataChange({
      ...formData,
      categories: formData.categories.filter(cat => cat.id !== id)
    });
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    onFormDataChange({
      ...formData,
      categories: formData.categories.map(cat =>
        cat.id === id ? { ...cat, ...updates } : cat
      )
    });
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-sageGreen mb-2">
          What categories would you like to add?
        </h3>
        <p className="text-sm text-gray-500">
          Create categories to organize your photos within this folder
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-6">
        {formData.categories.map((category, index) => (
          <div key={category.id} className="border border-dustyRose/30 rounded-lg p-6 bg-champagneBeige/20">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-dustyRose">
                Category {index + 1}
              </h4>
              {formData.categories.length > 1 && (
                <button
                  onClick={() => category.id && removeCategory(category.id)}
                  className="text-sm text-dustyRose hover:text-dustyRose/80 transition-colors"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="space-y-4">
              {/* Category Name */}
              <div>
                <label className="block text-sm font-medium text-sageGreen mb-2">
                  Name <span className="text-dustyRose">*</span>
                </label>
                <input
                  type="text"
                  value={category.name}
                  onChange={(e) => updateCategory(category.id!, { name: e.target.value })}
                  placeholder="e.g., Ceremony, Reception, Getting Ready"
                  className="w-full px-3 py-2 border border-dustyRose/30 rounded-lg focus:ring-2 focus:ring-skyBlue focus:border-skyBlue transition-colors placeholder:text-dustyRose/60 bg-ivoryCream"
                />
                {errors[`category-${index}`] && (
                  <p className="text-sm text-dustyRose mt-1">{errors[`category-${index}`]}</p>
                )}
              </div>

              {/* Category Icon */}
              <div>
                <p className="text-sm text-dustyRose/70 mb-2">Icon (Optional)</p>
                <IconSelector
                  currentIcon={category.icon}
                  onIconSelected={(icon) => updateCategory(category.id!, { icon })}
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add Category Button */}
        <div className="text-center">
          <Button
            onClick={addCategory}
            outline
            className="px-6 py-2"
          >
            + Add Another Category
          </Button>
        </div>
      </div>

      {/* General Error */}
      {errors.general && (
        <div className="text-center">
          <p className="text-sm text-dustyRose">{errors.general}</p>
        </div>
      )}
    </div>
  );
}
