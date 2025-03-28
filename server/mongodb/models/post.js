import mongoose from 'mongoose';
const Post = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    prompt: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    }
);

const postSchema = mongoose.model('post', Post);
export default postSchema;