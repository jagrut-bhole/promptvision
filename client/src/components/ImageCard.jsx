import React from 'react';

const ImageCard = ({ image, onImageClick }) => {
  const { imageUrl, prompt, style, createdBy, createdAt } = image;
  const creatorName = createdBy?.fullName || createdBy?.username || 'Unknown User';

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div 
      className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      onClick={() => onImageClick && onImageClick(image)}
    >
      {/* Image */}
      <div className="aspect-square overflow-hidden">
        <img
          src={imageUrl}
          alt={prompt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <div className="text-white space-y-2">
          {/* Creator Info */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {creatorName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-semibold text-sm">{creatorName}</p>
              <p className="text-xs text-gray-300">{formatDate(createdAt)}</p>
            </div>
          </div>

          {/* Prompt */}
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-300 uppercase tracking-wide">Prompt</p>
            <p className="text-sm leading-relaxed line-clamp-3">{prompt}</p>
          </div>

          {/* Style Badge */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-300 uppercase tracking-wide">Style</span>
            <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium capitalize">
              {style}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Info (visible without hover) */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-white text-xs font-medium capitalize">{style}</span>
        </div>
      </div>
    </div>
  );
};

export { ImageCard };
