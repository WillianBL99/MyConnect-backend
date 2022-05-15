import { ObjectId } from "mongodb";
import dayjs from "dayjs";

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

export async function postCartProducts(req,res){
    const product = req.body;
    try {
        const collection = db.collection("cart");
        await collection.insertOne(product);
        res.sendStatus(201);
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

export async function deleteCartProducts(req,res){
    const id = res.locals.id;
    try {
        const collection = db.collection("cart");
        if(!id){
            await collection.deleteMany({});
            return res.sendStatus(200);
        }
        const product = await collection.findOne({_id: new ObjectId(id)});
        if(!product)return res.status(404).send("product not found");
        await collection.deleteOne(product);
        res.sendStatus(200);
    } catch (error) {
        console.log("Error get cartProducts.");
        console.log(error);
        return res.sendStatus(500);
    }
}
export async function postHistoric (req,res){
    const purchases = req.body;
    try {
        const insert = {...purchases, date:dayjs().format("DD/MM/YY")}
        const collection = db.collection("historic");
        console.log(insert);
        await collection.insertOne(insert);
        res.sendStatus(201);
    } catch (error) {
        console.log("Error put historic.");
        console.log(error);
        return res.sendStatus(500);
    }
}
export async function getHistoric(req,res){
    const {email} =res.locals;
    try {
        console.log(email);
        const collection = db.collection("historic");
        const purchases = await collection.find({email}).toArray();
        console.log(purchases);
        res.status(200).send(purchases);
    } catch (error) {
        console.log("Error put historic.");
        console.log(error);
        return res.sendStatus(500);
    }
}