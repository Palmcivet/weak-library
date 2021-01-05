- [鉴权](#鉴权)
    - [`login`](#login)
    - [`logout`](#logout)
- [用户管理](#用户管理)
    - [`fetch`](#fetch)
    - [`modify`](#modify)
    - [`delete`](#delete)
    - [`register`](#register)
    - [`status`](#status)
    - [`record`](#record)
- [图书管理](#图书管理)
    - [`fetch`](#fetch-1)
    - [`modify`](#modify-1)
    - [`delete`](#delete-1)
    - [`register`](#register-1)
    - [`query`](#query)
    - [`category`](#category)
- [手续管理](#手续管理)
    - [`borrow`](#borrow)
    - [`return`](#return)

## 鉴权
### `login`

- URL：`/auth/login`
- 方法：POST
- 请求
    ```json
    {
        "id": 10708121,
        "pass": "Test123"
    }
    ```
- 成功
    ```json
    {
        "code": 0,
        "msg": "登陆成功",
        "data": {
            "id": 10934249,
            "name": "张三",
            "role": 1,
        }
    }
    ```
- 失败
    ```json
    {
        "code": 100,
        "msg": "账号或密码错误",
        "data": null
    },
    {
        "code": -2,
        "msg": "登录失败",
        "data": null
    }
    ```

### `logout`

- URL：`/auth/logout`
- 方法：POST
- 请求
    ```json
    {
        "id": 12301013,
    }
    ```
- 成功
    ```json
    {
        "code": 0,
        "msg": "退出成功",
        "data": null
    }
    ```

## 用户管理
### `fetch`

- URL：`/admin/fetch`
- 方法：POST
- 请求
    ```json
    {
        "id": 12301013,
    }
    ```
- 成功
    ```json
    {
        "code": 0,
        "msg": "获取信息成功",
        "data": {
            "id": 12301013,
            "name": "user",
            "sex": 0,
            "role": 1,
            "date": "2020-12-06",
            "tel": "125323342",
            "email": "3234@erf.com"
        }
    }
    ```
- 失败
    ```json
    {
        "code": -2,
        "msg": "获取信息失败",
        "data": null
    }
    ```

### `modify`

- URL：`/admin/modify`
- 方法：POST
- 请求：
    ```json
    {
        "id": 101232,
        "name": "新名字",
        "sex": 1,
        "role": 0,
        // 是否重置
        "pass": true,
        "tel": "111111",
        "email": "new@email.com",
    }
    ```
- 成功：
    ```json
    {
        "code": 0,
        "data": null,
        "msg": "用户信息更改成功"
    }
    ```
- 失败：
    ```json
    {
        "code": -2,
        "data": null,
        "msg": "用户信息更改失败"
    }
    ```

### `delete`

- URL：`/admin/delete`
- 方法：POST
- 请求
    ```json
    {
        "id": 12301013,
    }
    ```
- 成功
    ```json
    {
        "code": 0,
        "msg": "注销成功",
        "data": null
    }
    ```
- 失败
    ```json
    {
        "code": -1,
        "msg": "注销失败",
        "data": null
    }
    ```

### `register`

- URL：`/admin/register`
- 方法：POST
- 请求
    ```json
    {
        "id": 12301013,
        "name": "myname",
        // 注册时该字段不使用。密码默认为 id
        "pass": null,
        "sex": 1,
        "role": 0,
        "tel": "1223242342",
        "email": "weds@sdf.cs"
    }
    ```
- 成功
    ```json
    {
        "code": 0,
        "msg": "新用户注册成功",
        "data": null
    }
    ```
- 失败
    ```json
    {
        "code": -2,
        "msg": "新用户注册失败",
        "data": null
    }
    ```

### `status`

- URL：`/admin/status`
- 方法：POST
- 请求
    ```json
    {
        "id": 12301013,
    }
    ```
- 成功
    ```json
    {
        "code": 0,
        "msg": "获取信息成功",
        "data": [{
            "key": 2342325,
            "date": "2020-03-12",
            "name": "book_name",
            "index": "TP234/23"
        },{
            // ...
        }]
    }
    ```
- 失败
    ```json
    {
        "code": -2,
        "msg": "当前借阅信息获取失败",
        "data": null
    }
    ```

### `record`

- URL：`/admin/record`
- 方法：POST
- 请求
    ```json
    {
        "id": 12301013,
    }
    ```
- 成功
    ```json
    {
        "code": 0,
        "msg": "获取信息成功",
        "data": [{
            "key": 2342325,
            "date": "2020-03-12",
            "name": "book_name",
            "index": "TP234/23"
        },{
            // ...
        }]
    }
    ```
- 失败
    ```json
    {
        "code": -2,
        "msg": "历史借阅信息获取失败",
        "data": null
    }
    ```

## 图书管理
### `fetch`

- URL：`/book/fetch`
- 方法：POST
- 请求：
    ```json
    {
        "bar_code": "2430151"
    }
    ```
- 成功：
    ```json
    {
        "code": 0,
        "data": {
            "key": 10123332,
            "index": "TP34DF/34",
            "name": "新名字",
            "type": 312,
            "author": "new_pass",
            "press": "111111",
            "price": 211.12,
        },
        "msg": "图书查询成功"
    }
    ```
- 失败：
    ```json
    {
        "code": -2,
        "data": null,
        "msg": "图书查询失败"
    }
    ```

### `modify`

- URL：`/book/modify`
- 方法：POST
- 请求：
    ```json
    {
        "key": 10123332,
        "index": "TP23DF/34",
        "name": "新名字",
        "type": 312,
        "author": "new_pass",
        "press": "3454311",
        "price": 211.12,
    }
    ```
- 成功：
    ```json
    {
        "code": 0,
        "msg": "图书信息修改成功",
        "data": null
    }
    ```
- 失败：
    ```json
    {
        "code": -2,
        "msg": "图书信息修改失败",
        "data": null
    }
    ```

### `delete`

- URL：`/book/delete`
- 方法：POST
- 请求：
    ```json
    {
        "key": 10123332,
        // 以下字段不起作用
        "index": "TP23DF/34",
        "name": "新名字",
        "type": 312,
        "author": "new_pass",
        "press": "3454311",
        "price": 211.12,
    }
    ```
- 成功：
    ```json
    {
        "code": 0,
        "msg": "图书注销成功",
        "data": null
    }
    ```
- 失败：
    ```json
    {
        "code": 2,
        "msg": "图书注销失败",
        "data": null
    }
    ```

### `register`

- URL：`/book/register`
- 方法：POST
- 请求：
    ```json
    {
        "index": "TP312RU/F090",
        "name": "深入浅出Rust",
        "type": 312,
        "author": "范长春",
        "press": "机械工业出版社",
        "price": 89.00,
    }
    ```
- 成功
    ```json
    {
        "code": 0,
        "msg": "图书登记成功",
        "data": null
    }
    ```
- 失败
    ```json
    {
        "code": -2,
        "msg": "图书登记失败",
        "data": null
    }
    ```

### `query`

- URL：`/book/query`
- 方法：POST
- 请求：
    ```json
    {
        "keyword": "TP324DF/DF34",
    }
    ```
- 成功：
    ```json
    {
        "code": 0,
        "msg": "查询成功",
        "data": [
            {
                "key": "235343",
                "index": "TP234/2342",
                "name": "book_name",
                "type": 314,
                "author": "author",
                "press": "2343.press",
                "price": 23.6,
            }
        ]
    }
    ```
- 失败：
    ```json
    {
        "code": 1,
        "msg": "数据库处理错误",
        "data": null
    }
    ```

### `category`

- URL：`/book/category`
- 方法：POST
- 请求：
    ```json
    {
        "keyword": "TP324DF/DF34",
    }
    ```
- 成功：
    ```json
    {
        "code": 0,
        "data": [{
            "type_id": 324,
            "type_name": "程序设计"
        }],
        "msg": "图书类别查询成功"
    }
    ```
- 失败：
    ```json
    {
        "code": -2,
        "data": null,
        "msg": "图书类别查询失败"
    }
    ```

## 手续管理
### `borrow`

- URL：`/procedure/borrow`
- 方法：POST
- 请求：
    ```json
    {
        "book": 2323232,
        "user": 10706232
    }
    ```
- 成功：
    ```json
    {
        "code": 0,
        "data": null,
        "msg": "借书成功"
    }
    ```
- 失败：
    ```json
    {
        "code": 320,
        "data": [{
            "key": 2342325,
            "date": "2020-03-12",
            "name": "book_name",
            "index": "TP234/23"
        }],
        "msg": "该图书已被借阅"
    },
    {
        "code": 310,
        "data": [{
            "key": 2342325,
            "date": "2020-03-12",
            "name": "book_name",
            "index": "TP234/23"
        }],
        "msg": "有超期图书"
    },
    {
        "code": 300,
        "data": [{
            "key": 2342325,
            "date": "2020-03-12",
            "name": "book_name",
            "index": "TP234/23"
        }],
        "msg": "已达借书上限"
    },
    {
        "code": -2,
        "data": null,
        "msg": "借书失败"
    }
    ```

### `return`

- URL：`/procedure/return`
- 方法：POST
- 请求：
    ```json
    {
        "book": 2323232,
        "user": 10706232
    }
    ```
- 成功：
    ```json
    {
        "code": 0,
        "data": null,
        "msg": "还书成功"
    }
    ```
- 失败：
    ```json
    {
        "code": 350,
        "data": null,
        "msg": "图书未借阅"
    },
    {
        "code": -2,
        "data": null,
        "msg": "还书失败"
    }
    ```
