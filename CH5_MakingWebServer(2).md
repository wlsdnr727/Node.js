#05-03 미들웨어 사용하기

###static 미들웨어

- static 미들웨어는 특정 폴더의 파일들을 특정 패스로 접근할 수 있도록 만들어 준다. 예를들어 [public]폴더에 있는 모든 파일을 웹 서버의 루트 패스로 접근할 수 있도록 만들고 싶다면 다음 코드를 추가하면 된다.
```shell
app.use(express.static(path.join(__dirname,'public')));
```
이 코드는 익스프레스 프로젝트를 만들때 자동으로 생성된다. 따라서 [public]폴더 안에 있는 파일들은 클라이언트에서 바로 접근할 수 있다. 

예를들어 프로젝트 폴더 안에 아래와 같은 폴더나 파일들이 있다면,
```shell
ExpressExample/public/index.html
ExpressExample/public/images/house.png
ExpressExample/public/js/main.js
ExpressExample/public/css/style.css
```
웹 브라우저에서 다음과 같은 주소로 바로 접근할 수 있다.
```shell
http://localhose:3000/index.html
http://localhose:3000/images/house.png
http://localhose:3000//js/main.js
http://localhose:3000/css/style.css
```
프로젝트 안의 [/public/images]폴더에 들어있는 house.png 이미지 파일을 웹 브라우저에서 보려면 app.js파일 안에서 다음과 같이 응답을 보내면 된다.
```shell
res.end("<img src='/images/house.png' width='50%'");
```
만약 [public]폴더 안에 있는 파일을 사이트의 /public 패스로 접근하도록 만들고 싶다면 static()메소드를 호출할 때 다음과 같이 패스를 지정해 주면 된다.
```shell
app.use('/public,express.static(path.join(__dirname,'public')));
```
이는 use()메소드의 첫번째 파라미터로 요청 패스를 지정했으며 두번째 파라미터 static()함수로 특정 폴더를 지정했다. 이렇게 하면 요청 패스와 특정 폴더가 맵핑되어 접근할 수 있다.

### body-parser 미들웨어


- POST로 요청했을 때 요청 파라미터를 확인할 수 있도록 만들어둔 미들웨어. GET 방식으로 요청할 때는 주소 문자열에 요청 파라미터가 들어간다. 하지만 이와달리 POST방식으로 요청할 때는 본문인 본문 영역에 요청 파라미터가 들어있게 되므로 요청 파라미터를 파싱하는 방법이 GET방식과 다르다.

File - New - Other - Web - HTML File 선택 - Express프로젝트 안에 있는 public 폴더 선택, 파일이름을 login.html로 만들자.

[/public/login.html]
```shell
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>로그인 테스트</title>
	</head>
<body>
	<h1>로그인</h1>
	<br>
	<form method="post">
		<table>
			<tr>
				<td><label>아이디</label></td>
				<td><input type="text" name="id"><td/>
			</tr>
			<tr>
				<td><label>비밀번호</label></td>
				<td><input type="password" name="password"></td>
			</tr>
		</table>
		<input type="submit" value="전송" name="">
	</form>
</body>
</html>
```

[app7.js]
```shell

var express = require('express')
//  , routes = require('./routes')
//  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var bodyParser=require('body-parser');

var app = express();



app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended:true}));

app.use(function(req,res,next){
    console.log('첫 번째 미들웨어에서 요청을 처리함');
    
    var paramId =req.param('id');
    var paramPassword=req.param('password');

    res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>Param id : '+paramId+'</p></div>');
    res.write('<div><p>Param password : '+paramPassword+'</p></div>');
    res.end();
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

```

body-parser 미들웨어는 외장 모듈로 만들어져 있으므로 먼저 설치해야 한다. 설치하자.

```shell
% npm install body-parser --save
```
이제 app7.js를 실행한 후 localhost:3000/login..html 을 입력하여 접속하면 로그인창이 뜬다는데 난 안뜸 ;;
서버 코드에서 use()메소드로 설정한 함수는 login.html문서에 접근할 때는 호출되지 않는다. 따라서 처음에는 logiin.html문서가 웹 브라우저에 보이며, 버튼을 클릭하여 POST로 요청했을 때는 use() 메소드로 설정한 함수가 호출되면서 필요한 작업을 수행한다.




# 05-4 요청 라우팅하기

### 라우터 미들웨어 사용하기
- 번거롭게 요청 url을 일일이 확인해야 하는 문제를 해결하기 위한 것이 라우팅 미들웨어 이다. ( 익스프레스에 미리 등록되어 있다.)

라우터 미들웨어를 사용하면 아래와 같은 메소드가 app객체에 추가된다.


