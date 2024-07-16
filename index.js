require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/connect");
const multer = require("multer");
const Images = require("./models/Picture");
// middlewares
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN ?? "http://localhost:5173",
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use(bodyParser.json({limit:"50mb"}))
// app.use(bodyParser.urlencoded({limit:"50mb",extended:false}))

// Route middlewares
app.use("/auth", require("./routes/authRoute"));

app.use("/myunsplash", require("./routes/imageRoute"));
app.use("/", require("./routes/general"));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// server connection
const PORT = process.env.PORT || 9000;
async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
    // <Isaac remember delete this line after you wre done deleting the images/>
    // await Images.deleteMany();
    // console.log("delete all Images");
  } catch (error) {
    console.log(error.message);
  }
}
start();
