const express = require('express');
const path = require("path");
const bodyParser = require("body-parser");
const loginRouter = require("./routes/login");
const signupRouter = require("./routes/signup");
const logoutRouter = require("./routes/logout")
const {errorHandler} = require("./middleware/errorHandler")
const cookieParser = require("cookie-parser");

const {dbConnector} = require("./connection/mongo");
const { isLoggedIn } = require('./middleware/isLoggedIn');
require("dotenv").config();

const port = 3000;
const app = express();
app.use(cookieParser());
// connection
dbConnector(process.env.MONGOOSE_CONNECTION_STRING);

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const folderPath = path.join(__dirname,"../public/pages");
app.get("/",isLoggedIn,(req,res)=>{
    console.log('ok')
    const htmlFile = path.join(folderPath, "index.html")
    res.sendFile(htmlFile);
})

// routers
app.use("/login",loginRouter);
app.use("/signup", signupRouter);
app.use("/logout", logoutRouter);

app.get("*", (req,res)=>{
    const notFoundFile = path.join(folderPath,"notFound.html");
    res.status(404).sendFile(notFoundFile)
})

// Error handler
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started: ${port}`);
})