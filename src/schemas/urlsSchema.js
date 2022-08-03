import Joi from "joi";

const urlsSchema = Joi.object({
    url: Joi.string().uri().required()
})

export default urlsSchema;