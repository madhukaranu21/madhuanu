import { useState, useEffect } from "react";
import { createFFmpeg } from "@ffmpeg/ffmpeg";

const ffmpeg = createFFmpeg({ log: true });

(async () => {
  if (!ffmpeg.isLoaded()) {
    await ffmpeg.load();
  }
})();

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

const VideoEditor = ({ video }: { video: File }) => {
  const [outputVideo, setOutputVideo] = useState<string | null>(null);

  useEffect(() => {
    const processVideo = async () => {
      if (!ffmpeg.isLoaded()) await ffmpeg.load();

      ffmpeg.FS("writeFile", "input.mp4", await fetchFile(video));

      // Example: Trim the first 5 seconds using AI (mock)
      await ffmpeg.run(
        "-i",
        "input.mp4",
        "-ss",
        "00:00:05",
        "-t",
        "00:00:10",
        "-c",
        "copy",
        "output.mp4"
      );

      const data = ffmpeg.FS("readFile", "output.mp4");
      const url = URL.createObjectURL(
        new Blob([data.buffer], { type: "video/mp4" })
      );
      setOutputVideo(url);
    };

    processVideo();
  }, [video]);

  return (
    <div>
      {outputVideo && (
        <video src={outputVideo} controls className="w-full mt-4" />
      )}
    </div>
  );
};

const VideoEditorApp = () => {
  const [video, setVideo] = useState<File | null>(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold">AI Video Editor</h1>
      <VideoUploader onUpload={setVideo} />
      {video && <VideoEditor video={video} />}
    </div>
  );
};

export default VideoEditorApp;
