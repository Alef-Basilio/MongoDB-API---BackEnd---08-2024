const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 5000;

app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin");
    
    next();
});

const Data = mongoose.model("items", {
    text: String
});

app.get("/", async (req, res) => {
    const items = await Data.find({});
    
    return res.send(items);
});

app.post("/", async (req, res) => {
    const items = new Data({
        text: req.body.text
    });

    await items.save();
    return res.send(items);
})

app.put("/:_id", async (req, res) => {
    const item = await Data.findByIdAndUpdate(req.params._id, req.body, { new: true });
    return res.send(item);
})

app.delete("/:_id", async (req, res) => {
    const item = await Data.findOneAndDelete({ _id: req.params._id });
    return res.send(item);
})

app.listen(port, () => {
    mongoose.connect("mongodb+srv://corujadanoite:I2JrvLI7ALqfZeZb@cluster0.gaiyihx.mongodb.net/testdb?retryWrites=true&w=majority&appName=Cluster0");
})