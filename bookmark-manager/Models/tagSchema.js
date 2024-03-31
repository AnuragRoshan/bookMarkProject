const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', 
        required: true
    },
    tag_name: {
        type: String,
        unique: true,
        required: true
    },
    created_on: {
        type: Date,
        default: Date.now
    }
});

const Tags = mongoose.model('Tags', tagSchema);

module.exports = Tags;
