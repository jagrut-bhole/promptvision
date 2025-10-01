// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import { preview } from '../assets';
// import preview from '../assets/preview.png';
// import {  getRandomPrompt } from '../utils';
// import { FormField, Loader } from '../components';
// import { downloadImage } from '../utils';

// const CreatePost = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ name: '', prompt: '', imageUrl: '' });
//   const [generatingImg, setGeneratingImg] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
//   const handleSurpriseMe = () => {
//     const randomPrompt = getRandomPrompt(form.prompt);
//     setForm({ ...form, prompt: randomPrompt });
//   };

//   const generateImage = async () => {
//     if (form.prompt) {
//       try {
//         setGeneratingImg(true);
//         const response = await fetch('http://localhost:8000/api/v1/images/generate', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ prompt: form.prompt }),
//         });
//         const data = await response.json();
//         console.log('Backend response data:', data);
//         setForm({ ...form, imageUrl: data.data.imageUrl });
//         console.log('Generated Image URL:', data.data.imageUrl);
//       } catch (err) {
//         alert(err);
//       } finally {
//         setGeneratingImg(false);
//       }
//     } else {
//       alert('Please provide a proper prompt');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (form.prompt && form.imageUrl) {
//       setLoading(true);
//       try {
//         await fetch('http://localhost:8000/api/v1/post', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(form),
//         });
//         navigate('/');
//       } catch (err) {
//         alert(err);
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       alert('Please provide proper prompt to generate an image');
//     }
//   };


//   return (
//     <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
//       <h1 className="text-4xl font-bold text-gray-800">Generate Image</h1>
//       <p className="mt-2 text-gray-600">Generate an imaginative image through Pollination AI and share it with the community.</p>

//       <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
//         <FormField
//           labelName="Your Name"
//           type="text"
//           name="name"
//           placeholder="Ex., Jagrut Bhole"
//           value={form.name}
//           handleChange={handleChange}
//         />

//         <FormField
//           labelName="Prompt"
//           type="text"
//           name="prompt"
//           placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
//           value={form.prompt}
//           handleChange={handleChange}
//           isSurpriseMe
//           handleSurpriseMe={handleSurpriseMe}
//           className="h-32 text-lg"
//         />

//         <div className="relative w-full h-96 bg-gray-100 border border-gray-300 rounded-lg flex justify-center items-center">
//           {form.photo ? (
//             <img src={form.imageUrl} alt={form.prompt} className="w-full h-full object-contain rounded-lg" />
//           ) : (
//             <img src={preview} alt="preview" className="w-32 h-32 opacity-40" />
//           )}

//           {generatingImg && (
//             <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded-lg">
//               <Loader />
//             </div>
//           )}
//         </div>

//         <button
//           type="button"
//           onClick={generateImage}
//           className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
//         >
//           {generatingImg ? 'Generating...' : 'Generate Image'}
//         </button>

//         <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
//           <button
//             type="submit"
//             className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
//           >
//             {loading ? 'Sharing...' : 'Share with the Community'}
//           </button>
//           <button
//             type="button"
//             onClick={() => downloadImage(form._id,form.photo)}
//             className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
//             Download Image
//           </button>
//         </div>
//       </form>
//     </section>
//   );
// };


// export default CreatePost;


// Kimi k2 code
// import { useState } from "react";

// const API_URL = "http://localhost:8000/api/v1/images/generate"; // <-- change if needed

// export default function CreatePost() {
//   const [prompt, setPrompt] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleGenerate = async () => {
//     if (!prompt.trim()) return;
//     setLoading(true);
//     setError("");
//     setImageUrl("");

//     try {
//       const res = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt }),
//       });

//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.message || "Something went wrong");
//       }

//       const data = await res.json();
//       // data.data.imageUrl is the structure your controller returns
//       setImageUrl(data.data.imageUrl);
//     } catch (err) {
//       setError(err.message || "Network error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 600, margin: "2rem auto", textAlign: "center" }}>
//       <h2>AI Image Generator (Pollinations)</h2>

//       <textarea
//         style={{ width: "100%", height: 80, padding: 8, fontSize: 16 }}
//         placeholder="Describe the image you want…"
//         value={prompt}
//         onChange={(e) => setPrompt(e.target.value)}
//       />

