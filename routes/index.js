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

// 导入moment模块
const moment = require('moment');
// 导入模型对象
const AccountModel = require('../model/AccountModel');

// 记账本的列表
router.get('/account', function (req, res, next) {
  // 获取所有账单的信息
  AccountModel.find().sort({ time: -1 }).exec().then((data) => {
    // 成功响应
    res.render('list', { accounts: data, moment: moment });
  }).catch((err) => {
    // 失败响应
    res.status(500).send('读取失败!!');
    return;
  })

});

// 显示添加账单的页面
router.get('/account/create', function (req, res, next) {
  res.render('create');
});

// 添加记录
router.post('/account', function (req, res, next) {
  // 获取请求体里面的数据
  // console.log(req.body);
  // 插入数据库
  AccountModel.create({
    ...req.body,
    // 修改 time 属性的值 覆盖前面那个对象的 time 属性的值
    time: moment(req.body.time).toDate(),
  }).then(() => {
    // 成功相应
    res.render('success', { msg: '记账成功', url: '/account' });
  }).catch(() => {
    // 失败响应
    res.status(500).send('插入失败！！')
    return;
  })

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
