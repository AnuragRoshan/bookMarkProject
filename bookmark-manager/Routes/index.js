const router = require("express").Router();


const userController = require("../Controller/api");

router.get("/healthz", userController.getHealthz);
router.post("/api/v1/bookmark/create", userController.createBookmark)
router.post('/api/v1/bookmark/save', userController.saveBookmark)
router.post('/api/v1/collections/fetch', userController.fetchCollection)
router.post('/api/v1/collection/create', userController.createCollection)
router.post('/api/v1/collection/delete', userController.deleteCollection)
router.post('/api/v1/collection/rename', userController.renameCollection)
router.post('/api/v1/bookmark/rename', userController.renameBookmark)
router.post('/api/v1/tags/fetch', userController.fetchTag)
router.post('/api/v1/tag/create', userController.createTag)
router.post('/api/v1/tag/delete', userController.deleteTag)
router.post('/api/v1/tag/rename', userController.renameTag)
router.post('/api/v1/bookmarks/fetch', userController.fetchBookmark)
router.post('/api/v1/bookmark/delete', userController.deleteBookmark)

module.exports = router;