import { FileUploadZone } from '../../../components/ui/FileUploadZone';
import { Subcategory, PictureUpload } from '../types';

interface Step3PicturesTagsProps {
  subcategories: Subcategory[];
  onSubcategoriesChange: (subcategories: Subcategory[]) => void;
  errors: Record<string, string>;
  suggestedTags: string[];
  onPhotosUploaded?: () => void;
}

export function Step3PicturesTags({
  subcategories,
  onSubcategoriesChange,
  onPhotosUploaded
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
    
    // Trigger photo review step after upload
    if (onPhotosUploaded) {
      onPhotosUploaded();
    }
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

  const addTag = (subcategoryId: string, pictureId: string, input: HTMLInputElement) => {
    const newTag = input.value.trim();
    if (newTag) {
      const picture = subcategories
        .find(sub => sub.id === subcategoryId)
        ?.pictures.find(pic => pic.id === pictureId);
      
      if (picture && !picture.tags.includes(newTag)) {
        handleUpdatePictureTags(subcategoryId, pictureId, [...picture.tags, newTag]);
      }
      input.value = '';
    }
  };

  const removeTag = (subcategoryId: string, pictureId: string, tagToRemove: string) => {
    const picture = subcategories
      .find(sub => sub.id === subcategoryId)
      ?.pictures.find(pic => pic.id === pictureId);
    
    if (picture) {
      const updatedTags = picture.tags.filter(tag => tag !== tagToRemove);
      handleUpdatePictureTags(subcategoryId, pictureId, updatedTags);
    }
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-sageGreen mb-2">
          Add your photos
        </h3>
        <p className="text-sm text-dustyRose/70">
          Upload photos and add tags to help you find them later
        </p>
      </div>

      {subcategories.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center px-6 py-4 bg-champagneBeige/30 rounded-lg border border-dustyRose/20">
            <svg className="w-6 h-6 text-dustyRose/60 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-left">
              <p className="text-sm font-medium text-dustyRose">No subcategories yet</p>
              <p className="text-xs text-dustyRose/70">Go back to add subcategories first</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {subcategories.map((subcategory, subIndex) => (
            <div key={subcategory.id} className="border border-dustyRose/30 rounded-lg p-6 bg-champagneBeige/20">
              <div className="mb-6">
                <h4 className="text-lg font-medium text-sageGreen mb-1">
                  {subcategory.name || `Subcategory ${subIndex + 1}`}
                </h4>
                <p className="text-sm text-dustyRose/70 mb-2">
                  Upload photos and add tags to organize them
                </p>
              </div>

              {/* File Upload Zone */}
              <div className="mb-6">
                <FileUploadZone
                  onFilesSelected={(files) => handleFilesSelected(subcategory.id!, files)}
                />
              </div>

              {/* Picture Previews */}
              {subcategory.pictures && subcategory.pictures.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {subcategory.pictures.map((picture) => (
                    <div key={picture.id} className="group border border-dustyRose/30 rounded-lg overflow-hidden bg-ivoryCream hover:shadow-md transition-shadow">
                      {/* Image */}
                      <div className="relative aspect-square">
                        <img
                          src={picture.previewUrl}
                          alt={picture.file.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                          <button
                            onClick={() => handleRemovePicture(subcategory.id!, picture.id)}
                            className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <p className="text-xs text-dustyRose/70 truncate mb-3" title={picture.file.name}>
                          {picture.file.name}
                        </p>
                        
                        {/* Tag Section - More Prominent */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-1 mb-2">
                            <svg className="w-3 h-3 text-skyBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            <span className="text-xs font-medium text-skyBlue">Tags for search:</span>
                          </div>
                          
                          {/* Tag Input - Larger */}
                          <input
                            type="text"
                            placeholder="Add tag (press Enter)..."
                            className="w-full px-3 py-2 text-sm border border-dustyRose/30 rounded-lg focus:ring-2 focus:ring-skyBlue focus:border-skyBlue transition-colors placeholder:text-dustyRose/60 bg-ivoryCream"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                addTag(subcategory.id!, picture.id, e.target as HTMLInputElement);
                              }
                            }}
                          />
                        </div>

                        {/* Tags Display - More Prominent */}
                        {picture.tags.length > 0 && (
                          <div className="mt-3">
                            <div className="flex flex-wrap gap-1">
                              {picture.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center gap-1 px-2 py-1 bg-skyBlue/15 text-skyBlue text-xs rounded-full border border-skyBlue/30"
                                >
                                  #{tag}
                                  <button
                                    type="button"
                                    onClick={() => removeTag(subcategory.id!, picture.id, tag)}
                                    className="hover:text-skyBlue/70 transition-colors"
                                  >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
