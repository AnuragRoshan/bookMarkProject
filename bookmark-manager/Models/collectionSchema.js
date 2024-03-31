const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    collection_name: {
        type: String,
        required: true
    },
    created_on: {
        type: Date,
        default: Date.now
    }
});

const Collections = mongoose.model('Collections', collectionSchema);

module.exports = Collections;