//       <button
//         style={{ marginTop: 12, padding: "8px 24px", fontSize: 16 }}
//         onClick={handleGenerate}
//         disabled={loading}
//       >
//         {loading ? "Generating…" : "Generate"}
//       </button>

//       {error && <p style={{ color: "red", marginTop: 12 }}>{error}</p>}

//       {imageUrl && (
//         <div style={{ marginTop: 24 }}>
//           <img
//             src={imageUrl}
//             alt="Generated"
//             style={{ maxWidth: "100%", borderRadius: 8 }}
//             onError={() => setError("Image failed to load—bad URL?")}
//           />
//         </div>
//       )}
//     </div>
//   );
// }


// deepseek code
// import React, { useState } from 'react';
// import axios from 'axios';

// const CreatePost = () => {
//   const [prompt, setPrompt] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [imageLoading, setImageLoading] = useState(false);
//   const [error, setError] = useState('');

//   // Default preview image
//   const defaultImage = 'https://images.unsplash.com/photo-1731576858809-e87f97c9f52c?q=80&w=2070&auto=format&fit=crop';

//   const generateImage = async (e) => {
//     e.preventDefault();
    
//     if (!prompt.trim()) {
//       setError('Please enter a prompt');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     setImageUrl('');

//     try {
//       const response = await axios.post('http://localhost:8000/api/v1/images/generate', {
//         prompt: prompt.trim()
//       }, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       if (response.data.data && response.data.data.imageUrl) {
//         setImageUrl(response.data.data.imageUrl);
//       } else {
//         throw new Error('Invalid response format');
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to generate image');
//       console.error('Error generating image:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 py-8 px-4">
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
//             AI Image Generator
//           </h1>
//           <p className="text-gray-600 text-lg">Transform your imagination into stunning visuals</p>
//         </div>

//         {/* Form */}
//         <form onSubmit={generateImage} className="mb-8">
//           <div className="flex flex-col md:flex-row gap-4 mb-4">
//             <input
//               type="text"
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               placeholder="Describe the image you want to generate..."
//               className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-xl text-lg focus:outline-none focus:border-purple-500 transition-all duration-300"
//               disabled={loading}
//             />
//             <button 
//               type="submit" 
//               className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//               disabled={loading}
//             >
//               {loading ? (
//                 <div className="flex items-center justify-center">
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Generating...
//                 </div>
//               ) : (
//                 'Generate Image'
//               )}
//             </button>
//           </div>
//         </form>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm text-red-700">{error}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Image Display Section */}
//         <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-200">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
//             {imageUrl ? 'Generated Image' : 'Image Preview'}
//           </h2>
          
//           <div className="relative rounded-xl overflow-hidden bg-white p-4 shadow-lg">
//             {/* Loading overlay for image */}
//             {imageLoading && (
//               <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10">
//                 <div className="text-center">
//                   <svg className="animate-spin h-12 w-12 text-purple-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   <p className="text-gray-600 font-medium">Loading image...</p>
//                 </div>
//               </div>
//             )}

//             {/* Image */}
//             <img 
//               src={imageUrl || defaultImage}
//               alt={imageUrl ? "Generated from AI" : "Default preview"}
//               className={`w-full max-h-96 object-contain rounded-lg transition-opacity duration-300 ${
//                 imageLoading ? 'opacity-0' : 'opacity-100'
//               }`}
//               onLoadStart={() => setImageLoading(true)}
//               onLoad={() => setImageLoading(false)}
//               onError={() => {
//                 setError('Failed to load image');
//                 setImageLoading(false);
//               }}
//             />

//             {/* Download Button - Only show when image is generated */}
//             {imageUrl && !imageLoading && (
//               <div className="mt-4 text-center">
//                 <a 
//                   href={imageUrl} 
//                   download="ai-generated-image.jpg"
//                   className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300"
//                 >
//                   <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                   </svg>
//                   Download Image
//                 </a>
//               </div>
//             )}

