const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const AuthRoutes = require("./routers/AuthRouter");
const ProjectRouter = require("./routers/ProjectRouter");

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Bağlantısı
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB bağlantısı başarılı.");
  })
  .catch((err) => {
    console.error("MongoDB bağlantı hatası:", err);
  });

// Rotalar
app.use("/auth", AuthRoutes);
app.use("/projects", ProjectRouter);

// Sunucuyu ayağa kaldırma
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
