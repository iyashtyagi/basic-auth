const express = require('express');
const path = require("path");
const bodyParser = require("body-parser");
const loginRouter = require("./routes/login");
const signupRouter = require("./routes/signup");
const {errorHandler} = require("./middleware/errorHandler")

const {dbConnector} = require("./connection/mongo");
require("dotenv").config();

const port = 3000;
const app = express();

// connection
dbConnector(process.env.MONGOOSE_CONNECTION_STRING);

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routers



const folderPath = path.join(__dirname,"../public/pages");
app.use(express.static('public'));
app.get("/home",(req,res)=>{
    console.log('ok')
    const htmlFile = path.join(folderPath, "index.html")
    res.sendFile(htmlFile);
})

app.use("/login",loginRouter);
app.use("/signup", signupRouter);

app.get("*", (req,res)=>{
    const notFoundFile = path.join(folderPath,"notFound.html");
    res.status(404).sendFile(notFoundFile)
})

// Error handler
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started: ${port}`);
})