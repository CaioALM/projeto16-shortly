import loginSchema from "../schemas/loginSchema.js";

export async function loginSchemaValidate(req, res, next ) {

    const validation = loginSchema.validate(req.body, { abortEarly: false });
    if (validation.error ) {
        return res.status(422).send(validation.error.details.map((el) => el.message));
    }
    next();
}