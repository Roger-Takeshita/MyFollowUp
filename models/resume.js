const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resumeSchema = new Schema(
    {
        title: {
            type: String,
            unique: true
        },
        description: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Resume', resumeSchema);