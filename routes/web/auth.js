const express = require('express');
const router = express.Router();

// 导入模型对象
const UserModel = require('../../model/UserModel');
const md5 = require('md5');

// 显示注册页面接口
router.get('/reg', (req, res) => {
    // 响应HTML内容
    res.render('auth/reg');
});

// 注册表单提交接口
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

// 显示登陆页面接口
router.get('/login', (req, res) => {
    // 响应HTML内容
    res.render('auth/login');
});

// 登陆表单提交接口
router.post('/login', (req, res) => {
    let { username, password } = req.body;

    // 查询数据库看看是否存在该用户
    UserModel.findOne({ username: username, password: md5(password) }).then((data) => {
        if (!data) {
            // 登陆失败
            res.render('fail', { msg: '用户名或密码错误！！', url: '/login' });
            return;
        }

        // 写入session
        req.session.username = data.username;
        req.session._id = data._id;

        // 登陆成功
        res.render('success', { msg: '登录成功！！', url: '/account' });
    }).catch((err) => {
        // 登陆失败
        console.log(err);
        res.status(500).send('登陆失败');
        return;
    })

})

// 退出登录
router.post('/logout', (req, res) => {
    // 销毁session
    req.session.destroy(() => {
        res.render('success', { msg: '退出成功', url: '/login' });
    })
})


module.exports = router;