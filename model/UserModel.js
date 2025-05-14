// 导入mongoose
const mongoose = require('mongoose');
// 创建文档结构文件对象
// 设置集合中文档的属性以及属性值的类型
let UserSchema = new mongoose.Schema({
    // 用户名
    username: {
        type: String,
        required: true
    },
    // 密码
    password: {
        type: String,
        required: true
    }
});

// 创建模型对象  对文档操作的封装对象
let UserModel = mongoose.model('users', UserSchema);

// 向外暴露模型对象
module.exports = UserModel;