import db from "../db.js";

export async function getProducts(req,res){
    try {
        const collection = db.collection("products");
        const products = await collection.find().toArray();
        res.status(200).send(products);
    } catch (error) {
        console.log("Error get products.");
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function getCartProducts(req,res){
    const {email} =res.locals;
    try {
        const collection = db.collection("cart");
        const cartProducts = await collection.find({email}).toArray();
        res.status(200).send(cartProducts);
    } catch (error) {
        console.log("Error get cartProducts.");
        console.log(error);
        return res.sendStatus(500);
    }
}

//ainda estou trabalhando no delete...
export async function deleteCartProducts(req,res){
    const body = req.body;
    const id = req.body._id;
    console.log(id);
    try {
        
    } catch (error) {
        
    }
    res.sendStatus(200);
}