메소드 이름 | 설명
-----:|:-----
get(path,callback)|GET 방식으로 특정 패스 요청이 발생했을 때 사용할 콜백 함수를 지정.
post(path,callback)|POST방식으로 특정 패스 요청이 발생했을 때 사용할 콜백 함수를 지정.
put(path,callback)|PUT방식으로 특정 패스 요청이 발생했을 때 사용할 콜백 함수를 지정.
delete(path,callback)|DELETE방식으로 특정 패스 요청이 발생헀을 때 사용할 콜백 함수를 지정.
all(path,callback)|모든 요청 방식을 처리하며, 특정 패스 요청이 발생했을 때 사용할 콜백 함수를 지정.


클라이언트에서 특정 패스로 요청할 경우 GET방식으로 요청할 때는 익스프레스에서 get()메소드를 사용해 함수를 등록해야하며, POST방식으로 요청할 떄는 post()메소드를 사용해 등록해야 한다.

login.html을 복사하여 login2.html을 만든 후 <form>태그에 action속성을 추가해보자.

[login2.html]
```shell
...
	<form method="post" action"/process/login">
```

app7.js를 복사해 app8.js를 만든 후 use()메소드는 추가하지 않고, post()메소드를 호출하면 등록한 함수가 /process/login 요청 패스를 처리하도록 만들자.

[app8.js]
```shell
var express = require('express')
  , http = require('http')
  , path = require('path');

var bodyParser=require('body-parser');

var app = express();



app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended:true}));

app.post('/process/login',function(req,res){
    console.log('/process/login 처리함');

    var paramId =req.param('id');
    var paramPassword=req.param('password');

    res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>Param id : '+paramId+'</p></div>');
    res.write('<div><p>Param password : '+paramPassword+'</p></div>');
    res.write("<br><br><a href='/public/login2.html'>로그인 페이지로 돌아가기</a>");
    res.end();
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
```

로그인 페이지에서 [전송]버튼을 누르면 /process/login 패스로 요청하므로 post()메소드로 등록한 콜백 함수가 호출된다. 

클라이언트가 요청한 패스인 /process/login을 라우팅하는 과정은 다음과 같다. 
라우터 미들웨어를 등록하면 app객체에서get()또는 post() 메소드를 호출할 수 있으므로 먼저 app.post()메소드를 호출하여 요청 패스를 라우팅하도록 등록한다. 그다음 클라이언트에서 /process/login으로 요청이 들어오면 이 라우팅 정보에 따라 해당 콜백 함수가 실행된다.
콜백 함수에서는 로그인에 필요한 기능을 실행한 후 클라이언트로 응답을 보내 줄 수 있다.


### URL파라미터 사용하기

URL뒤에 ?기호를 붙이면 필요에 따라 요청 파라미터를 추가하여 보낼 수 있다. 이런 요청 파라미터는 서버에 데이터를 전달하기 위해 사용되는데, 요청 파라미터 대신URL파라미터를 사용할 수도 있다. URL파라미터는 요청 파라미터와 달리 URL주소의 일부로 들어간다. 

[app8_02.js]
```shell
var express = require('express')
  , http = require('http')
  , path = require('path');

var bodyParser=require('body-parser');

var app = express();



app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended:true}));

app.post('/process/login/:name',function(req,res){
    console.log('/process/login 처리함');

    var paraName = req.params.name;

    var paramId =req.param('id');
    var paramPassword=req.param('password');

    res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    rew.write('<div><p>Param name : ' + paramName + '</p></div>');
    res.write('<div><p>Param id : '+paramId+'</p></div>');
    res.write('<div><p>Param password : '+paramPassword+'</p></div>');
    res.write("<br><br><a href='/public/login2.html'>로그인 페이지로 돌아가기</a>");
    res.end();
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
```
첫번째 파라미터의 값이 /process/login 에서 /process/login/:name으로 변경되었다. 이는 /process/login/ 뒤에 오는 값을 파라미터로 처리하겠다는 의미입니다. 이렇게 지정한 파라미터는 req.params객체 안에 들어간다. 따라서 :name으로 표시된 부분에 넣어 전달된 값은 req.params.name 속성으로 접근할 수 있다.

이렇게 /process/login/:name 형태를 가진 URL을 처리하도록 변경했으므로 사용자가 웹 페이지에서 요청할 떄 사용하는 URL도 변경해야 한다.

[login3.html]
```shell
...
<form method="post" action="/process/login/mike">
...
```
action속성 값으로 /process/login/mike를 넣었으므로 mike라는 문자열이 URL파라미터로 전달 된다.
```shell
/process/ogin/mike
/process/login/:name
```
위의 mike와 :name이 서로 매칭되어 처리된다. 정상적으로 처리되는지 확인하기 위해 app8_02.js 파일을 실행 한 후 웹 브라우저에서 login3.html을 열어보자.



###오류 페이지 보여주기
