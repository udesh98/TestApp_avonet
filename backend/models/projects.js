const mongoose = require("mongoose");

const projectsSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, required: true }
});

const Projects = mongoose.model("projects", projectsSchema);

module.exports = Projects;
