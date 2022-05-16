import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import dayjs from "dayjs";

import db from "../db.js";

export async function signUp(req, res) {
  const { name, email, password, img } = req.body;
  try {
    const sault = 10;
    const cryptPassword = bcrypt.hashSync(password, sault);
    await db.collection("users").insertOne({
      name: name,
      email: email,
      password: cryptPassword,
      img: img
    });
    return res.sendStatus(201); // created
  } catch (error) {
    console.log("Error creating new user.");
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  const { email } = req.body;
  const user = res.locals.user;
  try {
    const token = uuid();
    sessionControl(email,token);
    await db.collection("sessions").insertOne({
      email: email,
      token: token,
      time: dayjs().format("DD/MM/YYYY h:mm:ss"),
    });
    delete user.password;
    delete user._id;
    res.status(200).send({ ...user, token });
  } catch (error) {
    console.log("Error recovering user.");
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function signOut(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();
  if (!token) return res.send(403); // forbidden

  try {
    await db.collection("sessions").deleteOne({ token });
    res.sendStatus(200);
  } catch (error) {
    console.log("Error logging out.");
    console.log(error);
    return res.sendStatus(500);
  }
}

async function sessionControl(email,token) {
  try {
    const oldSession = await db.collection("sessions").findOne({ email });
    if (oldSession) {
      await db.collection("oldSessions").insertOne(oldSession);
      await db.collection("sessions").deleteOne({ email });
    }
  } catch (error) {
    console.log("Error session definition.");
    console.log(error);
    return res.sendStatus(500);
  }
}