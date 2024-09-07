import mongoose from "mongoose";

export  const connectDB = async () => {
    await mongoose.connect('mongodb+srv://nht1106:KQ4N0gS7ZgKJyRSv@chat.xfila.mongodb.net/?retryWrites=true&w=majority&appName=Chat').then(()=>console.log("DB Connected to NHT"));
}