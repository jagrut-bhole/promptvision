import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Loader } from "../components/Loader";
import { Navbar } from "../components/Navbar";
import { AnimatedGroup } from "../components/ui/animated-group";
import api from "../lib/api";
import { Sparkles, Palette, Wand2, Download } from "lucide-react";
import { GridPattern } from "../components/ui/GridPattern";
import { ToastContainer } from "../components/Toast";
import { LoaderPost } from "../components/Loader";

export const CreatePost = () => {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const styles = [
    { value: "realistic", label: "Realistic" },
    { value: "artistic", label: "Artistic" },
    { value: "cartoon", label: "Cartoon" },
    { value: "abstract", label: "Abstract" },
    { value: "vintage", label: "Vintage" },
    { value: "modern", label: "Modern" },
  ];

  const isGenerateDisabled = !prompt.trim() || !style || isGenerating;

  const handleGenerate = async () => {
    if (isGenerateDisabled) return;

    setIsGenerating(true);
    setGeneratedImage(null);
    setIsImageLoading(false);

    try {
      const response = await api.post('/images/generate', { prompt, style });

      // console.log(response.data);

      // Set image loading state to true before setting the image URL
      setIsImageLoading(true);
      setGeneratedImage(response.data.data.imageUrl);
    } catch (error) {
      console.error("Error generating image:", error);
      const errorMessage = error.response?.data?.message || "Failed to generate image. Please try again.";
      addToast(errorMessage, 'error', 4000);
      setIsGenerating(false);
    }
  };

  const handleImageLoad = () => {
    // Image has finished loading
    setIsImageLoading(false);
    setIsGenerating(false);
  };

  const handleImageError = () => {
    // Handle image loading error
    setIsImageLoading(false);
    setIsGenerating(false);
    addToast("Failed to load the generated image. Please try again.", 'error', 4000);
  };

  const handleGenerateAgain = () => {
    setGeneratedImage(null);
    handleGenerate();
  };

  const handleDownload = async () => {
    if (!generatedImage || isDownloading) return;

    setIsDownloading(true);
    try {
      // Fetch the image as a blob to handle cross-origin issues
      const response = await fetch(generatedImage);
      if (!response.ok) throw new Error('Failed to fetch image');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      // Create download link
      const link = document.createElement("a");
      link.href = url;
      link.download = `ai-artwork-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      addToast("Image downloaded successfully!", 'success');
    } catch (error) {
      console.error("Error downloading image:", error);
      addToast("Failed to download image. Please try again.", 'error');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    if (!generatedImage) return;

    setIsSharing(true);
    try {
      await api.post('/images/share', {
        imageUrl: generatedImage,
        prompt,
        style,
      });

      addToast("🎉 Image shared with community successfully!", 'success', 4000);
    } catch (error) {
      console.error("Error sharing image:", error);
      const errorMessage = error.response?.data?.message || "Failed to share image. Please try again.";
      addToast(errorMessage, 'error', 4000);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <GridPattern>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <div className="min-h-scree relative overflow-hidden">
        <Navbar />

        <div className="relative z-10 container mx-auto px-4 py-8 max-w-5xl">
          <div className="bg-black-80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/10">
            {/* Header */}
            <AnimatedGroup preset="blur-slide" className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Create AI <span className="block text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-400">
                  Art
                </span>
                
              </h1> 
            </AnimatedGroup>

            {/* Form Section */}
            <AnimatedGroup preset="blur-slide" className="space-y-6 mb-8">
              {/* Prompt Input */}
              <div>
                <label
                  htmlFor="prompt"
                  className="text-sm font-medium text-white/90 mb-2 flex items-center gap-2"
                >
                  <Wand2 className="w-4 h-4" />
                  Describe your image
                </label>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A majestic mountain landscape at sunset with golden clouds..."
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-white placeholder-white/50 transition-all duration-300 hover:bg-white/10"
                  rows={3}
                />
              </div>

              {/* Style Selection */}
              <div>
                <label className="text-sm font-medium text-white/90 mb-3 flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Choose a style
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {styles.map((styleOption) => (
                    <label
                      key={styleOption.value}
                      className={`relative flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-300 group ${
                        style === styleOption.value
                          ? "border-white-500 bg-white-500/20 text-white"
                          : "border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="style"
                        value={styleOption.value}
                        checked={style === styleOption.value}
                        onChange={(e) => setStyle(e.target.value)}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium">
                        {styleOption.label}
                      </span>
                      <div className="absolute inset-0 rounded-lg bg-linear-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <div className="flex justify-center">
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerateDisabled}
                  size="lg"
                  className="px-8 py-3 text-lg font-semibold text-black bg-white disabled:opacity-50 transition-all duration-300 backdrop-blur-sm border border-white/20"
                >
                  {isGenerating ? (
                    <span className="flex items-center gap-2">
                      <LoaderPost text="Generating..." />
                    </span>
                  ) : (
                    "Generate Image"
                  )}
                </Button>
              </div>
            </AnimatedGroup>

            {/* Image Preview Section */}
            <AnimatedGroup preset="blur-slide" className="space-y-6">
              {(isGenerating || isImageLoading) && (
                <div className="flex justify-center">
                  <div className="bg-white/5 backdrop-blur-md rounded-2xl p-16 w-full max-w-2xl border-2 border-white/10">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                        <Sparkles className="w-10 h-10 text-white" />
                      </div>
                      <div className="flex justify-center">
                        <Loader text="Creating your masterpiece..." />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {generatedImage && (
                <div className="space-y-6">
                  {/* Generated Image */}
                  <div className="text-center">
                    <img
                      src={generatedImage}
                      alt="Generated artwork"
                      className={`mx-auto rounded-2xl shadow-2xl max-w-full h-auto transition-all duration-500 ${
                        isImageLoading
                          ? "opacity-0 scale-95"
                          : "opacity-100 scale-100"
                      }`}
                      style={{ maxHeight: "500px" }}
                      onLoad={handleImageLoad}
                      onError={handleImageError}
                    />
                  </div>

                  {/* Action Buttons - Only show when image is fully loaded */}
                  {!isImageLoading && (
                    <AnimatedGroup
                      preset="blur-slide"
                      className="flex flex-col sm:flex-row gap-3 justify-center"
                    >
                      <Button
                        onClick={handleGenerateAgain}
                        variant="outline"
                        className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        Generate Again
                      </Button>

                      <Button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        variant="outline"
                        className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 disabled:opacity-50"
                      >
                        {isDownloading ? (
                          <Loader text="Downloading..." />
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            Download Image
                          </>
                        )}
                      </Button>

                      <Button
                        onClick={handleShare}
                        disabled={isSharing}
                        className="flex items-center gap-2 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 backdrop-blur-sm border border-white/20"
                      >
                        {isSharing ? (
                          <Loader text="Sharing..." />
                        ) : (
                          <>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                              />
                            </svg>
                            Share with Community
                          </>
                        )}
                      </Button>
                    </AnimatedGroup>
                  )}
                </div>
              )}
            </AnimatedGroup>
          </div>
        </div>
      </div>
    </GridPattern>
  );
};

export default CreatePost;
