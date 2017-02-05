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
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var bodyParser = require('body-parser');

var app = express();

app.use(express.static(path.join(__dirname,'public')));
//app.use('/public',express.static(path.join(__dirname,'public')));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(function(req,res,next){
    console.log('첫 번째 미들웨어에서 요청을 처리함');
    
    var paramId = req.param('id');
    var paramPassword = req.param('password');

    var userAgent=req.header('User-Agent');
    var paramName=req.param('name');
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
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>로그인 테스트</title>
	</head>
<body>
	<h1>로그인</h1>
	<br>
	<form method="post" action="/process/login">
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

app7.js를 복사해 app8.js를 만든 후 use()메소드는 추가하지 않고, post()메소드를 호출하면 등록한 함수가 /process/login 요청 패스를 처리하도록 만들자.

[app8.js]
```shell

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var bodyParser = require('body-parser');

var app = express();

app.use(express.static(path.join(__dirname,'public')));
//app.use('/public',express.static(path.join(__dirname,'public')));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.post('/process/login',function(req,res){
    console.log('첫 번째 미들웨어에서 요청을 처리함');
    
    var paramId = req.param('id');
    var paramPassword = req.param('password');

    res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>Param id : '+paramId+'</p></div>');
    res.write('<div><p>Param password : '+paramPassword+'</p></div>');
    res.write("<br><br><a href='/public/login2.html'>로그인 페이지로 돌아가기</a>");
    res.end();

});

app.all('*',function(req,res){
	res.send(404,'<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>');
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
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var bodyParser = require('body-parser');

var app = express();

app.use(express.static(path.join(__dirname,'public')));
//app.use('/public',express.static(path.join(__dirname,'public')));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.post('/process/login/:name',function(req,res){
    console.log('첫 번째 미들웨어에서 요청을 처리함');
    
    var paramName = req.params.name;
    
    var paramId = req.param('id');
    var paramPassword = req.param('password');

    res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>Param name : ' + paramName + '</p></div>');
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
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>로그인 테스트</title>
	</head>
<body>
	<h1>로그인</h1>
	<br>
	<form method="post" action="/process/login/mike">
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
action속성 값으로 /process/login/mike를 넣었으므로 mike라는 문자열이 URL파라미터로 전달 된다.
```shell
/process/ogin/mike
/process/login/:name
```
위의 mike와 :name이 서로 매칭되어 처리된다. 정상적으로 처리되는지 확인하기 위해 app8_02.js 파일을 실행 한 후 웹 브라우저에서 login3.html을 열어보자.



###오류 페이지 보여주기

로그인을 위해 웹 브라우저에 주소를 입력할 때 주소가 입력되는 부분을 보면 /process/login 패스로 처리된 것을 알 수 있다. 이 패스는 웹 서버에서 라우터 미들웨어로 등록했기 때문에 등록된 콜백 함수에서 요청을 전달받아 처리할 수 있다. 따라서 웹 서버에 등록되지 않은 패스인 /login과 같은 패스를 웹 브라우저에 입력해 보면 문서를 찾을 수 없다는 디폴트 메세지가 나타난다. 이를 우리가 직접 만든 페이지로 바꾸려면 지정한 패스 이외의 모든 패스로 요처잉 들어왔을 때 오류 페이지가 보이도록 처리를 해 주어야 한다.

라우터 미들웨어는 특정 패스가 등록되어 있는지 순서대로 확인하여 처리한다. 따라서 위에서 추가한 post()메소드 아래쪽에 다음과 같이 all()메소드 호출 부분을 추가한다.

[app8.js]
```shell

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var bodyParser = require('body-parser');

var app = express();

app.use(express.static(path.join(__dirname,'public')));

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var bodyParser = require('body-parser');

var app = express();

app.use(express.static(path.join(__dirname,'public')));
//app.use('/public',express.static(path.join(__dirname,'public')));

//오류 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended:true}));

