import registerSchema from "../schemas/registerSchema.js";

export async function registerSchemaValidate(req, res, next) {

const validation = registerSchema.validate(req.body, { abortEarly: false});
    
    if (validation.error ) {
        return res.status(422).send(validation.error.details.map((el) => el.message));
    }
    next();
}