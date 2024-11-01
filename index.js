import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import home from "./routes/home.js";
import detail from "./routes/articleContent.js";
import editArticle from "./routes/editArticle.js";
import addArticle from "./routes/addArticle.js";
import deleteArticle from "./routes/deleteArticle.js";
import editDetail from "./routes/editContent.js";
import userAuth from "./routes/userAuth.js";
import sequelize from "./utils/database.js";
import connectSessionSequelize from "connect-session-sequelize";
import session from "express-session";
const app = express();
const PORT = 3000;

const SequelizeStore = connectSessionSequelize(session.Store);
const sessionStore = new SequelizeStore({
  db: sequelize,
});

sessionStore.sync();

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

/* SETTING THE TEMPLATING ENGINE */
app.set("view engine", "ejs");
app.set("views", "views");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    const date = new Date().toISOString().replace(/:/g, "-");
    cb(null, date + "-" + file.originalname);
  },
});

app.use(multer({ storage }).single("image"));

app.use("/", home);
app.use("/detail", detail);
app.use("/edit-article", editArticle);
app.use("/add-article", addArticle);
app.use("/delete-article", deleteArticle);
app.use("/edit-detail", editDetail);
app.use("/", userAuth);

// Get the current directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname)));

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error(error);
  });

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running");
  });
});
