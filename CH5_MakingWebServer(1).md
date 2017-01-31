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
