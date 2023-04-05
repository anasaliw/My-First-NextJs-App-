import mongoose from "mongoose";

const MongoConnection = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useUnifiedTopology: true,
    });
    console.log("connected");
  } catch (error) {
    console.log("Connection Failed:", error.message);
  }
};

export default MongoConnection;
