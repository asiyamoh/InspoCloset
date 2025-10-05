import { IconSelector } from '../../../components/ui/IconSelector';
import { FolderFormData } from '../types';

interface Step1FolderInfoProps {
  formData: FolderFormData;
  onFormDataChange: (data: FolderFormData) => void;
  error?: string;
}

export function Step1FolderInfo({
  formData,
  onFormDataChange,
  error
}: Step1FolderInfoProps) {
  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-sageGreen mb-2">
          What would you like to call this folder?
        </h3>
        <p className="text-sm text-gray-500">
          Choose a name that helps you remember what's inside
        </p>
      </div>

      {/* Folder Name Input */}
      <div className="max-w-md mx-auto">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-sageGreen">
            Folder Name <span className="text-dustyRose">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => onFormDataChange({ ...formData, name: e.target.value })}
            placeholder="e.g., lace, veil, train"
            className="w-full px-4 py-3 text-lg border border-dustyRose/30 rounded-lg focus:ring-2 focus:ring-skyBlue focus:border-skyBlue transition-colors placeholder:text-dustyRose/60 bg-ivoryCream"
          />
          {error && (
            <p className="text-sm text-dustyRose mt-1">{error}</p>
          )}
        </div>
      </div>

      {/* Optional Icon Section */}
      <div className="max-w-md mx-auto">
        <div className="text-center mb-4">
          <p className="text-sm text-dustyRose/70">
            Want to add an icon? (Optional)
          </p>
        </div>
        <IconSelector
          currentIcon={formData.icon}
          onIconSelected={(icon) => onFormDataChange({ ...formData, icon })}
        />
      </div>
    </div>
  );
}
