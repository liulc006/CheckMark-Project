const {Schema, model} = require('mongoose');

const checklistSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    priorityLevel: {
        type: String,
        enum: ['high', 'medium', 'low'],
        required: true,
        default: 'low'
    },
    tags: [ String ],
    description: String,
    status: {
        type: String,
        enum: ['open', 'close'],
        required: true,
        default: 'open'
    }
}, {
    timestamps:true
});

const Checklist = model('Checklist', checklistSchema);

module.exports = Checklist;