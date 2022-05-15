import joi from "joi";

export const postCartSchema = joi.object({
    email: joi.string().email().required(),
    img: joi.string().required(),
    title: joi.string().required(),
    describe: joi.string().required(),
    qtd: joi.number().integer().required(),
    price: joi.number().required(),
});
export const postHistoricSchema = joi.object({
    email: joi.string().email().required(),
    qtd: joi.number().integer().required(),
    total: joi.number().required()
});