//             {/* Prompt Display */}
//             {imageUrl && !imageLoading && prompt && (
//               <div className="mt-4 p-3 bg-purple-50 rounded-lg">
//                 <p className="text-sm text-purple-800">
//                   <span className="font-semibold">Prompt:</span> {prompt}
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* Help Text */}
//           {!imageUrl && !loading && (
//             <div className="mt-4 text-center">
//               <p className="text-gray-500 text-sm">
//                 Enter a prompt above and click "Generate Image" to create your AI-generated artwork
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Features Grid */}
//         <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="text-center p-4">
//             <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
//               <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
//               </svg>
//             </div>
//             <h3 className="font-semibold text-gray-800">Fast Generation</h3>
//             <p className="text-sm text-gray-600">Get your images in seconds</p>
//           </div>
//           <div className="text-center p-4">
//             <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
//               <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//             </div>
//             <h3 className="font-semibold text-gray-800">High Quality</h3>
//             <p className="text-sm text-gray-600">1024x1024 HD resolution</p>
//           </div>
//           <div className="text-center p-4">
//             <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
//               <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//               </svg>
//             </div>
//             <h3 className="font-semibold text-gray-800">Easy Download</h3>
//             <p className="text-sm text-gray-600">One-click download</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreatePost;



// claude codee
import React, { useState } from 'react';

const CreatePost = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError('');
    setImageUrl(''); // Clear previous image

    try {
      const response = await fetch('http://localhost:8000/api/v1/images/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (data.success && data.data && data.data.imageUrl) {
        setImageUrl(data.data.imageUrl);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error generating image:', err);
      setError(`Failed to generate image: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };



  const handleImageLoad = () => {
    console.log('Image loaded successfully');
  };

  const handleImageError = (e) => {
    console.error('Image failed to load:', e);
    setError('Failed to load the generated image. Please try again.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
          AI Image Generator
        </h1>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="prompt" className="block text-white text-lg font-semibold mb-2">
              Describe your image:
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A beautiful sunset over mountains with flying birds..."
              className="w-full p-4 rounded-xl bg-white/20 backdrop-blur border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 resize-none h-24"
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.ctrlKey) {
                  e.preventDefault();
                  generateImage();
                }
              }}
            />
            <p className="text-gray-300 text-sm mt-1">Press Ctrl+Enter to generate</p>
          </div>

          <button
            onClick={generateImage}
            disabled={loading || !prompt.trim()}
            className="w-full py-4 px-6 bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                Generating...
              </div>
            ) : (
              'Generate Image'
            )}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-500/20 backdrop-blur border border-red-500/50 rounded-xl text-red-200">
            {error}
          </div>
        )}

        {/* Image Display Area */}
        <div className="mt-8">
          <h2 className="text-white text-xl font-semibold mb-4 text-center">
            {loading ? 'Generating Image...' : imageUrl ? 'Generated Image:' : 'Image Preview'}
          </h2>
          
          <div className="relative rounded-xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur min-h-[400px] flex items-center justify-center">
            {loading ? (
              // Loading animation
              <div className="flex flex-col items-center justify-center p-8">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mb-4"></div>
                <p className="text-white text-lg font-medium mb-2">Creating your masterpiece...</p>
                <p className="text-gray-300 text-sm text-center max-w-xs">This may take a few seconds depending on the complexity of your prompt.</p>
              </div>
            ) : imageUrl ? (
              // Generated image
              <>
                <img
                  src={imageUrl}
                  alt="Generated"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  className="w-full h-auto max-h-96 object-contain"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                  <p className="text-white text-sm truncate">Prompt: {prompt}</p>
                </div>
              </>
            ) : (
              // Preview placeholder with uploaded image
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="w-32 h-32 mb-4 rounded-xl bg-white/20 backdrop-blur border-2 border-dashed border-white/40 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-white text-lg font-medium mb-2">Ready to Generate</h3>
                <p className="text-gray-300 text-sm max-w-sm">Enter a creative prompt above and click "Generate Image" to create your AI-powered artwork.</p>
              </div>
            )}
          </div>

          {/* Action buttons - only show when image is generated */}
          {imageUrl && !loading && (
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => window.open(imageUrl, '_blank')}
                className="flex-1 py-2 px-4 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors duration-200"
              >
                View Full Size
              </button>
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = imageUrl;
                  link.download = `generated-image-${Date.now()}.jpg`;
                  link.click();
                }}
                className="flex-1 py-2 px-4 bg-green-500/70 hover:bg-green-500/80 text-white rounded-lg transition-colors duration-200"
              >
                Download
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-gray-300 text-sm">
          <p>Powered by Pollinations AI</p>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;