var express = require('express');
var router = express.Router();

// 记账本的列表
router.get('/account', function (req, res, next) {
  res.render('list');
});

router.get('/account/create', function (req, res, next) {
  res.render('create');
});

router.post('/account', function (req, res, next) {
  // 获取请求体里面的数据
  console.log(req.body);
  res.send('添加记录');
})

module.exports = router;
