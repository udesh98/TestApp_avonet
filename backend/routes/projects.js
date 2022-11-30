const router = require("express").Router();
const Projects = require("../models/projects");
const jwt_decode = require("jwt-decode");

router.route("/create-project").post((req,res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const user = req.body.user;
    const date = req.body.date;

    const decoded = jwt_decode(user); //data is what you sent in.
    const userId = decoded._id;

    // console.log(userId);

    const newProject = new Projects({
        title,
        description,
        userId,
        date
    })

    newProject.save().then(()=>{
        res.json("Project created successfully!");
    }).catch((err)=>{
        console.log(err);
    })

})

module.exports = router;