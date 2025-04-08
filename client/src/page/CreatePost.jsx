import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import {  getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

import { downloadImage } from '../utils';


const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', prompt: '', photo: '' });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('https://promptvision.onrender.com/api/v1/dalle/images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: form.prompt }),
        });
        const data = await response.json();
        setForm({ ...form, photo: data.resImageUrl });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide a proper prompt');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        await fetch('https://promptvision.onrender.com/api/v1/post', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please provide proper prompt to generate an image');
    }
  };


  return (
    <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
      <h1 className="text-4xl font-bold text-gray-800">Generate Image</h1>
      <p className="mt-2 text-gray-600">Generate an imaginative image through Pollination AI and share it with the community.</p>

      <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
        <FormField
          labelName="Your Name"
          type="text"
          name="name"
          placeholder="Ex., Jagrut Bhole"
          value={form.name}
          handleChange={handleChange}
        />

        <FormField
          labelName="Prompt"
          type="text"
          name="prompt"
          placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
          value={form.prompt}
          handleChange={handleChange}
          isSurpriseMe
          handleSurpriseMe={handleSurpriseMe}
          className="h-32 text-lg"
        />

        <div className="relative w-full h-96 bg-gray-100 border border-gray-300 rounded-lg flex justify-center items-center">
          {form.photo ? (
            <img src={form.photo} alt={form.prompt} className="w-full h-full object-contain rounded-lg" />
          ) : (
            <img src={preview} alt="preview" className="w-32 h-32 opacity-40" />
          )}

          {generatingImg && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded-lg">
              <Loader />
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={generateImage}
          className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
        >
          {generatingImg ? 'Generating...' : 'Generate Image'}
        </button>

        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
          <button
            type="button"
            onClick={() => downloadImage(form._id,form.photo)}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Download Image
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
