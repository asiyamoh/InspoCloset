interface EmptyStateProps {
  onAddFolder: () => void;
}

export function EmptyState({ onAddFolder }: EmptyStateProps) {
  return (
    <div className="text-center py-16 px-4">
      {/* Hero Section */}
      <div className="mb-8">
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-lavenderGray/30 to-champagneBeige/30 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-dustyRose/40 to-sageGreen/40 rounded-full flex items-center justify-center">
              <div className="w-8 h-10 bg-dustyRose/60 dress-silhouette"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="max-w-lg mx-auto mb-8">
        <h2 className="text-3xl font-handwritten text-dustyRose mb-4">
          Welcome to Your Design Library
        </h2>
        <p className="text-sageGreen text-lg leading-relaxed">
          Build your reference library of dress elements. 
          Organize necklines, silhouettes, and details to quickly find inspiration for any client.
        </p>
      </div>

      {/* How This Helps You */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 border border-dustyRose/20 shadow-photo-glue">
          <h3 className="text-lg font-semibold text-sageGreen mb-4">Build your design reference library:</h3>
          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-skyBlue text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">1</div>
              <div>
                <span className="text-dustyRose font-medium">Create style folders</span>
                <p className="text-dustyRose/70 text-sm mt-1">Like "Necklines", "Silhouettes", "Fabrics"</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-skyBlue text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">2</div>
              <div>
                <span className="text-dustyRose font-medium">Add specific categories</span>
                <p className="text-dustyRose/70 text-sm mt-1">Round crew neck, V-neck, Sweetheart, etc.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-skyBlue text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">3</div>
              <div>
                <span className="text-dustyRose font-medium">Upload multiple examples</span>
                <p className="text-dustyRose/70 text-sm mt-1">Save different variations of each style</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-skyBlue text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">4</div>
              <div>
                <span className="text-dustyRose font-medium">Mix and match for clients</span>
                <p className="text-dustyRose/70 text-sm mt-1">Show combinations that work perfectly</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-sm mx-auto">
        <div 
          className="bg-gradient-to-br from-lavenderGray/60 to-champagneBeige/60 p-8 rounded-2xl border-2 border-dustyRose/30 shadow-photo-glue hover:shadow-photo-glue-md transition-all duration-300 cursor-pointer transform hover:scale-105"
          onClick={onAddFolder}
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-dustyRose/30 to-sageGreen/30 rounded-full flex items-center justify-center">
            <div className="w-8 h-10 bg-dustyRose/60 dress-silhouette"></div>
          </div>
          <h3 className="text-2xl font-semibold text-sageGreen mb-3">Create Your First Style Folder</h3>
          <p className="text-dustyRose/80 mb-4">
            Start with "Necklines" or "Silhouettes" to build your reference library
          </p>
          <div className="bg-sageGreen text-white px-6 py-3 rounded-lg font-semibold hover:bg-sageGreen/90 transition-colors">
            Build Your Library!
          </div>
        </div>
      </div>

      {/* Encouraging Footer */}
      <div className="mt-8">
        <p className="text-dustyRose/60 text-sm italic">
          "A well-organized design library is a designer's best tool"
        </p>
      </div>
    </div>
  );
}