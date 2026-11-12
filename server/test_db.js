import "dotenv/config";
import mongoose from "mongoose";

async function testMongo() {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  console.log("Connecting to MongoDB Atlas...");
  console.log("URI:", uri ? uri.replace(/:([^@]+)@/, ":****@") : "None");

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
    console.log("✅ MongoDB Atlas connected successfully!");
    console.log("Database state:", mongoose.connection.readyState === 1 ? "Connected" : "Not connected");
    const count = await mongoose.connection.db.collection("contacts").countDocuments();
    console.log("Current contacts count in DB:", count);

    // Test Contact.create
    const ContactModel = (await import("./models/Contact.js")).default;
    const testDoc = await ContactModel.create({
      name: "Test User",
      email: "test@example.com",
      message: "Testing MongoDB insertion from backend controller logic."
    });
    console.log("✅ Successfully created contact doc:", testDoc._id);
    await ContactModel.deleteOne({ _id: testDoc._id });
    console.log("✅ Successfully deleted test doc.");

    await mongoose.disconnect();
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
}

testMongo();
