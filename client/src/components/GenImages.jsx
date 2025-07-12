import React, { useState } from 'react';
import { assets } from '../assets/assets';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const images = assets.galleryImages;

  return (
    <div className="min-h-screen text-black p-4">
      <h1 className="text-3xl font-bold text-center mb-6">AI-Generated Gallery</h1>

      {/* Masonry grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`AI Generated ${index + 1}`}
            className="w-full rounded-lg mb-4 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setSelectedImage(src)}
          />
        ))}
      </div>

      {/* Modal preview */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Preview"
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
