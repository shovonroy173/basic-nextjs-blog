import mongoose from "mongoose"

const connection = {};

export const connectToDb = async () => {
  try {
    if(connection.isConnected) {
      console.log("Using existing connection");
      return;
    }
    const db = await mongoose.connect(process.env.MONGO_URI || `mongodb+srv://shovon:nwXHh1yt5Gj4fj7P@store-cluster.o7kflav.mongodb.net/nextjs-blog-media?retryWrites=true&w=majority` );
    console.log("COnnected to DB!!");
    connection.isConnected = db.connections[0].readyState;
  } catch (error) { console.log("Not connected to DB!");
    console.log(error);
    throw new Error(error);
  }
};