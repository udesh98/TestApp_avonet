const router = require("express").Router();
const Tasks = require("../models/tasks");
const { User, validate } = require("../models/user");
const jwt_decode = require("jwt-decode");

router.route("/").get((req, res) => {
    const user = req.query;
    const decoded = jwt_decode(user.token); //data is what you sent in.
    const userId = decoded._id;
    // console.log(userId);

    const findUserbyId = async (userId) => {
        await User.find({ _id: { $eq: userId } }).then((x) => {
            const email = x[0].email;

            Tasks.find({ assignedUserEmail: { $eq: email } }).then((x) => {
                { res.json(x) };
            }).catch((err) => {
                console.log(err);
            })

        }).catch((err) => {
            console.log(err);
        })
    }

    findUserbyId(userId);
})

router.route("/update-task").put((req,res)=>{
    const taskId = req.body.taskId;
    const status = req.body.status;

    // console.log(taskId);
    // console.log(status);

    const updatedTask = {
        status: status
    }

    Tasks.findByIdAndUpdate(taskId, updatedTask).then(()=>{
        res.status(200).send({status: "Task updated!"});
    }).catch((err)=>{
        console.log(err);
    })

})

module.exports = router;