# § 주소 문자열과 요청 파라미터

> 웹 사이트에 접속하기 위한 사이트 주소 정보는 Node에서 URL 객체로 만들 수 있다.

> 예를 들어 구글에서 "nodejs" 에 관한 정보를 얻기 위해서 "nodejs" 라는 키워드를 가지고 검색을 하였을 때 다음과 같은 주소 문자열을 만들어 검색 요청을 하게 된다.

```shell
https://www.google.co.kr/?gfe_rd=cr&ei=p4aHWPjhAZHM8geAnZHACw&gws_rd=ssl#q=nodejs
```

> 파라미터란 프로그램을 실행할 때 명령의 세부적인 동작을 구체적으로 지정하는 숫자 또는 문자를 의미한다.

> 위와 같이 만들어진 주소 문자열은 단순 문자열이므로 서버에서 이 정보를 받아 처리할 때에는 어디까지가 주소이고 요청 파라미터인지 구별할 필요가 있다.

> 어디까지가 URL 주소이고 어디까지가 값인지 판단하기 위해 ?로 구분하며, 개별값의 구분자로 &를 사용한다.

> Node 상에서는 url 모듈을 미리 만들어 두어 이와 같은 작업을 쉽게 할 수 있도록 한다.

> 즉, url 모듈을 사용하면 주소 문자열을 URL 객체로 만들거나 URL 객체에서 주소 문자열로 변환하는 일이 간편해진다.

《참고》

> URL 표기 방식 중에 대표적으로 GET 방식과 POST 방식이 있다.

> GET 방식이란 URL(Uniform Resource Locator) 주소 뒤에 파라미터를 붙이는 형식이다.

> 파라미터가 잘못 입력되었거나 혹은 ID / Passwd 를 사용이 금지된 문자가 들어가게 만드는 경우에 잘못된 파라미터라고 뜨게 된다.

## 주소 문자열을 URL 객체로 변환

> url 모듈에서 쓰이는 주요 메소드는 다음과 같다.

> * parse() :  주소 문자열을 파싱하여 URL 객체로 변환

> * format() : URL 객체를 주소 문자로 변환

【CH04_test1.js】
```shell
// url 메소드를 require()를 이용하여 로딩한 후 parse()와 format() 메소드 호출
var url = require('url');

// parse 메소드를 이용하여 URL 객체로 변환

var curURL = url.parse('https://search.naver.com/search.naver?where=nexearch&query=nodejs&sm=top_hty&fbm=0&ie=utf8');

// format 메소드를 이용하여 문자열로 변환

var curStr = url.format(curURL);

console.log('주소 문자열 : %s', curStr);
console.dir(curURL);
```

## 요청 파라미터 확인하기

> URL 객체의 속성에는 주소 문자열의 여러 가지 정보가 포함되어 있다. 

> 그 중에서 Query(데이터베이스에 정보를 요청하는 것) 속성은 요청 파라미터 정보를 포함하고 있는데 이는 여러 개의 개별 파라미터의 합으로 구성된다.

> 위에서 언급했듯이 개별 파라미터를 구분할 때 &로 구분하며, Node에서는 querystring 모듈을 사용하여 쉽게 분리할 수 있다.

> ＊ URL : Protocol Identifier + Resource Name (Host Name, File Name, Port Number, Reference)

