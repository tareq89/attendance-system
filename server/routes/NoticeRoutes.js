const express = require('express');
const router = express.Router();

router.get('/get', (req, res) => {
    const notices = [
        {
            title: "Title 1",
            subtitle: "Subtitle 1",
            description: "description description description description description description",
            createTime: 298783927893
        },
        {
            title: "Title 1",
            subtitle: "Subtitle 1",
            description: "description description description description description description <b>This is bold</b>",
            createTime: 298783927893
        },
        {
            title: "Title 1",
            subtitle: "Subtitle 1",
            description: "description <b>This is bold</b> description description description description",
            createTime: 298783927893
        },
        {
            title: "Title 1",
            subtitle: "Subtitle 1",
            description: "<b>This is bold</b> description description description description description description",
            createTime: 298783927893
        }
    ]

    res.json(notices);
});


router.post('/post', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
});


module.exports = router