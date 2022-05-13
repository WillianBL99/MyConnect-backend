import db from "../db.js";
import { ObjectId } from "mongodb";

import {postCartSchema} from "../schemas/productsSchema.js"

export async function tokenValidation(req, res, next) {
    const { authorization, email } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();
    res.locals.email = email;
    if (!token || !email) {
        return res.status(401).send("requisição  não autorizada");
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
        console.log("Error checking session.");
        console.log(error);
        return res.sendStatus(500);
    };
}
export async function postCartValidation(req, res, next) {
    const { _id: id } = req.body;
    const abortEarly = { abortEarly: false };
    const validation = postCartSchema.validate(req.body, abortEarly);
    if (validation.error) {
        return res.status(422).send(validation.error.details.map(
            detail => `${detail.message} /`
        ));
    };
    const validId = ObjectId.isValid(id);
    if (!validId && id !== "") {
        return res.status(422).send("The product id is not valid.");
    };
    next();
}

export async function deleteCartValidation(req, res, next) {
    const { _id: id } = req.body;
    const validId = ObjectId.isValid(id);
    if (!validId && id !== "") {
        return res.status(422).send("The product id is not valid.");
    };
    res.locals.id = id;
    next();
}
