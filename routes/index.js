const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.send('healthy');
});

module.exports = router;
