import { useState } from "react";

const VideoUploader = ({ onUpload }: { onUpload: (file: File) => void }) => {
  const [video, setVideo] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideo(file);
      onUpload(file);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <input type="file" accept="video/*" onChange={handleFileChange} />
      {video && (
        <video
          src={URL.createObjectURL(video)}
          controls
          className="mt-4 w-full"
        />
      )}
    </div>
  );
};

export default VideoUploader;
