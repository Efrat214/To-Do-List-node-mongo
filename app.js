const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UsersRouter = require('./routes/user.router')
const todoModel = require('./routes/todo.router')

const database = "to-do-list";
const url = `mongodb+srv://efrat:mongo@cluster0.mskozsj.mongodb.net/${database}?retryWrites=true&w=majority`;

(async function connectDB() {
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('connected succesfully');
    } catch (error) {
        console.error(error);
    }
})();

const app = express();
app.use(express.json());
app.use(cors())
app.use('/users', UsersRouter);
app.use('/todo', todoModel);
app.listen(5000, () => {
    console.log("listening on http//localhost:5000");
});