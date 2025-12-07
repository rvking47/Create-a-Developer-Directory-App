import joi from "joi";


const validationSingUp = async (req, res, next) => {
    try {
        const Schema = joi.object({
            name: joi.string().min(3).max(105).required(),
            email: joi.string().email().required(),
            password: joi.string().min(6).max(105).required(),
        });

        const { error } = Schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: "Bad Request!",
                errors: error.details.map((err) => ({
                    field: err.path[0],
                    message: err.message,
                })),
            });
        }
        next();
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}


const validationLogin = async (req, res, next) => {
    try {
        const Schema = joi.object({
            email: joi.string().email().required(),
            password: joi.string().min(6).max(105).required(),
        });

        const { error } = Schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: "Bad Request!",
                errors: error.details.map((err) => ({
                    field: err.path[0],
                    message: err.message,
                })),
            });
        }
        next();
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const validation = async (req, res, next) => {
    try {
        const Schema = joi.object({
            name: joi.string().min(3).max(105).required(),
            role: joi.string().min(4).max(205).required(),
            techStack: joi.string().min(4).max(205).required(),
            experience: joi.number().min(0.5).max(10).required(),
            description: joi.string().min(10).max(510).required(),
            joiningDate: joi.date().required(),
            file: joi.optional().allow(""),
            oldImage: joi.optional().allow("")

        });

        const { error } = Schema.validate(req.body);
        if (error) {
            return res.status(402).json({
                message: "Bad Request!",
                errors: error.details.map((err) => ({
                    field: err.path[0],
                    message: err.message,
                })),
            });
        }
        next();
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}



export { validation, validationSingUp, validationLogin };