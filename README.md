# 项目介绍
本项目通过node+express+typescript+mysql+typeorm构建restful风格api。项目比较简单，非常适合入门学习typeorm。后续会在项目加入单元测试、接口权限验证、redis、前端基于react进行展示等功能。
# 为什么选择typeorm
- 1、[文档](https://typeorm.io/#/)丰富且有中文版
- 2、强大的链式函数式的查询方法，使得代码简洁易懂
- 3、通过实体自动生成数据库表
- 4、实体关系配置简单、灵活、易懂

# 运行项目
- 1、git clone git@github.com:mrh520/mrh_album.git
- 2、cd mrh_album
- 3、npm install 
- 4、npm start

# 项目api接口调用
如果你想调用接口，可以打开项目中 src/test/jmeter/api.mjx文件进行调用。
如果你不懂如何使用jmeter，请自行百度学习。
# 接口文档
方法|请求方式|Content-type|功能
-|-|-|-|
|/upload|post|multipart/form-data|上传文件
|/photo|post|application/json|创建图片信息
|/photo|get|text/plain|获取图片信息列表
|/photo|put|application/json|修改图片信息
|/photo?id=1|delete|text/plain|通过id删除图片信息
|/album|post|application/json|创建相册
|/album|get|text/plain|获取相册信息列表
|/album|put|application/json|修改相册信息
|/album?id=1|delete|text/plain|通过id删除相册
- 创建图片
```javascript 
Url：http://localhost:3000/photo
请求方式：post
Content-Type:application/json
数据示例：
{
	"name":"test",
	"description":"图片",
	"filename":"test.jpg",
	"views":"1","isPublished":"true",
	"albums":[{
		"id":59,
		"name":"wodeceshi"
		},
		{
		"id":58,
		"name":"66677788899"
		}
		],
	"author":{
		"name":"作者"
		},
	"photoMetadata":{
		"comment":"bucuo",
		"compressed":true,
		"orientation":"66666",
		"height":200,
		"width":200	
		}
}
返回结果：
{
    "code": 1,
    "data": {
        "albums": [
            {
                "name": "我的相册",
                "id": 59
            },
            {
                "name": "别人的相册",
                "id": 58
            }
        ],
        "metadata": {
            "orientation": "66666",
            "width": 200,
            "comment": "bucuo",
            "compressed": true,
            "id": 7,
            "height": 200
        },
        "filename": "test.jpg",
        "isPublished": "true",
        "author": {
            "name": "作者",
            "id": 11
        },
        "name": "test",
        "description": "123",
        "id": 41,
        "views": "1"
    },
    "message": "success"
}
```
- 上传文件

```JavaScript
url：http://localhost:3000/upload
请求方式：post
Content-Type：multipart/form-data
自行选择上传文件
```

