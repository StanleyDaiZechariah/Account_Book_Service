var express = require('express');
var router = express.Router();
// 导入lowdb模块
const low = require('lowdb');
// 导入文件模块
const FileSync = require('lowdb/adapters/FileSync');
// 导入JSON文件
const adapter = new FileSync(__dirname + '/../data/db.json');
// 获取db对象
const db = low(adapter);
// 导入shortid模块
const shortid = require('shortid');

// 记账本的列表
router.get('/account', function (req, res, next) {
  // 获取所有账单的信息
  let accounts = db.get('accounts').value();
  // console.log(accounts);
  res.render('list', { accounts: accounts });
});

// 显示添加账单的页面
router.get('/account/create', function (req, res, next) {
  res.render('create');
});

// 添加记录
router.post('/account', function (req, res, next) {
  // 获取请求体里面的数据
  // console.log(req.body);
  // 生成id
  let id = shortid.generate();
  // 写入文件
  db.get('accounts').unshift({ id: id, ...req.body }).write();
  // 成功相应
  res.render('success', { msg: '记账成功', url: '/account' });
});

// 删除记录
router.get('/account/:id', (req, res) => {
  // 获取params里面的id
  let id = req.params.id;
  // 根据id删除数据
  db.get('accounts').remove({ id: id }).write();
  // 提醒删除成功
  res.render('success', { msg: '删除成功', url: '/account' });
})

module.exports = router;
