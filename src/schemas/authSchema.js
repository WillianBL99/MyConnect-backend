import joi from "joi";

const imageUrl=/^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/;
export const signUpSchema = joi.object({
    image: joi.string().pattern(imageUrl).required(),
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.ref('password')
});

export const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});