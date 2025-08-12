export function HomePage(){
    return(
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="text-center">
                <h1 className="text-3xl font-handwritten text-dustyRose mb-2">
                    Welcome to InspoCloset
                </h1>
                <p className="text-sageGreen text-lg">
                    Your bridal inspiration scrapbook
                </p>
            </div>
            
            {/* Quick Actions Grid
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-champagneBeige/50 p-4 rounded-lg border border-dustyRose/20 shadow-photo-glue hover:shadow-photo-glue-md transition-shadow">
                    <div className="text-2xl mb-2">👰</div>
                    <h3 className="font-semibold text-sageGreen">Bridal Looks</h3>
                    <p className="text-sm text-dustyRose/70">Explore wedding inspiration</p>
                </div>
                
                <div className="bg-lavenderGray/30 p-4 rounded-lg border border-dustyRose/20 shadow-photo-glue hover:shadow-photo-glue-md transition-shadow">
                    <div className="text-2xl mb-2">👗</div>
                    <h3 className="font-semibold text-sageGreen">Wedding Styles</h3>
                    <p className="text-sm text-dustyRose/70">Find your perfect style</p>
                </div>
                
                <div className="bg-skyBlue/20 p-4 rounded-lg border border-dustyRose/20 shadow-photo-glue hover:shadow-photo-glue-md transition-shadow">
                    <div className="text-2xl mb-2">🕊️</div>
                    <h3 className="font-semibold text-sageGreen">Nikah Traditions</h3>
                    <p className="text-sm text-dustyRose/70">Cultural wedding elements</p>
                </div>
                
                <div className="bg-blushPink/30 p-4 rounded-lg border border-dustyRose/20 shadow-photo-glue hover:shadow-photo-glue-md transition-shadow">
                    <div className="text-2xl mb-2">📷</div>
                    <h3 className="font-semibold text-sageGreen">Upload Photos</h3>
                    <p className="text-sm text-dustyRose/70">Share your inspiration</p>
                </div>
            </div> */}
            
            {/* Recent Inspiration */}
            <div className="bg-white/60 p-4 rounded-lg border border-dustyRose/20 shadow-photo-glue">
                <h3 className="font-handwritten text-xl text-dustyRose mb-3">Recent Inspiration</h3>
                <p className="text-sageGreen text-sm">
                    Start building your bridal inspiration collection...
                </p>
            </div>
        </div>
    )
}