import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Loader } from '../components/Loader';
import { Navbar } from '../components/Navbar';
import { AnimatedGroup } from '../components/ui/animated-group';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import { Sparkles, Palette, Wand2 } from 'lucide-react';

const CreatePost = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const { auth } = useAuth();

  const styles = [
    { value: 'realistic', label: 'Realistic' },
    { value: 'artistic', label: 'Artistic' },
    { value: 'cartoon', label: 'Cartoon' },
    { value: 'abstract', label: 'Abstract' },
    { value: 'vintage', label: 'Vintage' },
    { value: 'modern', label: 'Modern' }
  ];

  const isGenerateDisabled = !prompt.trim() || !style || isGenerating;

  const handleGenerate = async () => {
    if (isGenerateDisabled) return;

    setIsGenerating(true);
    setGeneratedImage(null);
    setIsImageLoading(false);

    try {
      const response = await axios.post(
        'https://promptvision.onrender.com/api/images/generate',
        { prompt, style },
        {
          headers: {
            'Authorization': `Bearer ${auth.accessToken}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      
      // Set image loading state to true before setting the image URL
      setIsImageLoading(true);
      setGeneratedImage(response.data.data.imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image. Please try again.');
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
    alert('Failed to load the generated image. Please try again.');
  };

  const handleGenerateAgain = () => {
    setGeneratedImage(null);
    handleGenerate();
  };

  const handleDownload = () => {
    if (!generatedImage) return;

    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `generated-image-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (!generatedImage) return;

    setIsSharing(true);
    try {
      await axios.post(
        'https://promptvision.onrender.com/api/images/share',
        { 
          imageUrl: generatedImage, 
          prompt, 
          style 
        },
        {
          headers: {
            'Authorization': `Bearer ${auth.accessToken}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      
      alert('Image shared with community successfully!');
    } catch (error) {
      console.error('Error sharing image:', error);
      alert('Failed to share image. Please try again.');
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-50"></div>
      
      <Navbar />
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/10">
          {/* Header */}
          <AnimatedGroup preset="blur-slide" className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Create AI
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Art
              </span>
            </h1>
            <p className="text-xl text-white/80">
              Describe your vision and let AI bring it to life
            </p>
          </AnimatedGroup>

          {/* Form Section */}
          <AnimatedGroup preset="blur-slide" className="space-y-6 mb-8">
            {/* Prompt Input */}
            <div>
              <label htmlFor="prompt" className="text-sm font-medium text-white/90 mb-2 flex items-center gap-2">
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
                        ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                        : 'border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'
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
                    <span className="text-sm font-medium">{styleOption.label}</span>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 transition-all duration-300 backdrop-blur-sm border border-white/20"
              >
                {isGenerating ? 'Generating...' : 'Generate Image'}
              </Button>
            </div>
          </AnimatedGroup>

          {/* Image Preview Section */}
          <AnimatedGroup preset="blur-slide" className="space-y-6">
            {(isGenerating || isImageLoading) && (
              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-12 w-full max-w-md border-2 border-purple-500/20">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-white font-medium mb-4">
                      Creating your masterpiece...
                    </p>
                    <div className="flex justify-center">
                      <Loader variant="dots" />
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
                      isImageLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                    }`}
                    style={{ maxHeight: '500px' }}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                  />
                </div>

                {/* Action Buttons - Only show when image is fully loaded */}
                {!isImageLoading && (
                  <AnimatedGroup preset="blur-slide" className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={handleGenerateAgain}
                      variant="outline"
                      className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Generate Again
                    </Button>

                    <Button
                      onClick={handleDownload}
                      variant="outline"
                      className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download Image
                    </Button>

                    <Button
                      onClick={handleShare}
                      disabled={isSharing}
                      className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 backdrop-blur-sm border border-white/20"
                    >
                      {isSharing ? (
                        <>
                          <Loader size="sm" />
                          Sharing...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
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
  );
};

export default CreatePost;