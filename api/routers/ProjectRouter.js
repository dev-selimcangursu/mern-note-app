const express = require('express')
const router = express.Router();
const ProjectController = require('../controllers/ProjectController')

router.post('/store',ProjectController.storeProject)

module.exports = router