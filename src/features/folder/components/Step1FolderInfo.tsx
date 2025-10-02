import { IconSelector } from '../../../components/ui/IconSelector';
import { FormInput } from '../../../components/ui/FormInput';
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
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Folder Information
        </h3>
        <p className="text-sm text-gray-600">
          Start by giving your folder a name and optionally choose an icon to represent it.
        </p>
      </div>

      {/* Folder Name */}
      <FormInput
        label="Folder Name"
        value={formData.name}
        onChange={(e) => onFormDataChange({ ...formData, name: e.target.value })}
        placeholder="e.g., Wedding Day, Engagement Photos"
        error={error}
        required
      />

      {/* Folder Icon */}
      <IconSelector
        label="Folder Icon (Optional)"
        currentIcon={formData.icon}
        onIconSelected={(icon) => onFormDataChange({ ...formData, icon })}
      />
    </div>
  );
}
