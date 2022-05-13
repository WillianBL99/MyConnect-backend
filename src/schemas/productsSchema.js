import joi from "joi";

const imageUrl=/^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/;
export const postCartSchema = joi.object({
    email: joi.string().email().required(),
    image: joi.string().pattern(imageUrl).required(),
    tittle: joi.string().required(),
    describe: joi.string().required(),
    qtd: joi.number().integer().required(),
    price: joi.number().required(),
    _id: joi.string().required()
});