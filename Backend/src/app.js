const express = require("express");
const morgan = require("morgan");
const mysql = require("mysql");
const myConnection = require("express-myconnection");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const customerRoutes = require("./routes/customer");

const {
    PORT = 5000,
    DB_HOST = "localhost",
    DB_USER = "root",
    DB_PASSWORD = "",
    DB_NAME = "myapp"
} = process.env;

app.set("port", PORT);
app.set("view engine", "ejs");

// ✅ Use correct path where Docker mounts views folder
app.set("views", "/app/views");

app.use(morgan("dev"));

app.use(
    myConnection(
        mysql,
        {
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            port: 3306,
            database: DB_NAME
        },
        "single"
    )
);

app.use(express.urlencoded({ extended: false }));
app.use("/", customerRoutes);

// Optional: If you have static files (CSS/JS), adjust this if needed
app.use(express.static(path.join(__dirname, "public")));

app.listen(app.get("port"), () => {
    console.log(`✅ Server running on port ${app.get("port")}`);
});
