TDD, Nodejs Server API server 개발1
==================================
Author : SangMin LEE

## TDD ##
여기서는 TDD 방법론을 이용한 간단한 NodeJS API Server를 구현한다. 
각 기능을 테스트 가능한 단위로 쪼개고, 이 테스트를 통과하는 조건으로 API Server를 구현한다.

> 1. 실패하는 테스트 유닛을 만든다.
> 2. 함수 로직을 만든다.
> 3. 테스트에 성공한다.

Node.JS에서 TDD 방법론을 이용한 개발을 위해 Mocha, should, superTest 모듈을 사용한다.

Nodejs API Server with Express
------------------------------

### Express 란? ###
* Express는 Node.JS 상에서 동작하는 웹 개발 프레임워크이다. Node.JS의 핵심 모듈인 http와 Connect component를 기반으로 한다. 이러한 component들을 미들웨어(Middleware)라고 한다. 
* Node.JS에서는 MVC패턴의 적용을 쉽게해주는 여러 써드파티 모듈이 존재한다.그 중 가장 인기있는 모듈이 Express이다.
* 즉 쉽게말해 Middleware의 구조를 가진 Express는 Node.js 개발을 빠르고 손쉽게 할 수 있도록 도와주는 역할을 한다. JavaScript로 작성된 다양한 Middleware는 개발자가 필요한 것만 택하여 사용할 수 있다. 

### npm install ###

>
>**necessary module install** 
> -     $npm init
> -     $npm install express --save
> -     $npm install body-parser --save
> -     $npm install morgan --save

>**test module install** 
> -     $npm install mocha --save-dev (Unit Test를 진행하기 위한 Test Framework)
> -     $npm install should --save-dev (검증 라이브러리)
> -     $npm install supertest --save-dev

### Index.js ###
>
**{Projectfolder}/index.js**

    const express = require('express')
    const logger = require('morgan')
    const bodyParser = require('body-parser')
    const app = express()
    
    app.use(logger('dev'))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))

    //유저 전체 get
    app.get('/users', (req,res) => {

        req.query.limit = req.query.limit || 10;
        const limit = parseInt(req.query.limit, 10)
        console.log("limit:", limit)
        if (Number.isNaN(limit)){
            res.status(400).end()
        }
        else {
            res.json(users.slice(0, limit));
        }
    })

    //유저 get
    app.get('/users/:id', (req,res) =>{

        const id  = parseInt(req.params.id, 10)
        if (Number.isNaN(id))
        {
            return res.status(400).end()
        }
        const user = users.filter(user => user.id === id)[0]

        if (!user){
            return res.status(404).end()
        }
    
        res.json(user)
    })


## Mocha Test ##

Mocha는 Node.JS의 Test Frameworkd이다. 
> - **npm start or npm test**
> -     $npm start (or) npm test

## Package.json Script ##

**{Projectfolder}/package.json**   

    "scripts": {
        "start": "node bin/www.js"
        "test": "NODE_ENV=test mocha api/user/user.spec.js -w"
    }

