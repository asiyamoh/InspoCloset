import { Step3PicturesTags } from './Step3PicturesTags';
import { CategoryFormData } from '../types';

interface Step2CategoryPicturesProps {
  formData: CategoryFormData;
  onFormDataChange: (data: CategoryFormData) => void;
  errors: Record<string, string>;
  suggestedTags: string[];
}

export function Step2CategoryPictures({
  formData,
  onFormDataChange,
  errors,
  suggestedTags
}: Step2CategoryPicturesProps) {
  return (
    <div className="space-y-8 py-4">
      {/* Header
      <div className="text-center">
        <h3 className="text-xl font-semibold text-sageGreen mb-2">
          Add photos to your categories
        </h3>
        <p className="text-sm text-dustyRose/70">
          Upload photos for each category - you'll review and add tags in the next step
        </p>
      </div> */}

      {/* Use the modified Step3PicturesTags component */}
      <Step3PicturesTags
        categories={formData.categories}
        onCategoriesChange={(categories) => onFormDataChange({ ...formData, categories })}
        errors={errors}
        suggestedTags={suggestedTags}
        multipleCategoriesMode={true}
      />
    </div>
  );
}
