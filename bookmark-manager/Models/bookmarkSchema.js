const mongoose = require('mongoose');

const bookmarksSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', 
        required: true
    },
    bookmark_name: {
        type: String,
        required: true
    },
    note: {
        type: String
    },
    created_on: {
        type: Date,
        default: Date.now
    },
    collection_name: {
        type: String
    },
    tags: [{
        type: String
    }],
    is_favorite: {
        type: Boolean,
        default: false
    },
    url: {
        type: String
    }
});

const Bookmarks = mongoose.model('Bookmarks', bookmarksSchema);

module.exports = Bookmarks;
