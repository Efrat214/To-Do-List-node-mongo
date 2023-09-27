const express = require('express')
const router = express()
const userModel = require('../models/user.model')

router.get("/:userid", (req, res) => {
  const id = req.params.userid;
  userModel.findById(id)
    .exec()
    .then(doc => {
      if (doc)
        res.status(200).json(doc)
      else
        res.status(404).json({ error: "User not found" });

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err })
    })
});


router.post("/", (req, res) => {
  let newUser = req.body
  newUser = new userModel(user);
  newUser.save()
    .then((savedUser) => {
      res.status(200).json(savedUser)
    })
    .catch((error) => {
      res.status(400).json({ error: error })
    });

});

router.delete("/:userID", (req, res) => {
  userModel.findByIdAndRemove(req.params.userID)
    .exec()
    .then(result => {
      res.status(200).json({ message: "User deleted successfully" });
    })
    .catch(err => {
      res.status(404).json({ error: "User not found" });
    });
})

module.exports = router;
