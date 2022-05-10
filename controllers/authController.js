import db from "./../db.js";

export async function signUp(req, res) {
  try {

    return res.sendStatus(201); // created
  } catch (error) {
    console.log("Error creating new user.");
    console.log(error);
    return res.sendStatus(500);
  }

}

export async function signIn(req, res) {
  try {

    return res.sendStatus(404); // not found
  } catch (error) {
    console.log("Error recovering user.");
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function signOut(req, res) {
  const {authorization} = req.headers;
  const token = authorization?.replace("Bearer", "").trim();
  if(!token) return res.send(403); // forbidden
  
  try {
    await db.collection("sessions").deleteOne({token});
    res.sendStatus(200);
  } catch (error) {
    console.log("Error logging out.");
    console.log(error);
    return res.sendStatus(500);
  }
}