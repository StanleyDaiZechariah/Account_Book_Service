const express = require('express');
const router = express.Router();

// 导入模型对象
const UserModel = require('../../model/UserModel');
const md5 = require('md5');

router.get('/reg', (req, res) => {
    // 响应HTML内容
    res.render('auth/reg');
});

router.post('/reg', (req, res) => {
    // 获取请求体数据
    // console.log(req.body);
    // 表单验证
    UserModel.create({ ...req.body, password: md5(req.body.password) }).then((data) => {
        // 注册成功
        res.render('success', { msg: '注册成功！！', url: '/login' });
    }).catch((err) => {
        // 注册失败
        console.log(err);
        res.status(500).send('注册失败');
        return;
    });
});


module.exports = router;