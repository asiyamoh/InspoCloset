export function BrideQuickAction() {
    // TODO: Add backend logic to check bride table
    // - If brides exist: show most recent bride's photo + "explore [name]'s folder"
    // - If no brides: show "add a bride" message
    
    return (
        <div className="bg-champagneBeige/50 p-4 rounded-lg border border-dustyRose/20 shadow-photo-glue hover:shadow-photo-glue-md transition-shadow">
            <div className="text-2xl mb-2">👰</div>
            <h3 className="font-semibold text-sageGreen">Bride Profile</h3>
            <p className="text-sm text-dustyRose/70">View and edit bridal details</p>
        </div>
    );
} 