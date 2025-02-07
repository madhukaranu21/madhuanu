import React, { useRef, useEffect, useState } from "react";

export function AICanvasLayout() {
  const canvasRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedVideo, setUploadedVideo] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx && uploadedImage) {
      const img = new Image();
      img.src = uploadedImage;
      img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  }, [uploadedImage]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setUploadedImage(event.target?.result);
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setUploadedVideo(videoURL);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-20 bg-gray-800 text-white flex flex-col items-center py-4">
        <button className="my-2 p-2 hover:bg-gray-700 rounded">✏️</button>
        <button className="my-2 p-2 hover:bg-gray-700 rounded">🩹</button>
        <button className="my-2 p-2 hover:bg-gray-700 rounded">🖌️</button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white shadow-md p-2 flex justify-end space-x-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="px-4 py-1 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
          >
            Upload Image
          </label>

          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="hidden"
            id="video-upload"
          />
          <label
            htmlFor="video-upload"
            className="px-4 py-1 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600"
          >
            Upload Video
          </label>

          <button className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600">
            Save
          </button>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 p-4 bg-gray-200 flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={800}
            height={500}
            className="border-2 border-gray-400 rounded-xl shadow-lg bg-white"
          />
          {uploadedVideo && (
            <video
              controls
              src={uploadedVideo}
              className="absolute w-3/4 h-3/4 border-2 border-gray-400 rounded-xl shadow-lg bg-white"
            />
          )}
        </div>
      </div>
    </div>
  );
}
