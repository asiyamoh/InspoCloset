import { FileUploadZone } from '../../../components/ui/FileUploadZone';
import { Subcategory, PictureUpload } from '../types';

interface Step3PicturesTagsProps {
  subcategories: Subcategory[];
  onSubcategoriesChange: (subcategories: Subcategory[]) => void;
  errors: Record<string, string>;
  suggestedTags: string[];
}

export function Step3PicturesTags({
  subcategories,
  onSubcategoriesChange
}: Step3PicturesTagsProps) {
  const handleFilesSelected = (subcategoryId: string, files: File[]) => {
    onSubcategoriesChange(
      subcategories.map(sub => {
        if (sub.id === subcategoryId) {
          const newPictures: PictureUpload[] = files.map(file => ({
            id: `${subcategoryId}-${file.name}-${Date.now()}`,
            file,
            previewUrl: URL.createObjectURL(file),
            tags: [],
          }));
          return { ...sub, pictures: [...sub.pictures, ...newPictures] };
        }
        return sub;
      })
    );
  };

  const handleRemovePicture = (subcategoryId: string, pictureId: string) => {
    onSubcategoriesChange(
      subcategories.map(sub => {
        if (sub.id === subcategoryId) {
          const updatedPictures = sub.pictures.filter(pic => pic.id !== pictureId);
          return { ...sub, pictures: updatedPictures };
        }
        return sub;
      })
    );
  };

  const handleUpdatePictureTags = (subcategoryId: string, pictureId: string, tags: string[]) => {
    onSubcategoriesChange(
      subcategories.map(sub => {
        if (sub.id === subcategoryId) {
          const updatedPictures = sub.pictures.map(pic =>
            pic.id === pictureId ? { ...pic, tags } : pic
          );
          return { ...sub, pictures: updatedPictures };
        }
        return sub;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Upload Photos & Add Tags
        </h3>
        <p className="text-sm text-gray-600">
          Upload pictures for each subcategory. You can add multiple tags to each picture to help you find them later.
        </p>
      </div>

      {subcategories.length === 0 ? (
        <div className="text-center py-8 text-dustyRose/70">
          <p className="text-sm">No subcategories to add pictures to.</p>
          <p className="text-xs mt-1">Please add subcategories in the previous step.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {subcategories.map((subcategory, subIndex) => (
            <div key={subcategory.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <h4 className="font-medium text-sageGreen mb-4">
                {subcategory.name || `Subcategory ${subIndex + 1}`}
              </h4>

              {/* File Upload Zone */}
              <FileUploadZone
                onFilesSelected={(files) => handleFilesSelected(subcategory.id!, files)}
              />

              {/* Picture Previews */}
              {subcategory.pictures && subcategory.pictures.length > 0 && (
                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {subcategory.pictures.map((picture) => (
                    <div key={picture.id} className="relative group border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                      <img
                        src={picture.previewUrl}
                        alt={picture.file.name}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleRemovePicture(subcategory.id!, picture.id)}
                          className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <div className="p-2 bg-white">
                        <p className="text-xs text-gray-700 truncate">{picture.file.name}</p>
                        <div className="mt-1">
                          <input
                            type="text"
                            placeholder="Add tags..."
                            className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                const input = e.target as HTMLInputElement;
                                const newTag = input.value.trim();
                                if (newTag && !picture.tags.includes(newTag)) {
                                  handleUpdatePictureTags(subcategory.id!, picture.id, [...picture.tags, newTag]);
                                  input.value = '';
                                }
                              }
                            }}
                          />
                          {picture.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {picture.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center gap-1 px-2 py-1 bg-skyBlue/20 text-skyBlue text-xs rounded-full"
                                >
                                  #{tag}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updatedTags = picture.tags.filter(t => t !== tag);
                                      handleUpdatePictureTags(subcategory.id!, picture.id, updatedTags);
                                    }}
                                    className="hover:text-dustyRose transition-colors"
                                  >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
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
              Almost Done!
            </h4>
            <p className="text-sm text-green-700 mt-1">
              Review your folder, subcategories, and all uploaded photos with their tags. Click "Create Folder" when you're ready to save everything.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