【CH04_test1.js (cont'd)】
```shell
...
// 요청 파라미터 구분하기

var querystring = require('querystring');
var param = querystring.parse(curURL.query);

console.log('요청 파라미터 중 query의 값 : %s', param.query);
console.log('원본 요청 파라미터 : %s', querystring.stringify(param));
```

> * parse() : 요청 파라미터 문자열을 파싱하여 요청 파라미터 객체로 변환

> * stringify() : 요청 파라미터 객체를 문자열로 변환

> Q. https://www.google.co.kr/?gfe_rd=cr&ei=p4aHWPjhAZHM8geAnZHACw&gws_rd=ssl#q=nodejs 문자열을 이용하였을 때에는 query의 값이 "undefined"로 나오게 된다. 왜 그럴까?

# § 이벤트란?

![Event Loop](https://github.com/SKKUMathcom/Node.js/blob/master/image/syhan_140320_node1_041.png)

> 이벤트란 한쪽에서 다른 쪽으로 어떤 일이 발생했음을 알려주는 것을 말한다.

> 다시 짚고 넘어가자면 Node에서는 대부분 이벤트를 기반으로 하는 비동기 방식(Non-Blocking IO) 으로 일을 처리한다.

> ☞ CH1 참고할 것!

> 클라이언트의 요청을 비동기로 처리하기 위하여 이벤트가 발생하며 서버 내부에 메시지 형태로 전달된다. 

> 서버 내부에서는 이 메시지를 Event Loop가 처리한다. Event Loop가 처리하는 동안 제어권은 다음 요청으로 넘어가고 처리가 완료되면 Callback을 호출하여 처리완료를 호출 측에 알려주는 방식이다.

> 이벤트를 전달한다는 것은 '지금 이쪽의 상태는 이렇다' 라는 정보를 다른 쪽으로 보내는 것을 의미한다.

> 다른 쪽에서 특정 이벤트를 받고 싶을 때 이벤트 리스너(Event Listener) 를 등록할 수 있다.

> 이벤트 리스너는 특정 이벤트가 전달되었을 때 그 이벤트를 처리할 수 있도록 만들어 둔 것을 의미한다.

> Node 상에는 이벤트를 쉽게 주고받을 수 있게 EventEmitter(이벤트를 발생시키는 모든 객체를 지칭) 를 사용한다.

## 이벤트 보내고 받기

> Node의 객체는 EventEmitter를 상속받을 수 있으며 그 후 EventEmitter 객체의 on()과 emit() 메소드를 사용할 수 있다.

> 또한 once() 메소드를 사용하여 특정 이벤트 실행 후 자동으로 리스너가 제거되도록 설정할 수도 있다.

> * on(event, listener) : 지정한 이벤트의 리스너를 추가

> * once(event, listener) : 지정한 이벤트의 리스너를 추가하지만 한 번 실행한 후에는 자동으로 리스너가 제거

> * removeListener(event, listener) : 지정한 이벤트에 대한 리스너를 제거

【CH04_test2.js】
```shell

// process 객체를 이용하여 EventEmitter를 상속받음

process.on('exit', function() {
	console.log('exit 이벤트 발생');
});

setTimeout(function() {
	console.log('2초 후 시스템 종료 시도함');
	
	process.exit();
	
}, 2000);
```

> 그렇다면 우리가 직접 만든 이벤트는 어떻게 처리할 수 있을까?

【CH04_test3.js】
```shell
process.on('tick', function(count){
	console.log('tick 이벤트 발생  : %s', count);
});

setTimeout(function() {
	console.log('2초 뒤에 tick 이벤트 전달 시도함');
	
	process.emit('tick', '2');
	
}, 2000);
```

> 위 코드에서는 setTimeout() 메소드를 이용하여 process.emit() 메소드 호출 후 tick 이벤트를 process 객체로 전달하였다. process.on() 메소드를 호출하여 이벤트를 등록하면 tick 이벤트가 발생하였을 때 Callback 함수가 실행된다.

## 계산기 객체를 모듈로 만들어보기

【calc3.js】
```shell
var util = require('util');
var EventEmitter = require('events').EventEmitter;

var Calc = function() {
	var self = this;
	
	this.on('stop', function() {
		console.log('Calc에 stop event 전달됨');
	});
};

util.inherits(Calc, EventEmitter);

Calc.prototype.add = function(a, b) {
	return a + b;
};

module.exports = Calc;
module.exports.title = 'calculator';
```

> Calc 객체는 계산기 객체로서 function 키워드를 사용해 프로토타입 객체로 만든다.

> 그 후 Calc 객체가 이벤트 처리를 할 수 있도록 EventEmitter를 상속하게 만든다. util 모듈의 inherits() 메소드를 사용하면 쉽게 상속을 정의할 수 있다.

【CH04_test4.js】
```shell
var Calc = require('./calc3');

var calc = new Calc();

calc.emit('stop');

console.log(Calc.title + '에 stop 이벤트 전달함');
```

> Calc 객체는 프로토타입 객체로 계산기 기능을 정의만 한 것이므로 new 연산자를 이용하여 인스턴스 객체를 만든다.

> 그 후 emit() 메소드를 호출하여 stop 이벤트를 전달한다.

# § 파일 다루기

> 앞서 우리는 Blocking I/O와 Non-Blocking I/O의 차이점에 대해서 배운 적이 있다.

> Node의 파일 시스템은 파일을 다루는 기능과 디렉터리를 다루는 기능으로 구성되어 있으며, Blocking I/O와 Non-Blocking I/O 기능을 함께 제공한다.

> Blocking I/O와 Non-Blocking I/O를 구분하기 위해 Blocking I/O 메소드는 Sync라는 단어를 붙인다.

## 파일 읽기 / 쓰기

【CH04_test5.js】
```shell
var fs = require('fs');

// Reading a file as Blocking I/O

var data = fs.readFileSync('./README.md', 'utf8');

// Data Output

console.log(data);
```

> 파일 시스템에 접근하기 위해 fs 모듈을 사용한다.

> 위 코드는 Blocking I/O 로 실행이 되었기 때문에 consloe.log() 부분은 파일을 다 읽을 때까지 실행되지 않는다.

【CH04_test6.js】
```shell
var fs = require('fs');

// Reading a file as Non-Blocking I/O

fs.readFile('./README.md', 'utf8', function(err, data) {
	
	// Data Output
	console.log(data);
});

console.log('프로젝트 폴더 안의 README.md 파일을 읽도록 요청했습니다.');
```

> readFile() 메소드를 실행하면서 세 번째 파라미터로 전달된 function은 파일을 읽어 들이는 작업이 끝났을 때 호출된다.

> 이 때 function의 파라미터 err, data를 전달받아 오류가 발생했는지 아닌지를 확인할 수 있다.

> 오류가 발생하였을 때 err에 오류 데이터가 들어가고 그렇지 않았을 때에는 null이 된다.

> 즉, 일반적으로 err의 값이 null인지 아닌지 체크하는 코드를 사용한 후 문제가 없으면 파일 읽기가 성공한 것으로 처리한다.

> 다음은 파일을 읽고 쓸 때 사용하는 대표적인 메소드이다.

> * readFile(filename, [encoding], [callback]) : Non-Blocking I/O 로 파일을 읽음

> * writeFile(filename, data, encoding='utf8', [callback]) : Non-Blocking I/O 로 파일을 씀

> * readFileSync(filename, [encoding]) : Blocking I/O 로 파일을 읽음

> * writeFileSync(filename, data, encoding='utf8') : Blocking I/O 로 파일을 씀

【CH04_test7.js】
```shell
var fs = require('fs');

fs.writeFile('./output.txt', 'Hello World!', function(err) {
	if(err) {
		console.log('Error : ' + err);
	}
	
	console.log('output.txt 파일에 데이터 쓰기 완료!');
	
});
```

> 파일을 실행했을 때 프로젝트 폴더 안에 output.txt 파일이 만들어지고 그 안에 'Hello World!' 가 쓰여있는 것을 확인할 수 있다.

## 파일을 직접 열고 닫으면서 읽거나 쓰기

> * open(path, flags [, mode] [, callback]) : 파일 열기
> * read(fd, buffer, offset, length, position [, callback]) : 지정한 부분의 파일 내용을 읽어들임
> * write(fd, buffer, offset, length, position [, callback]) : 지정한 부분에 데이터를 씀
> * close(fd [, callback]) : 파일 닫기

【CH04_test8.js】
```shell
var fs = require('fs');

fs.open('./output.txt', 'w', function(err, fd) {
	// throw 구문을 이용하여 강제로 예외를 발생시킴	
	if(err) throw err;
	
	var buf = new Buffer('안녕!\n');
	fs.write(fd, buf, 0, buf.length, null, function(err, written, buffer) {
		if(err) throw err;
		
			console.log(err, written, buffer);
		
		fs.close(fd, function() {
			console.log('파일 열고 데이터 쓰고 파일 닫기 완료!');
		});
	});
});
```

> 함수 호출 순서 : open → write → close

> open() 메소드 간 세 개의 파라미터가 사용되었는데 첫 번째는 파일의 이름, 두 번째는 파일을 읽거나 쓰기 위한 플래그이다.

> 다음은 대표적인 플래그이다.

> * 'r' : 읽기에 사용하는 플래그. 파일이 없으면 예외 발생

> * 'w' : 쓰기에 사용하는 플래그. 파일이 없으면 만들어지고 파일이 있으면 이전 내용을 모두 삭제함

> * 'w+' : 읽기와 쓰기에 사용하는 플래그. 파일이 없으면 만들어지고 파일이 있으면 이전 내용을 모두 삭제함

> * 'a+' : 읽기와 추가에 사용하는 플래그. 파일이 없으면 만들어지고 있으면 이전 내용에 새로운 내용 추가

【CH04_test9.js】
```shell
var fs = require('fs');

fs.open('./output.txt', 'r', function(err, fd) {
	if(err) throw err;
	
	var buf = new Buffer(10);
	console.log('버퍼 타입 : %s', Buffer.isBuffer(buf));
	
	fs.read(fd, buf, 0, buf.length, null, function(err, bytesRead, buffer) {
		if(err) throw err;
		
		var inStr = buffer.toString('utf8', 0, bytesRead);
		console.log('파일에서 읽은 데이터 : %s', inStr);
		
		console.log(err, bytesRead, buffer);
		
		fs.close(fd, function() {
			console.log('output.txt 파일을 열고 읽기 완료!');
		});
	});
});
```

> Buffer(읽고 쓰기가 가능한 메모리 배열) 객체는 바이너리 데이터를 읽고 쓰는 데 사용한다.

## Buffer 객체 사용 방법

【CH04_test10.js】
```shell
var output = '안녕 1!';
var buffer1 = new Buffer(10);
var len = buffer1.write(output, 'utf8');
console.log('첫 번째 버퍼의 문자열 : %s', buffer1.toString());

var buffer2 = new Buffer('안녕 2!', 'utf8');
console.log('두 번째 버퍼의 문자열 : %s', buffer2.toString());

console.log('버퍼 객체의 타입 : %s', Buffer.isBuffer(buffer1));

var byteLen = Buffer.byteLength(output);
var str1 = buffer1.toString('utf8', 0, byteLen);
var str2 = buffer2.toString('utf8');

// 첫 번째 버퍼 객체의 문자열을 두 번째 버퍼 객체로 복사
buffer1.copy(buffer2, 0, 0, len);
console.log('두 번째 버퍼에 복사한 후의 문자열 : %s', buffer2.toString('utf8'));

// 두 개의 버퍼를 붙임
var buffer3 = Buffer.concat([buffer1, buffer2]);
console.log('두 개의 버퍼를 붙인 후의 문자열 : %s', buffer3.toString('utf8'));
```

## 스트림 단위로 파일을 읽거나 쓰기

> 파일을 읽거나 쓸 때 데이터 단위가 아닌 스트림 단위로 처리할 수도 있다. 스트림은 시간이 지남에 따라 사용할 수 있게 되는 일련의 데이터 요소를 가리키는 수많은 방식에서 쓰인다. 즉, 다시 말해 데이터가 전달되는 통로와 같은 개념으로 생각하면 되겠다.

> * createReadStream(path[, options]) : 파일을 읽기 위한 스트림 객체를 만듦

> * createWriteStream(path[, options]) : 파일을 쓰기 위한 스트림 객체를 만듦

> 다음은 output.txt 파일의 내용을 읽은 후 output2.txt 파일로 쓰는 코드이다.

【CH04_test11.js】
```shell
var fs = require('fs');

var infile = fs.createReadStream('./output.txt', {flags : 'r'});
var outfile = fs.createWriteStream('./output2.txt', {flags : 'w'});

infile.on('data', function(data) {
	console.log('읽어 들인 데이터', data);
	outfile.write(data);
});

infile.on('end', function() {
	console.log('파일 읽기 종료');
	outfile.end(function() {
		console.log('파일 쓰기 종료');
	});
});
```

> 위 코드 실행 시 output2.txt 파일이 새로 생성되며, output.txt 파일의 내용이 똑같이 들어가게 된다.

> 위 코드는 pipe() 메소드를 사용하면 더 간편해진다. pipe() 메소드는 두 개의 스트림을 붙여 주는 역할을 한다. ReadStream 타입의 객체와 WriteStream 객체를 붙여주게 되면 스트림 간에 데이터를 알아서 전달하게 된다.

【CH04_test12.js】
```shell
var fs = require('fs');
var inname = './output.txt';
var outname = './output2.txt';

fs.exists(outname, function(exists) {
	if(exists) {
	// unlink() 메소드를 이용하여 이전 파일을 삭제		
	fs.unlink(outname, function(err) {
			if(err) throw err;
			console.log('기존 파일 [' + outname + '] 삭제함');
		});
	}
	
	var infile = fs.createReadStream(inname, {flags : 'r'});
	var outfile = fs.createWriteStream(outname, {flags : 'w'});
	
	infile.pipe(outfile);
	console.log('파일 복사 [' + inname + '] -> [' + outname + ']');
	
});
```

## http 모듈로 요청받은 파일 내용을 읽고 응답하기

> pipe() 메소드와 같이 스트림을 서로 연결하는 방법은 웹 서버를 만들고 사용자의 요청을 처리할 때 유용하다.

【CH04_test13.js】
```shell
var fs = require('fs');
var http = require('http');

var server = http.createServer(function(req, res) {
	// 파일을 읽어 응답 스트림과 pipe()로 연결!
	var instream = fs.createReadStream('./output.txt');
	instream.pipe(res);
});

server.listen(7001, '127.0.0.1');
```

> 웹 서버에서 클라이언트로부터 요청을 받으면 먼저 output.txt 파일에서 스트림을 만든 후 클라이언트로 데이터를 보낼 수 있는 스트림과 연결해 준다.

> 읽기 스트림과 쓰기 스트림의 연결이 가능한 이유는 파일에서 데이터를 읽기 위해 만든 것이 스트림 객체이고, 데이터를 쓰기 웹 서버에서 클라이언트 쪽에 만든 것 역시 스트림 객체이기 때문이다.

## fs 모듈로 새 디렉터리 만들고 삭제하기

【CH04_test14.js】
```shell
var fs = require('fs');
fs.mkdir('./docs', 0666, function(err) {
	if(err) throw err;
	console.log('새로운 docs 폴더를 만들었습니다.');
	
	fs.rmdir('./docs', function(err) {
		if(err) throw err;
		console.log('docs 폴더를 삭제했습니다.');
	});
});
```

《참고》

> 주석을 한꺼번에 간단히 처리하고 싶다?

> ☞ 주석하고 싶은 부분을 블록 지정한 후 Ctrl + / (주석 풀 때도 마찬가지)

# § 로그 파일 남기기

> console 객체의 log() 또는 error() 메소드 등을 호출하면 로그를 출력할 수 있다.

> 하지만 프로그램의 크기가 커질수록 로그의 양이 많아지기 때문에 단순히 출력하는 것만으로는 무리가 있다. 그렇다면 로그를 어떻게 남기고 보관할까?

> Node 상에서는 winston 모듈을 이용하여 로그를 남길 수 있다.

【CH04_test15.js】
```shell
// 로그 처리 모듈
var winston = require('winston');

// 로그 일별 처리 모듈
var winstonDaily = require('winston-daily-rotate-file');

// 시간 처리 모듈
var moment = require('moment');

function timeStampFormat() {
	return moment().format('YYYY-MM-DD HH:mm:ss.SSS ZZ');

};

var logger = new (winston.Logger)({
	transports: [
		new (winstonDaily)({
			name: 'info-file',
			filename: './log/server',
			datePattern: '_yyyy-MM-dd.log',
			colorize: false,
			maxsize: 50000000,
			maxFiles: 1000,
			level: 'info',
			showLevel: true,
			json: false,
			timestamp: timeStampFormat
		}),
		
		new (winston.transports.Console)({
			name: 'debug-console',
			colorize: true,
			level: 'debug',
			showLevel: true,
			json: false,
			timestamp : timeStampFormat
		})
	],
	exceptionHandlers: [
		new (winstonDaily)({
			name: 'exception-file',
			filename: './log/exception',
			datePattern: '_yyyy-MM-dd.log',
			colorize: false,
			maxsize: 50000000,
			maxFiles: 1000,
			level: 'error',
			showLevel: true,
			json: false,
			timestamp: timeStampFormat
		}),
		new (winston.transports.Console)({
			name: 'exception-console',
			colorize: true,
			level: 'debug',
			showLevel: true,
			json: false,
			timestamp: timeStampFormat
		})
	]
});
```

> 파일 실행 전 winston, winston-daily-rotate-file, 그리고 moment 모듈을 설치해야 한다.

```shell
% npm install winston --save
% npm install winston-daily-rotate-file --save
% npm install moment --save
```

> winston 모듈은 로그를 파일로 저장하면서 동시에 화면에 출력되도록 설정할 수 있다.

> 로그를 파일이나 화면에 출력하고 싶다면 logger 객체에 들어 있는 debug(), info(), error() 와 같은 메소드를 호출하면 된다.
