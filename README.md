Nodejs Server API server 개발 (TDD)
Author : SangMin LEE

1.  npm init (package.json 파일 생성)

2.  npm install express --save
    npm install body-parser --save
    npm install morgan --save
# 필요 모듈 install

3.  npm install mocha --save-dev
    npm install should --save-dev
    npm install supertest --save-dev
# test에 필요한 module install

4.  npm start (or) npm test
    
#package.json file의 start, test 명세 
    --> pacakge.json 
    "scripts": {
        "start": "node ./index"
        "test": "mocha ./user.spec.js"
    }
    
    
