# node-express-reconsitution
使用node重写博客网站服务器

#### 1.0_~~登录模块接口~~---完成
#### 1.1_~~登出模块接口~~---完成
#### 1.2_~~整体概述查询接口~~---完成
#### 1.3_~~文章列表查询接口~~---完成
#### 1.4_~~新增接口~~---完成
#### 1.5_~~获取文章详情接口~~---完成
#### 1.6_~~更新文章接口~~---完成
    * 更新文件上传模块 --> express-fileupload


#### 2.0_~~vue-router history 问题~~
    解决vue-router history模式下刷新404问题
    引入connect-history-api-fallback中间件

``` JavaScript

    var history = require('connect-history-api-fallback');  //引入
    
    //调用
    var app = express();
    
    app.use(history()); //注:在静态文件前调用
    
```    