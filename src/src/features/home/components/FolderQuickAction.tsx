export function FolderQuickAction() {
    // TODO: Add backend logic to check folder table
    // - If folders exist: show 2 most recent folders with their names
    // - If no folders: show "Create your first folder" message
    
    return (
        <>
            <div className="bg-lavenderGray/30 p-4 rounded-lg border border-dustyRose/20 shadow-photo-glue hover:shadow-photo-glue-md transition-shadow">
                <div className="text-2xl mb-2">👗</div>
                <h3 className="font-semibold text-sageGreen">Folders</h3>
                <p className="text-sm text-dustyRose/70">Organize your inspiration</p>
            </div>
            
            <div className="bg-skyBlue/20 p-4 rounded-lg border border-dustyRose/20 shadow-photo-glue hover:shadow-photo-glue-md transition-shadow">
                <div className="text-2xl mb-2">🕊️</div>
                <h3 className="font-semibold text-sageGreen">Folders</h3>
                <p className="text-sm text-dustyRose/70">Organize your inspiration</p>
            </div>
        </>
    );
} 