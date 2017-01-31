# 빠르게 웹서버 만들어보자!

node에는 기본적으로 http모듈이 내장되어있어 이를 사용하면 웹서버 객체를 만들수 있다.

http모듈로 로딩했을 때 반환되는 객체는 createServer()라는 메소드가 정의되어 있어 http 모듈로 객체를 만들고 객체.createServer() 메소드를 호출해 서버를 만드는 식.

[ch05_test1.js]
```shell
var http = require('http');
//객체를 만들고
var server = http.createServer();
//메소드를 호출하면 서버가 됨. 이를 var server로 저장해주자.

var port = 3000; 
server.listen(port,function(){
	console.log('웹 서버가 시작되었습니다.:%d', port);
}); 
```

이때 listen함수는 listen(port[,hostname][,backlog][,callback])으로 input을 받는 메소드로, 해당 port, hostname, backlog로 서버를 실행하여 대기시키는 함수이다.

이 때 port는 클라이언트에서 네트워크상의 특정 서버프로그램을 지정하는 논리적 접속장소를의미한다.(별 의미는 없고 내 hostname으로 이뤄진 서버중에 3000포트는 저 script이다 이정도로 알아두면 될듯)

보통 1~1023까지는 어떤 특권을 가진 서비스에 의해 사용될 수 있도록 예약된 포트로, http서비스에서는 대개 80번 포트가 지정된답니다. 

hostname은 그냥 말그대로 host단말기 즉, 서버의 network상 네임. IP. DNS를 통해 IP에서 naver등의 도메인으로 변경할 수 있다.

backlog는 서버로 연결시도를 하는 client중에 서버가 받지 못하는 client를 queue로 저장하는데 이 queue의 크기. 즉 서버에 접속 대기가능한 기기수


이더넷카드가 한 서버에 여러개가 있는경우 hostname을 지정해줘야한답니다.(IP가 여러개이니 충돌이 나나봅니다. 근데 그냥 1개일떄도 임의로 지정한 hostname으로 서버를 열 수 있어요..) 그 경우 6번째 줄부터 아래와 같이 수정하면 됨.

```shell
var port 300;
var host ='Hostname -> cmd창에서 ipconfig/all을 치면 IPv4 주소가 나오는데 그게 이거'
//i.e var host = '192.168.0.1';
server.listen(port,host,'5000',function(){
	console('웹서버가 시작되었습니다.: %s, %d',host,port);
});
```

여기에 접속하는 방법은 http://hostname:port번호/를 입력하면 된다. 근데 해봤자 지금은 아무반응 없음... 아무 데이터도 안보내고 아무 request도 안받기 때문이다.

그럼 먼저 이벤트 처리기를 만들어줍시다.

여기서나오는 이벤트는 3가지가 있다.
1. connection: 클라이언트가 접속하여 연결이 만들어지면 발생하는 이벤트
1. request: 클라이언트가 요청할 때 발생하는 이벤트
1. close: 클라이언트가 서버를 종료할 때 발생하는 이벤트

이 외에도 많다고 합니다. 이중 많이 사용되는게 connection과 request인데 이를 확인해보기 위해 ch05_test2.js를 만들어봅시다.

[ch05_test2.js]
```shell
var http = require('http');
var server = http.createServer();
var port = 3000;
server.listen(port,function(){
	console.log('웹서버가 시작되었습니다.: %d',port);
});

//event connection handler
server.on('connection',function(socket){
	var addr = socket.address();
	console.log('client is connected :%s,%d',addr.address,addr.port);
});

//event request handler
server.on('request',function(req,res){
	console.log('client requenst is comming');
	console.dir(req);
});

	//server close event handler
	
server.on('close',function(){
	console.log('server is closed');
});
```

node.js app으로 실행시키면 콘솔에 뭐라뭐라 막 뜸

이번엔 request 이벤트에대한 콜백함수를 약간 수정해서 들어가보자

