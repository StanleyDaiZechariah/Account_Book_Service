// 导入lowdb
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');

// 创建lowdb实例
const db = low(adapter);

// 初始化数据
db.defaults({ posts: [], user: {} }).write();

// 写入数据
// db.get('posts').push({ id: 1, title: 'lowdb is awesome' }).write();
// db.get('posts').unshift({ id: 2, title: 'lowdb is awesome2' }).write();

// 获取单条数据
// let result = db.get('posts').find({ id: 2 }).value();
// console.log(result);
// 获取数据
// console.log(db.get('posts').value());

// 删除数据
// let res = db.get('posts').remove({ id: 1 }).write();
// console.log(res);

// 更新数据
db.get('posts').find({ id: 2 }).assign({ title: 'lowdb is awesome3' }).write();