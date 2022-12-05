const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema({
    projectId: { type: String, required: true },
    assignedUserEmail: { type: String, required: true },
	title: { type: String, required: true },
	description: { type: String, required: true },
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, required: true }
});

const Tasks = mongoose.model("tasks", tasksSchema);

module.exports = Tasks;