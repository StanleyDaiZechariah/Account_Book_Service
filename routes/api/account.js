var express = require('express');
var router = express.Router();


// 导入moment模块
const moment = require('moment');
// 导入模型对象
const AccountModel = require('../../model/AccountModel');

// 记账本的列表
router.get('/account', function (req, res, next) {
    // 获取所有账单的信息
    AccountModel.find().sort({ time: -1 }).exec().then((data) => {
        // 成功响应
        res.json({
            // 响应编号
            code: '0000',
            // 响应信息
            msg: '读取成功！！',
            // 响应数据
            data: data
        });
    }).catch(() => {
        // 失败响应
        res.json({
            // 响应编号
            code: '1001',
            // 响应信息
            msg: '读取失败!!',
            data: null
        });
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
    // 验证数据
    if (req.body.title.trim() === '') {
        res.json({
            // 响应编号
            code: '1003',
            // 响应信息
            msg: '标题不能为空！！',
            data: null
        });
        return;
    }
    // 插入数据库
    AccountModel.create({
        ...req.body,
        // 修改 time 属性的值 覆盖前面那个对象的 time 属性的值
        time: moment(req.body.time).toDate(),
    }).then((data) => {
        // 成功相应
        res.json({
            // 响应编号
            code: '0000',
            // 响应信息
            msg: '记账成功',
            // 响应数据
            data: data
        })
    }).catch(() => {
        // 失败响应
        res.json({
            // 响应编号
            code: '1002',
            // 响应信息
            msg: '插入失败!!',
            data: null
        });
        return;
    })

});

// 删除记录
router.get('/account/:id', (req, res) => {
    // 获取params里面的id
    let id = req.params.id;
    // 根据id删除数据
    AccountModel.deleteOne({ _id: id }).then(() => {
        // 提醒删除成功
        res.render('success', { msg: '删除成功', url: '/account' });
    }).catch(() => {
        // 失败响应
        res.status(500).send('读取失败!!');
        return;
    })
});

module.exports = router;