```shell

var http = require('http');
var server = http.createServer();
var port = 3000;
server.listen(port,'127.0.0.1',function(){
	console.log('웹서버가 시작되었습니다.: %d',port);
});

//event connection handler
server.on('connection',function(socket){
	var addr = socket.address();
	console.log('client is connected :%s,%d',addr.address,addr.port);
});

//event request handler
server.on('request',function(req,res){
	console.log('client requenst is comming');
	res.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}); //header를 작성. 200은 status code (404처럼 상태에 대한 코드), 이후 내용은 header의 속성
	res.write("<!DOCTYPE html>"); //document의 type이 html
	res.write("<html>");
	res.write("	<head>");
	res.write("		<title>응답페이지</title>");
	res.write("	</head>");
	res.write("	<body>");
	res.write("		<h1>노드제이에스로부터 응답페이지</h1>");
	res.write("	<body>");
	res.write("</html>"); //여기까지는 html의 내용
	res.end(); //res에 쓰는게 끝난걸 알림.
	
});

	//server close event handler
	
server.on('close',function(){
	console.log('server is closed');
});
``` 
내용은 주석참고. 더이상은 나도 모름ㅋㅋㅋ

http://127.0.0.1:3000 을 접속했을 때 결과는 다음과 같다.

![접속시 사진](https://github.com/SKKUMathcom/Node.js/blob/master/image/ch05_1.PNG)

오른쪽 창은 크롬에서 개발자 도구를 연 화면(ctrl+shift+I)인데 보면 

```shell

	res.write("<!DOCTYPE html>"); //document의 type이 html
	res.write("<html>");
	res.write("	<head>");
	res.write("		<title>응답페이지</title>");
	res.write("	</head>");
	res.write("	<body>");
	res.write("		<h1>노드제이에스로부터 응답페이지</h1>");
	res.write("	<body>");
	res.write("</html>"); //여기까지는 html의 내용
```
이게 다  들어가있는걸 확인할 수있다.

즉 js도 웹페이지에서 사용자의 요청에 따라 html문서를 작성하여 사용자에게 보여주는 형식.

```shell
	res.write("	<head>");
	res.write("		<title>응답페이지</title>");
	res.write("	</head>");
``` 

이부분이 창의 이름. 그리고 외에부분은 페이지 내용.

각 메소드에 대해 살펴봅시다.

메소드 | 설명
-----:|:-----
writeHead(statusCode[,statusMessage][,headers]) | 응답으로 보낼 헤더를 만듦. statusCode는 아래 링크 참조
write(chunk,[,encoding][,callback]) | 응답 본문데이터를 만듦니다.
end([data][,encoding][,callback]) | 클라이언트로 응답을 전송. 파라미터에 data가 포함되면 data를포함하여 응답 전송. callback은 응답이 전송된 후 호출.

[위키피디아 HTTP 상태코드](https://ko.wikipedia.org/wiki/HTTP_%EC%83%81%ED%83%9C_%EC%BD%94%EB%93%9C)


request 이벤트 핸들러를 이용하지 않고, 서버를 생성하면서 바로 html을 작성할 수도 있음. 헷갈릴테니 본문 전체를 아래와 같이 수정합시다.

```shell

var http = require('http');
var server = http.createServer(function(req,res){
	
	console.log('client requenst is comming');
	res.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}); //header를 작성. 200은 status code (404처럼 상태에 대한 코드), 이후 내용은 header의 속성
	res.write("<!DOCTYPE html>"); //document의 type이 html
	res.write("<html>");
	res.write("	<head>");
	res.write("		<title>응답페이지</title>");
	res.write("	</head>");
	res.write("	<body>");
	res.write("		<h1>노드제이에스로부터 응답페이지</h1>");
	res.write("	<body>");
	res.write("</html>"); //여기까지는 html의 내용
	res.end(); //res에 쓰는게 끝난걸 알림.
	
});
var port = 3000;
server.listen(port,'127.0.0.1',function(){
	console.log('웹서버가 시작되었습니다.: %d',port);
});

//event connection handler
server.on('connection',function(socket){
	var addr = socket.address();
	console.log('client is connected :%s,%d',addr.address,addr.port);
});


	//server close event handler
	
server.on('close',function(){
	console.log('server is closed');
});

```
## 파일 입출력 in webpage
이젠 fs모듈로 파일을 읽어 웹페이지에 파일을 띄우는걸 해봅시다.

구글을 들어가서 적당한 이미지를 workspace내 우리 프로젝트 폴더안에 저장합시다.

[ch05_test5.js]
```shell
var http = require('http');
var fs = require('fs');

var server = http.createServer();
var port = 3000;
server.listen(port,function(){
	console.log('웹서버가 시작되었습니다.: %d',port);
});

//event request handler
server.on('request',function(req,res){
	console.log('client requenst is comming');
	
	var filename = '근영닌자.jpg'; //경로설정
	fs.readFile(filename,function(err,data){
		res.writeHead(200,{"Content-Type":"image/jpg"}); //이미지중 jpg형식이 data라는걸 알려줌.
		res.write(data); //data를 쓰자.
		res.end();
	})
});

	//server close event handler
	
server.on('close',function(){
	console.log('server is closed');
});
```

자세한건 주석 참고하시고 

앞서 코드에서 res.writeHead(200,{"Content-Type":"image/jpg"})라 선언했는데 Content-Type으로 설정한 imag/jpg등의 값을 MIME Type(Mulitpurpose Internet Mail Extensions) 라 한다. 

메세지의 형식이 어떤 형식인지 알려주는 인터넷 표준으로 이를 이용해 파일에 적합한 인코딩을 합니다.

Content-Type으로 선언될수있는 대표적인 MIME Type은 다음과 같아요.

Content Type값 | 설명
--------------:|:--------------------------------
text/plain | 일반 텍스트문서
text/html  | HTML문서
text/css   | css문서
text/xml   | xml문서
image/jpeg(=image/jpg) , image/png, image/bmp | 이미지파일들.
video/mpeg, audio/mp3 | MPEG 비디오파일, MP3 음악파일
application/zip | ZIP 압축파일

## 파일 스트림으로 읽어 응답보내기

간단하게 웹페이지내에서 파일만 주고받을 경우 이것보다는 두개의 스트림을 연결하는 pipe() 메소드를 이용하면 더 쉽게 구현할 수 있다.

pipe()메소드를 이용해 파일스트림객체와 응답객체를 연결하여보자

[ch05_test6.js]
```shell
var http = require('http');
var fs = require('fs');

var server = http.createServer();
var port = 3000;
server.listen(port,function(){
	console.log('웹서버가 시작되었습니다.: %d',port);
});

//event request handler
server.on('request',function(req,res){
	console.log('client requenst is comming');
	
	var filename = '근영닌자.jpg';
	var infile = fs.createReadStream(filename,{flags:'r'});
	
	//pipe 로 연결
	infile.pipe(res); //infile의 stream을 res의 input으로 전달
});

```
이렇게하면 이전과 같은 기능을 간단하게 구현할 수 있지만 헤더를 설정할 수 없는 등의 제약이 생기므로 선택적으로 잘 사용하여야한다.

## 버퍼를 이용해 일부분만 읽어 응답보내기

ch05_test6.js를 다음과 같이 수정해보자

[ch05_test6.js]

```shell
var http = require('http');
var fs = require('fs');

var server = http.createServer();
var port = 3000;
server.listen(port,function(){
	console.log('웹서버가 시작되었습니다.: %d',port);
});

//event request handler
server.on('request',function(req,res){
	console.log('클라이언트가 접속하였습니다.');
	
	var filename = '근영닌자.jpg';
	var infile = fs.createReadStream(filename,{flags:'r'});
	var filelength =0;
	var curlength = 0;
	fs.stat(filename,function(err,stats){ //파일의 존재유무를 확인하는 함수. 존재하지 않으면 err가 할당되고 존재하면 null로 초기화.
		filelength = stats.size; //stats 에는 파일의 메타데이터가 들어감.
	}); //근데 이건 실제로 안쓰는걸 추천한다고... fs.open()을 쓴뒤 이거 에러 핸들링하는걸 추천한답니다.
	res.writeHead(200, {"Content-Type": "image/jpeg"}); //header를 선언해주고.
	infile.on('readable',function(){ //readable이벤트를 호출(infile이 readable이면 실행하나보오)
		var chunk; //이놈은 버퍼입니다. 
		while(null!=(chunk=infile.read())){ //chunk에 infile.read()를 넣고 그게 null이 아닌경우 while문 돌림
			console.log('읽어들인 데이터 크기:%d 바이트',chunk.length);  
			curlength +=chunk.length; //buffer의 크기를 계속 더해주는거지.
			res.write(chunk,'utf8',function(err){ //chunk를  write해줌. encoding은 utf8로.
				console.log('파일 부분쓰기 완료:%d, 파일크기:%d',curlength, filelength);
				if(curlength>=filelength){
					res.end();
				};
			});
		};
	});
	
});

	//server close event handler
	
server.on('close',function(){
	console.log('server is closed');
});
```

자세한 설명은 주석 열심히 달았으니 주석 열심히 보자.

이런걸 어따 쓰냐면, 데이터를 조금씩 조금씩 보여주고 싶을때 씁니다.
