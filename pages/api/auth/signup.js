import User from "@/Model/userSchema";
import MongoConnection from "@/connection/dbconnection";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  MongoConnection().catch((error) =>
    res.json({ error: "Connection Failed...!" })
  );
  const { name, email, password } = req.body;
  console.log(req.body);
  if (req.method === "POST") {
    if (await User.findOne({ email: email })) {
      console.log("User Enrolled");
      return res.json({ message: "User is already enrolled" });
    }

    const user = new User({
      name,
      email,
      password,
    });
    console.log("post");

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    console.log("bcrypt", user.password);
    if (user) {
      const data = await user.save();
      console.log("saved");
      return res.status(200).json({ message: "User has been registered" });
    }

    console.log("not saved");
    res.status(200).json({ message: "POST Method" });
  } else {
    console.log("error");
    res
      .status(500)
      .json({ message: "HTTP method not valid only post accepted" });
  }
}
