import db from "../db.js";

export default async function tokenValidation(req, res, next) {
    const { authorization,email } = req.headers;
    const token = authorization?.replace("Bearer ","").trim();
    res.locals.email = email;
    if (!token||!email) {
        return res.status(401).send("requisição  não autorizada");
    }
    const errorSession = await checkingSession(email,token);
    if(errorSession) return res.status(401).send(errorSession);
    next();
}

async function checkingSession(email,token){
    try {
        const collection = db.collection("sessions");
        const session = await collection.findOne({email});
        if(!session|| session?.token !== token){
            return "sessão não autorizada";
        } 
    } catch (error) {
        console.log("Error checking session.");
        console.log(error);
        return res.sendStatus(500);
    }
}