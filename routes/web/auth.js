const express = require('express');
const router = express.Router();

// 导入模型对象
router.get('/reg', (req, res) => {
    // 响应HTML内容
    res.render('auth/reg');
})


module.exports = router;