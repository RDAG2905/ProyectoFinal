const { Router } = require('express')

const { extraerUnArchivo, extraerVariosArchivos } = require('../middlewares/procesamientoDeArchivo.js')
const { uploadFileController,uploadFilesController } = require('../controllers/uploadFiles.js')

const router = new Router()

router.post('', extraerUnArchivo, uploadFileController)
router.post('/uploadfiles', extraerVariosArchivos, uploadFilesController)

module.exports = router