const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) =>{
    res.status(200).json({
        message: 'Users were fetched'
    })
});

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    if(id === 'special')
        res.status(200).json({
            message: "Special ID was handled"
        });
    else
        res.status(200).json({
            message: "ID was handeled"
        });
});

router.post('/', (req, res, next) =>{
    const user = {
        login: req.body.login,
        password: req.body.password,
        email: req.body.email
    }
    res.status(201).json({
        message: 'Handling POST for users',
        newUser: user
    })
});

router.patch('/:userId', (req, res, next) => {
    res.status(200).json({
        message: "Updated user"
    })
})
router.delete('/:userId', (req, res, next) => {
    res.status(200).json({
        message: "User was deleted"
    })
})

module.exports = router;