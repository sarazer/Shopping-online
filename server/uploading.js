var path = require('path');
var express = require('express');
var router = express.Router();
var multer = require('multer');

module.exports = router;

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'upload');
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname);
    }
});

var upload = multer({ storage: storage }).single('image');

router.post('/uploadFile', (req, res) => {
    upload(req, res, (err, newFile) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error upload file.");
        }
        res.end(JSON.stringify(res.req.file.filename));
    });
});

router.use('/images', express.static(path.join(__dirname, '../', 'upload')))
