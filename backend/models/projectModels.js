const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    projectNumber : {type: Number, required:true},
    projectTitle : {type: String, required:true},
    userId : {type: mongoose.Schema.Types.ObjectId, ref:'User', required:true},
},
    {timestamps: true}  // adds createdAt and updatedAt fields automatically
)

module.exports = mongoose.model('Project',ProjectSchema) 