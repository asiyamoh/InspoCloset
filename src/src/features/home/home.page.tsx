import { QuickActionsGrid } from './components/QuickActionsGrid';

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
            
            {/* Quick Actions Grid */}
            <QuickActionsGrid />
            
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