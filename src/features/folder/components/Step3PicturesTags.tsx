import { FileUploadZone } from '../../../components/ui/FileUploadZone';
import { Subcategory, PictureUpload } from '../types';

interface Step3PicturesTagsProps {
  subcategories: Subcategory[];
  onSubcategoriesChange: (subcategories: Subcategory[]) => void;
  errors: Record<string, string>;
  suggestedTags: string[];
  // New props for single subcategory mode
  singleSubcategoryMode?: boolean;
  onUpload?: (pictures: PictureUpload[]) => void;
}

export function Step3PicturesTags({
  subcategories,
  onSubcategoriesChange,
  singleSubcategoryMode = false,
  onUpload
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


  const handleUpload = () => {
    if (singleSubcategoryMode && subcategories.length > 0) {
      const subcategory = subcategories[0];
      if (subcategory.pictures && subcategory.pictures.length > 0 && onUpload) {
        onUpload(subcategory.pictures);
      }
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
          {(singleSubcategoryMode ? subcategories.slice(0, 1) : subcategories).map((subcategory, subIndex) => (
            <div key={subcategory.id} className="border border-dustyRose/30 rounded-lg p-6 bg-champagneBeige/20">
              <div className="mb-6">
                <h4 className="text-lg font-medium text-sageGreen mb-1">
                  {subcategory.name || `Subcategory ${subIndex + 1}`}
                </h4>
                <p className="text-sm text-dustyRose/70 mb-2">
                  Upload photos - you'll review and optionally add tags in the next step
                </p>
              </div>

              {/* File Upload Zone */}
              <div className="mb-6">
                <FileUploadZone
                  onFilesSelected={(files) => handleFilesSelected(subcategory.id!, files)}
                />
              </div>

              {/* Photo Count */}
              {subcategory.pictures && subcategory.pictures.length > 0 && (
                <div className="mb-6 p-4 bg-champagneBeige/30 rounded-lg border border-dustyRose/20">
                  <div className="text-sm text-sageGreen">
                    <span className="font-medium">{subcategory.pictures.length}</span> photo{subcategory.pictures.length !== 1 ? 's' : ''} selected
                  </div>
                </div>
              )}

              {/* Picture Previews - Simplified */}
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

                      {/* Content - Simplified */}
                      <div className="p-3">
                        <p className="text-xs text-dustyRose/70 truncate" title={picture.file.name}>
                          {picture.file.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Upload Button for Single Subcategory Mode */}
              {singleSubcategoryMode && subcategory.pictures && subcategory.pictures.length > 0 && (
                <div className="mt-6 pt-6 border-t border-dustyRose/20">
                  <button
                    onClick={handleUpload}
                    className="w-full bg-sageGreen text-white px-6 py-3 rounded-lg hover:bg-sageGreen/80 transition-colors font-medium"
                  >
                    Upload {subcategory.pictures.length} Picture{subcategory.pictures.length !== 1 ? 's' : ''}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
