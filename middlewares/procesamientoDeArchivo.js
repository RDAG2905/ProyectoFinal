const multer = require('multer')
const path = require('path')
const logger = require('../logger')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'files')
    },
    filename: function (req, file, cb) {
        const nombreFinal = `${Date.now()}-foto-${file.originalname}`
        
        cb(null, nombreFinal)
    }
})

const upload = multer({ storage })

const extraerUnArchivo = upload.single('myFile')
const extraerVariosArchivos = upload.array('myFiles')

module.exports = {
    extraerUnArchivo,
    extraerVariosArchivos
}