const router = require("express").Router();
const Tasks = require("../models/tasks");
// const jwt_decode = require("jwt-decode");

router.route("/create-task").post((req,res)=>{
    const projectId = req.body.projectId;
    const assignedUserEmail = req.body.assignedUserEmail;
    const title = req.body.title;
    const description = req.body.description;
    const userId = req.body.userId;
    const date = req.body.date;
    const status = req.body.status;

    // const decoded = jwt_decode(user); //data is what you sent in.
    // const userId = decoded._id;

    // console.log(userId);

    const newTask = new Tasks({
        projectId,
        assignedUserEmail,
        title,
        description,
        userId,
        date,
        status
    })

    newTask.save().then(()=>{
        res.json("Task created successfully!");
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/").get((req,res)=>{
    const projectId = req.query.projectId;
    // console.log(projectId);

    Tasks.find( { projectId: { $eq: projectId } } ).then((x)=>{
        {res.json(x)};
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports = router;