# 02-1 노드 프로젝트만들기

### 노드 프로젝트 만들기

이클립스실행 - Perspective를 Node로 전환 - Node.js Project 생성(Temple to use를 Hello World로 설정) - hello-world-server.js 파일 Run as->1 Node Application 실행 - 콘솔창에 나오는 주소를 웹 브라우저에 입력(되도록 크롬 사용) 

Hello World가 출력된 화면이 보이는 이유?
: 프로젝트 안의 자바스크립트 파일이 실행되면서 웹 서버가 동작. 웹 서버가 웹 브라우저로부터 요청을 받아 처리한 결과를 응답으로 보내 준 후, 웹 브라우저가 화면에 표시. 정지후에는 사용 불가능. 

즉, 노드를 위해 만든 자바스크립트 파일을 실행하려면 node.exe 파일을 실행하면서 자바스크립트 파일의 이름을 전달해야 한다. 이클립스에서는 이를 Run As -> 1 Node Application 메뉴를 써서 보이고 있다.

이클립스에 설정된 노드 정보 확인?
: Window - Preferences - 왼쪽에 Nodeclipse 선택(앞장에서 설치한 이클립스의 Enide Studio 플러그인은 Nodeclipse로 표시됨. 이 플러그인은 노드를 이용해 프로그램을 좀 더 쉽게 만들수 있도록 노드 프로젝트를 자동으로 만들어 주고, node.exe파일을 사용해서 자바스크립트 파일을 실행시킬수 있음.
: Node.exe 파일을 실행 -> 노드 실행 환경이 갖춰짐 -> 자바사크립트 파일의 코드가 해석되어 실행 -> 결과가 콘솔창에 출력



# 02-2 콘솔에 로그 뿌리기

cmd창에서 자바스크립트 실행?
: 이클립스를 시작할 때 만들어진 workspace로 이동 후 (각자가 만든 프로젝트 이름)으로 이동.
```shell
cd workspace\(각자 만든 프로젝트 이름)
node hello-world-server.js
```
: 자바스크립트 파일을 실행할 때 node프로그램이 사용된다.

cmd에서 직접 코드를 입력해서 실행?
: 우선 ctrl + c 를 눌러 실행했던 프로그램을 종료.
: node 입력 후 enter 그 후 코드를 입력 하면 실행시킬수 있음.
```shell
console.log('결과는 %d입니다.',10);
```
*** console객체란? : 전역 객체(Global Object)이다.
*** node에서 사용가능한 대표적인 전역 객체
  	console : 콘솔 창에 결과를 보여주는 객체
	process : 프로세스의 실행에 대한 정보를 다루는 객체
	exports : 모듈을 다루는 객체
    
(EX-console)
```shell
console.log('숫자 보여주기 : %d',10);
console.log('문자열 보여주기 : %s','소녀시대');
console.log('JSON객체 보여주기 : %j',{name:'소녀시대'});
```
실행시 함께 출력되는 undefined는 호출한 log()함수에서 반환되는 값이 없을때 나타남. null과는 다른 의미.
undefined는 단순히 값이 존재하지 않는것, null은 의도적으로 값을 비운것.

*** JSON포맷란? : 자바스크립트의 객체 포맷으로 단말끼리 데이터를 주고받을 때 많이 사용. 자바스크립트에서 객체를 만들때 사용하는 형식과 같음. 즉 {}를 이용해 객체를 만들 수 있으며, 그 안에 Key와 Value로 구성된 속성들은 , 로 구분.

*** console 객체의 method
	dir(object) : 자바스크립트 객체의 속성들을 출력.
	time(id) : 실행 시간을 측정하기 위한 시작 시간을 기록.
	timeEnd(id) : 실행 시간을 측정하기 위한 끝 시간을 기록.
    
*** Function과 Method의 차이? 다르지 않다.



### 이클립스 프로젝트 안에 자바스크립트 파일을 만들고 실행

: Project 우클릭 - New - JavaScript Source File - File이름.js

(EX - console)
```shell
var result = 0;

console.time('duration_sum');

for(var i=1 ; i<=1000 ; i++){
	result += i;
}

console.timeEnd('duration_sum');
console.log('1부터 1000까지 더한 결과물 : %d',result);
```
코드 입력 후 ctrl + s 를 눌러 저장. 그 후 실행을 해보자. 결과가 정상적으로 나오는가? 한글이 깨져서 보일 것 이다. 이는 소스에 입력한 글자의 한글 인코딩과 노드에서 자바스크립트 코드를 실행하여 보여 줄 때의 한글 인코딩이 달라서 발생하는 문제이다.
해결방법? : Window - Preferences - General - Workspace - Text file encoding 항목에서 Other 체크 - TUF-8을 선택하여 인코딩 변경.

위의 코드에 새로운 내용을 추가 해 보자.
```shell
...
console.log('현재 실행한 파일의 이름 : %s',__filename);
console.log('현재 실행한 파일의 패스 : %s',__dirname);
```
여기서 사용한 __filename과 __dirname 변수는 전역 변수(Global Variable)이다.
	__filename : 실행한 파일의 이름을 출력. 파일의 전체 패스가 출력
	__dirname : 실행한 파일이 들어 있는 폴더를 출력. 폴더의 전체 패스가 출력
	
이번에는 dir() method를 이용해 객체 안에 있는 속성들을 확인 해 보자.
```shell
...
var Person = {name : "소녀시대", age : 20};
console.dir(Person);
```

즉 dir() method는 log() method와 함께 객체의 속성을 확인할 때 자주 사용.



# 02-3 프로세스 객체 살펴보기

process 객체란?
: 프로그램을 실행했을 때 만들어지는 프로세스 정보를 다루는 객체. 
	argv : 프로세스를 실행할 때 전달되는 파라미터(매개변수)의 정보
	env : 환경 변수 정보
	exit() : 프로세스를 끝내는 메소드

(EX - arvg)
```shell
console.log('argv 속성의 파라미터 수 : '+process.argv.length);
console.dir(process.argv);
```
첫번째 파라미터 : node.exe파일의 이름 / 두번째 파라미터 : 자바스크립트 파일의 패스

```shell
...
if(process.argv.length>2){
	console.log('세 번째 파라미터의 값 : %s',process.argv[2]);
}

process.argv.forEach(function(item,index){
	console.log(index + ' : ',item);
});
```

***forEach() : 속성에 들어 있는 모든 값을 하나씩 출력. 배열 안에 들어 있는 각 아이템 값과 인덱스를 함께 전달.


cmd창에 들어가 코드를 입력 해보자.
```shell
cd workspace\(프로젝트 이름)
node (파일 이름) --port 7001
```
위에서 만든 파일이 실행됨을 볼 수 있다.
