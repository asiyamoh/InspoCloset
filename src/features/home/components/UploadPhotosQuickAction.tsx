import { useNavigate } from "@tanstack/react-router";

export function UploadPhotosQuickAction() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({ to: "/upload" });
  };

  return (
    <div
      className="bg-blushPink/30 p-4 rounded-lg border border-dustyRose/20 shadow-photo-glue hover:shadow-photo-glue-md transition-shadow"
      onClick={handleClick}
    >
      <div className="text-2xl mb-2">📷</div>
      <h3 className="font-semibold text-sageGreen">Add Inspiration</h3>
      <p className="text-sm text-dustyRose/70">Upload photos & ideas</p>
    </div>
  );
}
