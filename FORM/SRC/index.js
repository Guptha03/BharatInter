const express = require("express");
const path = require("path");
const collection = require("./config");
const bcrypt = require('bcrypt');

const app = express();
let port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    };

    try {
        const userdata = await collection.create(data); 
        console.log(userdata);
        res.send('User registered successfully.');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
});
