import Developer from "../model/developerModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const create = async (req, res) => {
    try {
        const { name, role, techStack, experience, description, joiningDate } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Profile image is required" });
        }

        const fileUpload = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "auto"
        });

        const response = new Developer({
            name,
            role,
            techStack,
            experience,
            description,
            joiningDate,
            profileImg: fileUpload.secure_url
        });

        fs.unlinkSync(req.file.path);
        await response.save();

        res.status(201).json({ message: "Developer created!!", response });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}


const view = async (req, res) => {
    try {
        const response = await Developer.find({});
        if (!response) {
            res.status(404).json({ message: "Developer not found!!" });
        }
        res.status(200).json(response);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const single = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Developer.findOne({ _id: id });
        if (!response) {
            return res.status(402).json({ message: "Id not founded" });
        }
        res.status(200).json(response);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const distroy = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Developer.deleteOne({ _id: id });
        if (!response) {
            return res.status(402).json({ message: "Id not founded" });
        }
        res.status(200).json({ message: "Developer deleted!!" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            name,
            role,
            techStack,
            experience,
            description,
            joiningDate,
            oldImage
        } = req.body;

        const existing = await Developer.findById(id);
        if (!existing) {
            return res.status(404).json({ message: "Developer not found" });
        }

        let profileImg = oldImage || existing.profileImg;

        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(req.file.path);
            profileImg = uploadResult.secure_url;
            fs.unlinkSync(req.file.path);
        }

        const updateData = {
            name: name || existing.name,
            role: role || existing.role,
            techStack: techStack || existing.techStack,
            experience: experience || existing.experience,
            description: description || existing.description,
            joiningDate: joiningDate || existing.joiningDate,
            profileImg
        };

        const updated = await Developer.findByIdAndUpdate(id, updateData, { new: true });

        return res.status(200).json({
            message: "Developer Updated!!",
            updated
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};



const role = async (req, res) => {
    try {
        const roles = [
            { role: "Frontend Developer" },
            { role: "Backend Developer" },
            { role: "Full-Stack Developer" },
            { role: "MERN Stack Developer" },
            { role: "MEAN Stack Developer" },
            { role: "React Developer" },
            { role: "Node.js Developer" },
            { role: "JavaScript Developer" },
            { role: "Software Engineer" },
            { role: "Web Developer" },
            { role: "UI/UX Developer" },
            { role: "DevOps Engineer" },
            { role: "Mobile App Developer" },
            { role: "Python Developer" },
            { role: "Java Developer" },
            { role: "PHP Developer" },
            { role: "DotNet Developer" },
            { role: "Data Engineer" },
            { role: "Cloud Engineer" }
        ]
        res.status(200).json(roles);
    }
    catch (err) {
        res.status(500).json({ message: err.message });

    }
}

export { create, view, role, single, distroy, update };