const router = require("express").Router();
const Projects = require("../models/projects");
const Tasks = require("../models/tasks");
const jwt_decode = require("jwt-decode");

router.route("/create-project").post((req,res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const user = req.body.user;
    const date = req.body.date;
    const status = req.body.status;

    const decoded = jwt_decode(user); //data is what you sent in.
    const userId = decoded._id;

    // console.log(userId);

    const newProject = new Projects({
        title,
        description,
        userId,
        date,
        status
    })

    newProject.save().then(()=>{
        res.json("Project created successfully!");
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/").get((req,res)=>{
    const user = req.query;
    const decoded = jwt_decode(user.token); //data is what you sent in.
    const userId = decoded._id;
    // console.log(userId);

    Projects.find( { userId: { $eq: userId } } ).then((x)=>{
        {res.json(x)};
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/deleteProject/").delete((req,res)=>{
    const id = req.query.id;
    console.log(id);

    Projects.findByIdAndDelete(id).then((x)=>{
        Tasks.deleteMany({ projectId: { $eq: id } }).then((x) => {
            console.log(x);
        }).catch((err) => {
            console.log(err);
        })
        res.json({status: "Project successfully deleted!", user: x});
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports = router;