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
				<td><lavel>아이디</lavel></td>
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
  , http = require('http')
  , path = reqrire('path');

var bodyParser = require('body-parser');

var app=express();

app.use(function(req,res,next){
	console.log('첫 번째 미들웨어에서 요청을 처리함.');

	var paramId = req.param('id');
	var paramPassword = req.param('passowrd');

	res.writeHead('200',('Content-Type':'text/html;charset=utf8');
	res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
	res.write('<div><p>Param id : ' + paramId + '</p></div>');
	res.end();
});

http.createServer(app).listen(3000,function(){
	console.log('Express서버가 3000번 포트에서 시작됨.');
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
