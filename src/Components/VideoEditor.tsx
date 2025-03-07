import { useState, useEffect } from "react";
import * as ffmpeg from "@ffmpeg/ffmpeg";
const { createFFmpeg, fetchFile } = ffmpeg;

// const ffmpeg = createFFmpeg({ log: true });

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

export default VideoEditor;
