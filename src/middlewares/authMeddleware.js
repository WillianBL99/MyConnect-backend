import db from "../db.js";
import { signInSchema,signUpSchema } from "../schemas/authSchema.js";
import bcrypt from "bcrypt";

const abortEarly = { abortEarly: false };
export async function singUpVallidation(req,res,next){
    //validando os dados
    const body = req.body;
    const {email,img} = body;
    const validation = signUpSchema.validate(body, abortEarly);
    if (validation.error) {
        return res.status(422).send(validation.error.details.map(
            detail => `${detail.message} /`
        ));
    }
    if(!img.includes("png")&&!img.includes("jpg")&&!img.includes("gif")){
        return res.status(422).send("img(jpg/png/git)");
    }
    //verificando se o email já está cadastrado
    const alreadyExist = await db.collection("users").findOne({ email });
    if (alreadyExist) {
        return res.status(401).send("email already registered.");
    };
    next();
}

export async function signInVallidation(req,res,next){
    try {
        //validando dados
        const body = req.body;
        const { email, password } = body;
        const validation = signInSchema.validate(body, abortEarly);
        if (validation.error) {
            return res.status(422).send(validation.error.details.map(
                detail => `${detail.message} /`
            ));
        };

        //verificando se os dados são de um usuário cadastrado
        const user = await db.collection("users").findOne({ email });
        if (!user) {
            return res.status(404).send("email not registered");
        }
        
        if(!bcrypt.compareSync(password, user.password)) {
            return res.status(401).send("incorrect password");
        };
        
        res.locals.user = user;
        next();
        
    } catch (error) {
        console.log("error signInValidation.");
        console.log(error);
        return res.sendStatus(500);
    }
    
}