app.post('/process/login',function(req,res){
    console.log('첫 번째 미들웨어에서 요청을 처리함');
    
    var paramId = req.param('id');
    var paramPassword = req.param('password');

    res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>Param id : '+paramId+'</p></div>');
    res.write('<div><p>Param password : '+paramPassword+'</p></div>');
    res.write("<br><br><a href='/public/login2.html'>로그인 페이지로 돌아가기</a>");
    res.end();

});

//app.all('*',function(req,res){
//	res.send(404,'<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>');
//});

//모든 router 처리 끝난 후 404오류 페이지 처리
var errorHandler = expressErrorHandler({
    static:{
        '404':'./public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

```
다시 웹 프라우저에서 /login패스를 입력하면 서버에서 전송한 오류 페이지가 화면에 표시된다.



###express-error-handler 미들웨어로 오류 페이지 보내기

[app9.js]

```shell

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var bodyParser = require('body-parser');

var app = express();

app.use(express.static(path.join(__dirname,'public')));
//app.use('/public',express.static(path.join(__dirname,'public')));

//오류 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended:true}));

app.post('/process/login',function(req,res){
    console.log('첫 번째 미들웨어에서 요청을 처리함');
    
    var paramId = req.param('id');
    var paramPassword = req.param('password');

    res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>Param id : '+paramId+'</p></div>');
    res.write('<div><p>Param password : '+paramPassword+'</p></div>');
    res.write("<br><br><a href='/public/login2.html'>로그인 페이지로 돌아가기</a>");
    res.end();

});

//app.all('*',function(req,res){
//	res.send(404,'<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>');
//});

//모든 router 처리 끝난 후 404오류 페이지 처리
var errorHandler = expressErrorHandler({
    static:{
        '404':'./public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

```
express-error-handler 모듈은 특정 오류 코드에 따라 클라이언트로 응답을 보내 줄 때 미리 만들어 놓은 웹 문서를 보내 줄 수 있다. 이 모듈은 외장 모듈이므로 코드의 위쪽에서 먼저 require()메소드를 호출하여 모듈을 불러들인다. 오류 페이지는 모든 라우터 처리가 끝난 후 처리되어야 한다. 따라서 서버를 시작하기 위해 호출하는 코드 위쪽에 미들웨어로 추가한다. 오류페이지를 지정할 때는 미리 만들어 둔 파일의 위치를 지정할 수 있으므로 ./public/404.html로 지정한다.

이제 프로젝트 폴더 안에 있는 [public] 폴더 안에 404.html 파일을 만들고 그 안에 오류 표시를 위한 코드를 입력한다.

[/public/404.html]
```shell
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>오류 페이지</title>
    </head>
<body>
    <h3>ERROR - 페이지를 찾을 수 없습니다.</h3>
    <hr/>
    <p>/public/404.html 파일의 오류 페이지를 표시한 것입니다.</p>
</body>
</html>
```
express-error-handler 모듈을 설치하자.
```shell
%npm install express-error-handler --save
```
서버를 실행한 후 웹 브라우저에서 아무 주소나 입력하면 페이지를 찾을 수 없다는 메시지가 나타난다.

문서를 찾을 수 없다는 오류 페이지를 표시하기까지의 과정은 다음과 같다.
웹 브라우저에서 요청한 패스가 라우터에 등록한 함수 중에 없다면 404오류가 발생한다. 이 오류가 발생하면 미리 만들어 둔 404.html파일을 읽어 응답으로 보낸다.



###토큰과 함께 요청한 정보 처리하기


[app10.js]
```shell

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var bodyParser = require('body-parser');

var app = express();

app.use(express.static(path.join(__dirname,'public')));
//app.use('/public',express.static(path.join(__dirname,'public')));

//오류 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended:true}));

app.get('/process/users/:id',function(req,res){
	//토큰 정보를 가져옴
	    var paramId = req.params.id;

	    console.log('/process/users와 토큰%s를 사용해 처리함',paramId);

	    res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
	    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
	    res.write('<div><p>Param id : '+paramId+'</p></div>');
	    res.end();
	});

//app.all('*',function(req,res){
//	res.send(404,'<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>');
//});

//모든 router 처리 끝난 후 404오류 페이지 처리
var errorHandler = expressErrorHandler({
    static:{
        '404':'./public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

```
get()메소드를 호출하면서 동시에 /process/users/:id 패스를 처리하도록 코드를 입력했다. 여기에서 : 을 붙인 id값이 토큰이며, 일반적인 요청 파라미터처럼 파라미터 객체의 속성으로 확인할 수 있다. 따라서 req.param.id 코드를 사용하면 id속성에 접근할 수 있다.

이 파일을 실행하고 웹 브라우저에 주소를 입력한 후 조회하자.
```shell
http://localhost:3000/precess/users/2
```
이렇게 토큰을 사용하면 사용자 리스트 중에서 특정 사용자 정보를 id값으로 조회하기에 편리하다.




#05-5 쿠키와 세션 관리하기

- 사용자가 로그인한 상태인지 아닌지 확인하고 싶을 때에는 쿠키나 세션을 사용한다. 쿠키는 클라이언트 웹 브라우저에 저장되는 정보이며, 세션은 웹 서버에 저장되는 정보이다. 

###쿠키 처리하기

- 쿠키는 클라이언트 웹 브라우저에 저장되는 정보로서 일정 기간 동안 저장하고 싶을 때 사용한다. 익스프레스에서는 cookie-parser 미들웨어를 사용하면 쿠키를 설정하거나 확인할 수 있다. 다음과 같이 usr()메소드를 사용해 cookie-parser미들웨어를 사용하도록 만들면 요청 객체에 cookies속성이 추가된다.

[app11.js]
```shell

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var bodyParser = require('body-parser');

var app = express();

app.use(express.static(path.join(__dirname,'public')));
//app.use('/public',express.static(path.join(__dirname,'public')));

//오류 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.cookieParser());

//쿠키 정보를 확인함
app.get('/process/showCookie',function(req,res){
    console.log('/process/showCookie 호출됨');

    res.send(req.cookies);
});

//쿠키에 이름 정보를 설정함
app.get('/process/setUserCookie',function(req,res){
    console.log('/process/setUserCookie 호출됨.');

//쿠키 설정
    res.cookie('user',{
        id:'mike',
        name: '소녀시대',
        authorized: true
    });

//redirect로 응답
    res.redirect('/process/showCookie');
});

//app.all('*',function(req,res){
//	res.send(404,'<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>');
//});

//모든 router 처리 끝난 후 404오류 페이지 처리
var errorHandler = expressErrorHandler({
    static:{
        '404':'./public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

```
cookie-parser미들웨어를 사용하도록 설정한 후 라우팅 미들웨어의 get()메소드를 호출하여 /process/showCookie와 /process/setUserCookie패스를 처리하는 콜백 함수를 등록한다.
클라이언트의 쿠키 정보는 cookies 객체에 들어 있는데 사용자가 응답 문서를 조회할 때 쿠키 정보를 볼 수 있도록 /process/showCookie패스를 처리하는 함수에서 이 쿠키 객체를 응답으로 보낸다. 그러면 클라이언트에서는 쿠키 객체를 그대로 전달받게 된다.
/process/setUserCookie패스를 처리하는 함수에서의 응담 객체의; cookie()메소드로 user쿠키를 추가한다. 그러면 쿠키가 클라이언트 웹 브라우저에 설정되는데 마지막 코드 부분에서 redirect()메소드로 /process/showCookie패스를 다시 요청한다. 그러므로 그 정보는 그대로 다시 클라이언트의 웹 브라우저에 표시된다.
일반적으로는 쿠키를 설정하고 나면 그 정보는 다른 과정에 사용된다.

```shell
% npm install cookie-parser --save
```
[app11.js]를 실행한 후 웹 브라우저를 열고 /process/setUserCookie 패스로 요청하자.
서버에서 user라는 이름으로 설정한 쿠키 정보를 웹 브라우저 화면에 보여준다. 쿠키가 브라우저에 제대로 설정되었는지를 확인하기 위해 크롬 브라우저의 개발자 도구 화면을 띄우자. (설정 - 도구 더보기 - 개발자 도구) Resources탭을 클릭하면 브라우저에 저장된 리소스를 보여준다. Cookies항목을 클릭하면 현재 PC의 IP정보가 보이는데 그 IP정보를 클릭하면 오른쪽에 설정된 쿠키 정보가 표시된다. 쿠키를 저장하고 나면 이곳에서 'user'라는 이름으로 추가된 쿠키를 볼 수 있다.






###세션 처리하기

- 세션은 쿠키와 달리 서버 쪽에 저장이 된다. 대표적인 예로는 로그인을 했을 때 저장되는 세션이 있다.
사용자가 로그인하면 세션이 만들어지고 로그아웃하면 세션이 삭제되는 기능을 만들면 사용자가 로그인하기 전에는 접근이 제한된 페이지를 보지 못하도록 설정할 수 있다. 즉, 사용자가 상품 페이지처럼 접근이 제한된 페이지를 조회했을 때 로그인된 상태가 아니라면 로그인 페이지를 자도으로 열어 준다. 그러면 로그인을 해야 상품 페이지로 이동할 수 있으며 상품 페이지에서 로그아웃을 할 수 있다.

세션을 저장하는 방법을 알아보자. 익스프레스에서는 세션을 지원하기 위해 express-session 모듈을 사용한다.
```shell
% npm install express-session --save
```
코드에서는 require()메소드로 모듈을 불러들인다. 세션을 사용할 때는 쿠키도 같이 사용하므로 cookie-parser모듈도 함께 불러들인다.

[app12.js]
```shell

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var bodyParser = require('body-parser');
var app = express();
//오류 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

//app.use(express.static(path.join(__dirname,'public')));
app.use('/public',express.static(path.join(__dirname,'public')));


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));


app.get('/process/product',function(req,res){
    console.log('/process/product 호출됨');

    if(req.session.user){
        res.redirect('/public/product.html');
    }else{
        res.redirect('/public/login2.html');
    }
});

app.post('/process/login',function(req,res){
    console.log('/process/login호출됨.');

    var paramId = req.param('id');
    var paramPassword = req.param('password');

    if(req.session.user){
        //이미 로그인된 상태
        console.log('/public/product.html');
    }else{
        //세션 저장
        req.session.user = {
            id:paramId,
            name:'소녀시대',
            authorized:true
        };

        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
        res.write('<h1>로그인 성공</h1>');
        res.write('<div><p>Param id : '+paramId+'</p></div>');
        res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
        res.write("<br><br><a href='/process/product'>상품 페이지로 이동하기</a>");
        res.end();
    }
});

//user세션이 이미 있는 경우에는 /public/product.html페이지를 보여주고 
//그렇지 않으면 로그인을 시도한 후 user세션을 저장한다. 
//user객체를 세션으로 저장하고 싶다면 요청 객체 안에 있는 session객체의 속성으로 
//user객체를 넣어주면 된다. 
//user객체에는 id,name,authorized속성을 넣어 보았다. 
//user세션을 저장한 후에는 클라이언트로 응답을 보낸다. 
//로그인이 성공했음을 알리기 위해 클라이언트로 보낸 응답 코드를 보면
//가장 아래쪽에 상품 페이지로 이동할 수 있는 링크가 있다. 
//마지막으로 로그아웃을 처리할 수 있는 함수를 추가해보자.

app.get('/process/logout',function(req,res){
    console.log('/process/logout 호출됨.');

    if(req.session.user){
        //로그인된 상태
        console.log('로그아웃합니다.');

        req.session.destroy(function(err){
            if(err){throw err;}

                console.log('세션을 삭제하고 로그아웃되었습니다.');
                res.redirect('/public/login2.html');
        });
    }else{
        //로그인 안 된 상태
        console.log('아직 로그인되어 있지 않습니다.');
        res.redirect('/public/login2.html');
    }
});

//로그아웃 할 때는 session객체에 정의된 destroy()메소드를 호출하여 세션을 제거한다. 
//세션을 없앤 후에는 redirect()메소드로 /public

app.all('*',function(req,res){
	res.send(404,'<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>');
});

//모든 router 처리 끝난 후 404오류 페이지 처리
var errorHandler = expressErrorHandler({
    static:{
        '404':'./public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

```

[/public/product.html]
```shell
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>상품 페이지</title>
    </head>
<body>
    <h3>상품정보 페이지</h3>
    <hr/>
    <p>로그인 후 볼 수 있는 상품정보 페이지입니다.</p>
    <br><br>
    <a href='/process/logout'>로그아웃하기</a>
</body>
</html>
```

서버를 실행한 후 웹 브라우저를 열고 /process/product주소로 요청하면 처음에는 user세션 객체가 만들어져 있지 않으므로 로그인 페이지가 나타난다.
아이디와 비밀번호를 입력한 후 [전송]버튼을 누르면 서버에서 로그인 상태를 유지하기 위해 user세션을 저장한 후 로그인이 성공했다는 웹 문서를 보여준다.
화면 아래에 있는 '상품 페이지로 이동하기'링크를 누르면 상품 페이지가 표시된다.
상품 페이지 아래쪽에 있는 '로그아웃하기'링크를 클릭하면 user세션 객체를 삭제한 후 다시 로그인 화면으로 이동한다.

로그인 화면에서 로그인하여 세션이 만들어지면 connect.sid쿠키가 브라우저에 저장된다. connect.sid쿠키는 웹 브라우저에서 세션 정보를 저장할 때 만들어진 것이다. 브라우저마다 이름이 다를 수는 있지만 쿠키를 사용해 세션 정보를 저장하는 방식은 같다.



# 5-6 파일 업로드 기능 만들기

웹 서버는 기본적으로 서버에 저장된 문서를 조회하거나 데이터를 받아 저장할 수 있지만 파일 자체를 업로드하거나 다운로드하는 경우도 자주 이싿. 특히 모바일 단말로 찍은 사진을 업로드 하고 웹이나 모바일에서 사진을 다운로드하여 보는 일이 많아지면서 이미지 파일을 다루는 경우도 많다. 외장 모듈을 사용하면 익스프레스에서 파일을 업로드할 수 있다. 파일을 업로드 할 때는 멀티파트 포맷으로 된 파일 업로드 기능을 사용ㅎ아여 파일 업로드 상태 등을 확인할 수 있다.

- 멀티파트 포맷 : 웹 서버에서 파일을 업로드하기 위해 사용.

###multer 미들웨어 설치해서 파일 업로드 하기

```shell
% npm install multer --save
```

- 미들웨어를 사요하는 순서가 바뀌면 오류가 날 수 있다. 파일 업로듣 기능을 구현할 때 body-parser, multer, router 등의 미들웨어를 사용한다. 그런데 이때 사용 순서가 바뀌면 제대로 동작하지 않을 수 있다. 

[app13.js]
```shell

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var bodyParser = require('body-parser');
var app = express();
//오류 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var multer = require('multer');
var fs = require('fs');

//app.use(express.static(path.join(__dirname,'public')));
app.use('/public',express.static(path.join(__dirname,'public')));


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));

//multer 미들웨어 사용하기
app.use(multer({
    dest:'uploads',
    putSingleFilesInArray:true,
    limits:{
        files:10,
        fileSize:1024*1024
    },
    rename:function(fieldname,filename){
        return filename + Data.now();
    },
    onFileUploadStart:function(file){
        console.log('파일 업로드 시작:'+file.originalname);
    },
    onFileUploadComplete:function(file,req,res){
        console.log('파일 업로드 완료:'+file.fieldname+'->'+file.path);
    },
    onFileSizeLimit:function(file){
        console.log('파일 크기 제한 초과:%s',file.originalname);
    }
}));
//multer미들웨어를 사용하려면 app.use()메소드와 multer미들웨어 함수를 동시에 호출하여 반환된 객체를 파라미터로 넘겨주어야 한다. 이떄 multer함수를 호출하면서 파라미터로 전달하는 객체에는 속성이나 골백 함수를 설정할 수 있다. 
//사용자가 업로드한 사진 파일을 받아서 처리할 수 있도록 /process/photo패스를 라우팅하는 함수를 추가하자.

app.post('/process/photo',function(req,res){
    console.log('/process/photo 호출됨.');

    var files = req.files.photo;

    //현재의 파일 정보를 저장할 변수 선언
    var originalname='',
        name='',
        mimetype='',
        size=0;
    if(Array.isArray(files)){ //배열에 들어 있는 경우
        console.log("배열에 들어 있는 파일 개수:%d",files.length);
        for(var index=0;index<files.length;index++){
            originalname=files[index].originalname;
            name=files[index].name;
            mimetype=files[index].mimetype;
            size=files[index].size;
        }
    }else{ //배열에 들어가 있지 않은 경우(현재 설정에서는 해당 없음)
        console.log("파일 개수 : 1");

        originalname = files[index].originalname;
        name = files[index].name;
        mimetype = files[index].mimetype;
        size = files[index].size;
    }

    console.log('현재 파일 정보:'+originalname+','+name+','+mimetype+','+size);

    //클라이언트에 응답 전송
    res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
        res.write('<h3>파일 업로드 성공</h3>');
    res.write('<hr/>');
    res.write('<p>원본 파일 이름:'+originalname+'->저장 파일 이름:'+name+'</p>');
    res.write('<p>MIME TYPE:'+mimetype+'</p>');
    res.write('<p>파일 크기:'+size+'</p>');
    res.end();
});
//파일을 업로드 했을 때 업로드한 파일의 정보는 배열 객체로 저장된다. 
//for문으로 배열 객체의 요소들인 파일 이름이나 크기를 하나씩 확인한다.
//orginalname속성은 클라이언트에서 보낼 때으 ㅣ원본 파일 이름이며, name은 서버에 저장될 파일 이름이다.
//업로드된 파일이 어떤 MIME TYPE으로 전달된 것인지 mimetype속성으로 확인할 수 있으며, 파일 크기는 size속성으로 확인할 수 있다.
//서버를 열어 실행한 후 웹 브라우저를 열어 주소를 쳐보자. /public/photo.html


app.get('/process/product',function(req,res){
    console.log('/process/product 호출됨');

    if(req.session.user){
        res.redirect('/public/product.html');
    }else{
        res.redirect('/public/login2.html');
    }
});

app.post('/process/login',function(req,res){
    console.log('/process/login호출됨.');

    var paramId = req.param('id');
    var paramPassword = req.param('password');

    if(req.session.user){
        //이미 로그인된 상태
        console.log('/public/product.html');
    }else{
        //세션 저장
        req.session.user = {
            id:paramId,
            name:'소녀시대',
            authorized:true
        };

        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
        res.write('<h1>로그인 성공</h1>');
        res.write('<div><p>Param id : '+paramId+'</p></div>');
        res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
        res.write("<br><br><a href='/process/product'>상품 페이지로 이동하기</a>");
        res.end();
    }
});

//user세션이 이미 있는 경우에는 /public/product.html페이지를 보여주고 
//그렇지 않으면 로그인을 시도한 후 user세션을 저장한다. 
//user객체를 세션으로 저장하고 싶다면 요청 객체 안에 있는 session객체의 속성으로 
//user객체를 넣어주면 된다. 
//user객체에는 id,name,authorized속성을 넣어 보았다. 
//user세션을 저장한 후에는 클라이언트로 응답을 보낸다. 
//로그인이 성공했음을 알리기 위해 클라이언트로 보낸 응답 코드를 보면
//가장 아래쪽에 상품 페이지로 이동할 수 있는 링크가 있다. 
//마지막으로 로그아웃을 처리할 수 있는 함수를 추가해보자.

app.get('/process/logout',function(req,res){
    console.log('/process/logout 호출됨.');

    if(req.session.user){
        //로그인된 상태
        console.log('로그아웃합니다.');

        req.session.destroy(function(err){
            if(err){throw err;}

                console.log('세션을 삭제하고 로그아웃되었습니다.');
                res.redirect('/public/login2.html');
        });
    }else{
        //로그인 안 된 상태
        console.log('아직 로그인되어 있지 않습니다.');
        res.redirect('/public/login2.html');
    }
});

//로그아웃 할 때는 session객체에 정의된 destroy()메소드를 호출하여 세션을 제거한다. 
//세션을 없앤 후에는 redirect()메소드로 /public

app.all('*',function(req,res){
	res.send(404,'<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>');
});

//모든 router 처리 끝난 후 404오류 페이지 처리
var errorHandler = expressErrorHandler({
    static:{
        '404':'./public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

```
속성/메소드 이름|설명
-----:|:-----
dest|업로드한 파일들이 저장될 폴더를 지정
putSingleFilesInArray|응답 객체의 files속성에 업로드한 파일 정보를 클라이언트 요청 이름으로 넣을 때, 파일이 한 개라도 배열 형태로 넣을 것인지를 지정한다.
limits|파일 크기나 파일 개수 등의 제한 속성을 설정하는 객체입니다.
rename(fieldname,filename,req,res)|업로드한 파일의 이름을 바꾼다.
onFileUploadStart(file,req,res)|파일 업로드가 시작될 때 호출된다.
onFileUploadComplete(file,req,res)|파일 업로드가 완료됐을때 호출된다.
onFileSizeLimit(file)|limits객체에 설정한 제한을 넘어섰을 때 호출된다.

자세한 설명은 교제 192~193p를 참고하자.


###클라이언트의 요청 처리 함수 추가하기

multer미들웨어를 사용할 수 있으면 클라이언트의 요청을 처리할 함수를 추가할 수 있다. 서버쪽에서 처리할 함수를 추가하기 전에 먼저 사용자가 띄워 볼 웹 문서를 만들자.
[/public/photo.html]
```shell
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>파일 업로드 테스트>/title>
    </head>
<body>
    <h1>파일 업로드</h1>
    <br>
    <form method="post"enctype="multipart/form-data"action="/process/photo">
        <table>
            <tr>
                <td><label>파일</label></td>
                <td><input type="file"name=photo"></td>
            </tr>
        </table>
        <input type="submit"value="업로드"name="submit">
    </form>
</body>
</html>
```
<form> 태그 안에 들어가는 <input>태그의 type속성 값으로 file을 입력하면 파일을 선택하여 멀티파트 포맷으로 서버에 업로드를 요청할 수 있다. <form>태그의 method속성 값은post로 설정하고 enctype 속성 값을 multipart/form-data로 설정한다. 요청할 RUL정보인 /process/photh는 action속성의 값으로 넣어준다.

파일을 업로드 하면 서버의 콘솔창에 업로드 했을 때의 과정과 함께 업로드한 파일이 서버의 [uploads]폴더에 어떤 이름으로 저장되었는지 알 수 있는 로그가 출력된다.

웹 브라우저에서 이미지 파일을 선택하고 [업로드]버튼을 누럴 웹 서버로 요청하면 업로드 기능을 담당하는 multer미들웨어를 거쳐 라우팅 함수 쪽으로 전단될다. 이 함수에서는 파일 이름을 변경하여 [uploads]폴더에 저장된다. 이 과정에서 확인된 정보는 응답으로 보내지므로 웹 브라우저에서 조회하는 응답 웹 문서에서 업로드 결과를 볼 수 있다.
