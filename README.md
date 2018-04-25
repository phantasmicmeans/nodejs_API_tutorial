Nodejs Server API server 개발 1
==================================

![nodejs](https://user-images.githubusercontent.com/20153890/39241370-a04076fa-48c1-11e8-950b-614b63faae03.png)

###### Official Nodejs logo from nodejs.org ######
 

## TDD ##
T Academy Node.JS 기반의 REST API Server개발에 대한 세미나를 듣고 따로 정리를 해보려 한다.
여기서는 TDD 방법론을 이용한 간단한 NodeJS API Server를 구현한다. 
각 기능을 테스트 가능한 단위로 쪼개고, 이 테스트를 통과하는 조건으로 API Server를 구현한다.

> 1. 실패하는 테스트 유닛을 만든다.
> 2. 함수 로직을 만든다.
> 3. 테스트에 성공한다.

TDD 방법론을 이용한 개발을 위해 Mocha, should, superTest 모듈을 사용한다.

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
> -     $npm install mocha --save-dev (Unit Test를 진행하기 위한 Test Framework)
> -     $npm install should --save-dev (검증 라이브러리)
> -     $npm install supertest --save-dev

    
    
### 1. Test Unit을 만든다 ###


**{Projectfolder}/user.spec.js 일부**
    
```javascript
    const assert = require('assert')
    const should = require('should')
    const request = require('supertest')
    const app = require('./index')

    describe('GET /users', () => {
        describe('성공', () => {
            it('배열을 반환한다', (done) => {
            request(app)
                .get('/users')
                .end((err,res) => {
                res.body.should.be.instanceof(Array)
                res.body.forEach(user => {
                    user.should.have.property('name')
                })
                done()
                })
            })
            it('최대 limit 갯수만큼 응답한다', done => {
                request(app)
                .get('/users?limit=2')
                .end((err,res) => {
                    res.body.should.have.lengthOf(2)
                    done()
                })
            })
        })

        describe('실패', () => {
            it('limit이 정수가 아니면 400을 응답한다', done => {
            request(app)
                .get('/users?limit=two')
                .expect(400)
                .end(done)
            })
        })
    })
```




### 2. 함수 로직을 만든다 ###


**{Projectfolder}/index.js 일부**

```javascript
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
```
   


### 3. Test에 성공한다. ###


**{Projectfolder}/package.json, "scripts"**   

```javascript
    "scripts": {
        "start": "node index",
        "test": "mocha ./user.spec.js"
    }
```

**npm test 실행**

> -     $npm test


![test](https://user-images.githubusercontent.com/20153890/39226762-562e2148-488f-11e8-91ea-09171897aa70.PNG)


Test가 성공적으로 완료된 모습을 볼 수 있다. 

### 다음 단계에서는 {Projectfolder}/index.js에 구현되어있는 API들을 분리한다. ###
Nodejs_API_tutorial 2 => https://github.com/phantasmicmeans/nodejs_API_tutorial2
