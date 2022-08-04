import urlsSchema from '../schemas/urlsSchema.js';

export async function urlsSchemaValidate(req, res, next) {

    const validation = urlsSchema.validate(req.body, {abortEarly: false} );

    if (validation.error) {
        return res.status(422).send(validation.error.details.map((el) => el.message));
    }

    next()
}