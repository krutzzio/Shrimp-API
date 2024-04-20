

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null,file.fieldname + '-' + Date.now)
    }

    }
)
const upload = multer({storage: storage}) 

exports.upload = upload.single('myFile')

exports.uploadFile =(req, res) => {

}