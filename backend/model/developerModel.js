import mongoose from "mongoose";

const developerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    techStack: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    }
});

const Developer = mongoose.model("developer", developerSchema);

export default Developer;