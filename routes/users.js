const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) =>{
    res.status(200).json({
        message: 'Handling GET for users'
    })
});

router.post('/', (req, res, next) =>{
    res.status(200).json({
        message: 'Handling POST for users'
    })
});

module.exports = router;