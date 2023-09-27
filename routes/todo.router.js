const express = require('express')
const router = express()
const todoModel = require('../models/todo.model')

///get all todo to userID
router.get("/userrtasks/:userID", (req, res) => {
    const id = req.params.userID;
    todoModel.find({ userCode: id })
        .exec()
        .then(doc => {
            if (doc)
                res.status(200).json(doc)
            else
                res.status(404).send('there is no todo')
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})
////add new todo
router.post("/", (req, res) => {
    let newtodo=req.body;
    newtodo=new todoModel(newtodo);
    newtodo.save()
        .then((saved) => {
            res.status(200).json(saved)
        })
        .catch((error) => {
            res.status(400).json({ error: error })
        });

});
//put the status of the todo
router.patch("/:todoID", (req, res) => {
    const todoid = req.params.todoID;
    todoModel.findByIdAndUpdate({ _id: todoid }, { $set: { bennDone: true } })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(error => {
            res.status(404).json({ error: error })
        })
})

router.get("/beendone/:userID", (req, res) => {
    const id = req.params.userID;
    todoModel.find({ userCode: id, bennDone: true })
        .exec()
        .then(doc => {
            if (doc.length > 0)
                res.status(200).json(doc)
            else
                res.status(404).send('there is no todo')
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

router.get("/content/:userID", (req, res) => {
    const id = req.params.userID;
    const cont = req.body.content;
    todoModel.find({ userCode: id, content: { $regex: cont } })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})
module.exports = router;

