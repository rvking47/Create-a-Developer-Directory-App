import Developer from "../model/developerModel.js";

const create = async (req, res) => {
    try {
        const { name, role, techStack, experience } = req.body;
        //validation add for helper/validation.js
        const response = new Developer({
            name,
            role,
            techStack,
            experience
        });
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

export { create, view, role };