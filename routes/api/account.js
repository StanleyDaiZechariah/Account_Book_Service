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
router.delete('/account/:id', (req, res) => {
    // 获取params里面的id
    let id = req.params.id;
    // 根据id删除数据
    AccountModel.deleteOne({ _id: id }).then((data) => {
        // 提醒删除成功
        res.json({
            code: '0000',
            msg: '删除成功',
            data: data
        })
    }).catch(() => {
        // 失败响应
        res.json({
            // 响应编号
            code: '1004',
            // 响应信息
            msg: '删除失败!!',
            data: null
        })
        return;
    })
});

// 获取单个账单信息
router.get('/account/:id', (req, res) => {
    // 获取params里面的id
    let id = req.params.id;
    // 根据id查询数据
    AccountModel.findById(id).then((data) => {
        // 成功响应
        res.json({
            code: '0000',
            msg: '查询单个账单成功',
            data: data
        })
    }).catch(() => {
        // 失败响应
        res.json({
            // 响应编号
            code: '1005',
            // 响应信息
            msg: '查询单个账单失败!!',
            data: null
        })
        return;
    });
});

// 修改记录
router.patch('/account/:id', (req, res) => {
    // 获取params里面的id
    let id = req.params.id;
    // 根据id查询数据
    AccountModel.updateOne({ _id: id }, req.body).then((data) => {
        // 再次查询数据库
        AccountModel.findById(id).then((data) => {
            // 成功响应
            res.json({
                code: '0000',
                msg: '读取修改后的数据成功',
                data: data
            });
        }).catch(() => {
            // 失败响应
            res.json({
                // 响应编号
                code: '1007',
                // 响应信息
                msg: '读取修改后的数据失败!!',
                data: null
            })
        })
    }).catch(() => {
        // 失败响应
        res.json({
            // 响应编号
            code: '1006',
            // 响应信息
            msg: '修改失败!!',
            data: null
        })
    });
});

module.exports = router;
