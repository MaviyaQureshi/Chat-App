import mongoose from "mongoose";

const Connection = async (username, password) => {
  const URL =
    "mongodb://maviya:maviyaqureshi@ac-6jzs3ol-shard-00-00.uts6xns.mongodb.net:27017,ac-6jzs3ol-shard-00-01.uts6xns.mongodb.net:27017,ac-6jzs3ol-shard-00-02.uts6xns.mongodb.net:27017/?ssl=true&replicaSet=atlas-nqo7an-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";
  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); // Exit the process with a non-zero status code to indicate failure
  }
};

export default Connection;
