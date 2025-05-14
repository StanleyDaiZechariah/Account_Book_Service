module.exports = (req, res, next) => {
    // 判断 session 里面是否有 username 字段
    if (!req.session.username) {
        // 没有登录
        return res.redirect('/login');
    }
    next();
}