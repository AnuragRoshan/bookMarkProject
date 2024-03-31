const Users = require("../Models/userSchema");
const Collections = require("../Models/collectionSchema");
const Tags = require("../Models/tagSchema");
const Bookmarks = require("../Models/bookmarkSchema");

exports.getHealthz = async (req, res) => {
    try {
        res.status(200).json({ "ping": "pong" });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

// POST /api/v1/bookmark/create
exports.createBookmark = async (req, res) => {
    try {
        const { user_id, url } = req.body;

        // Search the Bookmark collection with user_id and url
        const bookmark = await Bookmarks.findOne({ user_id: user_id, url: url });

        if (bookmark) {
            // If data is present, send all the data
            return res.json({
                name: bookmark.bookmark_name,
                note: bookmark.note,
                collection_name: bookmark.collection_name,
                tags: bookmark.tags,
                url: bookmark.url,
                is_favorite: bookmark.is_favorite
            });
        } else {
            // If data is not present, send empty values
            return res.json({
                name: '',
                note: '',
                collection: '',
                tags: [],
                url: '',
                is_favorite: false
            });
        }
    } catch (error) {
        console.error('Error retrieving bookmark:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// POST /api/v1/bookmark/save
exports.saveBookmark = async (req, res) => {
    // console.log("called")
    try {
        const { user_id, title, note, collection_name, tags, url, is_favorite } = req.body;

        const existingCollection = await Collections.findOne({ user_id, collection_name });
        console.log(existingCollection);
        if (!existingCollection) {
            // If entry does not exist, create the entry
            const newCollection = new Collections({
                user_id: user_id,
                collection_name: collection_name
            });

            await newCollection.save();
        }

        if (tags && tags.length > 0) {
            for (const tag_name of tags) {
                await createOrFindTag(user_id, tag_name);
            }
        }


        // Search the Bookmark collection with user_id and url
        const existingBookmark = await Bookmarks.findOne({ user_id, url });

        if (existingBookmark) {
            // If data is present, update the document
            existingBookmark.name = title;
            existingBookmark.note = note;
            existingBookmark.collection_name = collection_name;
            existingBookmark.tags = tags;
            existingBookmark.is_favorite = is_favorite;

            await existingBookmark.save();

            return res.json({ success: true });
        } else {
            // If data is not present, insert the document
            const newBookmark = new Bookmarks({
                user_id,
                bookmark_name: title,
                note,
                collection_name: collection_name,
                tags,
                url,
                is_favorite
            });

            await newBookmark.save();

            return res.json({ success: true });
        }
    } catch (error) {
        console.error('Error saving bookmark:', error);
        res.status(500).json({ success: false });
    }
}

// Function to create or find a tag
async function createOrFindTag(user_id, tag_name) {

    // Search the tag collection with user_id and tag_name
    const existingTag = await Tags.findOne({ user_id, tag_name });
    console.log(existingTag);
    if (!existingTag) {
        // If entry does not exist, create the entry
        const newTag = new Tags({
            user_id: user_id,
            tag_name: tag_name
        });

        await newTag.save();
    }
}

// POST /api/v1/collection/fetch
exports.fetchCollection = async (req, res) => {
    try {
        const { user_id } = req.body;
        console.log(user_id)

        // Search the Collection collection with user_id
        const collections = await Collections.find({ user_id });

        // Extract collection names from the result
        const collectionNames = collections.map(collection => collection.collection_name);

        // Respond with the list of collection names
        res.json({ collection_list: collectionNames });
    } catch (error) {
        console.error('Error fetching collections:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// POST /api/v1/collection/create
exports.createCollection = async (req, res) => {
    try {
        const { user_id, collection_name } = req.body;

        // Search the Collection collection with user_id and collection_name
        const existingCollection = await Collections.findOne({ user_id, collection_name });

        if (existingCollection) {
            // If entry already exists, respond with success as false
            return res.json({ success: false });
        } else {
            // If entry does not exist, create the entry
            const newCollection = new Collections({
                user_id: user_id,
                collection_name: collection_name
            });

            await newCollection.save();
            return res.json({ success: true });
        }
    } catch (error) {
        console.error('Error creating collection:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

// POST /api/v1/collection/delete
exports.deleteCollection = async (req, res) => {
    try {
        const { user_id, collection_name } = req.body;

        // Search the Collection collection with user_id and collection_name
        const deletedCollection = await Collections.findOneAndDelete({ user_id, collection_name });

        if (deletedCollection) {
            // If collection was deleted successfully, respond with success as true
            return res.json({ success: true });
        } else {
            // If collection was not found, respond with success as false
            return res.json({ success: false });
        }
    } catch (error) {
        console.error('Error deleting collection:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

// POST /api/v1/collection/rename
exports.renameCollection = async (req, res) => {
    try {
        const { user_id, old_collection_name, new_collection_name } = req.body;

        // Search the Collection collection with user_id and old_collection_name
        const existingCollection = await Collections.findOne({ user_id, collection_name: old_collection_name });

        if (existingCollection) {
            // If the old collection is found, update its name
            existingCollection.collection_name = new_collection_name;
            await existingCollection.save();

            return res.json({ success: true });
        } else {
            // If the old collection is not found, respond with success as false
            return res.json({ success: false });
        }
    } catch (error) {
        console.error('Error renaming collection:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
// POST /api/v1/bookmark/rename
exports.renameBookmark = async (req, res) => {
    try {
        const { user_id, url, new_bookmark_name } = req.body;

        // Search the Collection collection with user_id and old_collection_name
        console.log(user_id, url, new_bookmark_name);
        const existingBookmark = await Bookmarks.findOne({ user_id, url });
        console.log(existingBookmark);
        if (existingBookmark) {
            // If the old collection is found, update its name
            existingBookmark.bookmark_name = new_bookmark_name;
            await existingBookmark.save();

            return res.json({ success: true });
        } else {
            // If the old collection is not found, respond with success as false
            return res.json({ success: false });
        }
    } catch (error) {
        console.error('Error renaming bookmark:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


//TAGS
// POST /api/v1/tag/fetch
exports.fetchTag = async (req, res) => {
    try {
        const { user_id } = req.body;

        // Search the Tags collection with user_id
        const tags = await Tags.find({ user_id });
        const tagNames = tags.map(tag => tag.tag_name);

        res.json({ tags_list: tagNames });
    } catch (error) {
        console.error('Error fetching tags:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// POST /api/v1/tag/create
exports.createTag = async (req, res) => {
    try {
        const { user_id, tag_name } = req.body;

        // Search the tag collection with user_id and tag_name
        const existingTag = await Tags.findOne({ user_id, tag_name });

        if (existingTag) {
            // If entry already exists, respond with success as false
            return res.json({ success: false });
        } else {
            // If entry does not exist, create the entry
            const newTag = new Tags({
                user_id: user_id,
                tag_name: tag_name
            });

            await newTag.save();
            return res.json({ success: true });
        }
    } catch (error) {
        console.error('Error creating tag:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


// POST /api/v1/tag/delete
exports.deleteTag = async (req, res) => {
    try {
        const { user_id, tag_name } = req.body;

        // Search the tag collection with user_id and tag_name
        const deletedTag = await Tags.findOneAndDelete({ user_id, tag_name });

        if (deletedTag) {
            // If tag was deleted successfully, respond with success as true
            return res.json({ success: true });
        } else {
            // If tag was not found, respond with success as false
            return res.json({ success: false });
        }
    } catch (error) {
        console.error('Error deleting tag:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

// POST /api/v1/tag/rename
exports.renameTag = async (req, res) => {
    try {
        const { user_id, old_tag_name, new_tag_name } = req.body;

        // Search the tag collection with user_id and old_tag_name
        const existingTag = await Tags.findOne({ user_id, tag_name: old_tag_name });

        if (existingTag) {
            // If the old tag is found, update its name
            existingTag.tag_name = new_tag_name;
            await existingTag.save();

            return res.json({ success: true });
        } else {
            // If the old tag is not found, respond with success as false
            return res.json({ success: false });
        }
    } catch (error) {
        console.error('Error renaming tag:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

// POST /api/v1/bookmarks/fetch
exports.fetchBookmark = async (req, res) => {
    try {
        const { user_id, all_bookmark, favorite, collection_name, tag_name, without_tag, search } = req.body;
        console.log(collection_name, tag_name, without_tag, search);
        let query = { user_id };
        if (!all_bookmark) {
            if (favorite) {
                query.is_favorite = favorite;
            } else if (collection_name && typeof collection_name === 'string' && collection_name.trim() !== '') {
                query.collection_name = collection_name;
            } else if (tag_name && typeof tag_name === 'string' && tag_name.trim() !== '') {
                query.tags = tag_name;
            } else if (without_tag) {
                query.tags = { $size: 0 };
            } else if (search && typeof search === 'string' && search.trim() !== '') {
                query.$or = [
                    { bookmark_name: { $regex: search, $options: 'i' } },
                    { note: { $regex: search, $options: 'i' } },
                    { url: { $regex: search, $options: 'i' } }
                ];
            }
        }
        console.log(query);
        const bookmarks = await Bookmarks.find(query);
        // Respond with the list of bookmarks
        res.json({ bookmark_list: bookmarks });
    } catch (error) {
        console.error('Error fetching bookmarks:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// POST /api/v1/bookmark/delete
exports.deleteBookmark = async (req, res) => {
    try {
        const { user_id, url } = req.body;

        // Search for the bookmark with user_id and url
        const bookmark = await Bookmarks.findOneAndDelete({ user_id, url });

        if (bookmark) {
            // If bookmark found and deleted successfully
            return res.json({ success: true });
        } else {
            // If bookmark not found
            return res.json({ success: false });
        }
    } catch (error) {
        console.error('Error deleting bookmark:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}