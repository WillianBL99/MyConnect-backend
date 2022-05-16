import db from "../db.js";
import { ObjectId } from "mongodb";

import { postCartSchema, postHistoricSchema } from "../schemas/productsSchema.js"
import Joi from "joi";

const abortEarly = { abortEarly: false };
export async function tokenValidation(req, res, next) {
    const { authorization, email } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();
    res.locals.email = email;
    if (!token || !email) {
        return res.status(401).send("requisição  não autorizada aqui");
    }
    const errorSession = await checkingSession(email, token);
    if (errorSession) return res.status(401).send(errorSession);
    next();
}

async function checkingSession(email, token) {
    try {
        const collection = db.collection("sessions");
        const session = await collection.findOne({ email });
        if (!session || session?.token !== token) {
            return "sessão não autorizada";
        };
    } catch (error) {
        console.log("error checking session.");
        console.log(error);
        return res.sendStatus(500);
    };
}
export function postCartValidation(req, res, next) {
    const validation = postCartSchema.validate(req.body, abortEarly);
    if (validation.error) {
        return res.status(422).send(validation.error.details.map(
            detail => `${detail.message} /`
        ));
    };
    next();
}

export function deleteCartValidation(req, res, next) {
    const id = req.body.selected;
    const validId = ObjectId.isValid(id);
    if (!validId && id !== "") {
        return res.status(422).send("The product id is not valid to delete.");
    };
    res.locals.id = id;
    next();
}

export async function postHistoricValidation(req, res, next) {
    const titleValidation = Joi.string().required();
    const purchases = req.body;
    const { products } = purchases;
    if(!products){
        return res.status(422).send("Array with products title required");
    }
    const errorPurchases = [];
    products.forEach((product, index) => {
        const validation = titleValidation.validate(product, abortEarly);
        if (validation.error) {
            errorPurchases.push(validation.error.details.map(
                detail => `object${index}: ${detail.message} /`
            ));
        };
    });
    if (errorPurchases.length > 0) {
        return res.status(422).send(errorPurchases);
    }
    next();
}
