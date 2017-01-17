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

*** forEach() : 속성에 들어 있는 모든 값을 하나씩 출력. 배열 안에 들어 있는 각 아이템 값과 인덱스를 함께 전달.


cmd창에 들어가 코드를 입력 해보자.
```shell
cd workspace\(프로젝트 이름)
node (파일 이름) --port 7001
```
위에서 만든 파일이 실행됨을 볼 수 있다.

(EX - env)
JAVA_HOME 환경 변수가 시스템에 설정되어 있어야 한다.
: 컴퓨터 우클릭 - 속성 - 고급 시스템 설정 - 환경 변수 - 시스템 변수 부분 새로 만들기 - 환경 변수 이름에 JAVA_HOME 입력, 값으로는 자바가 설치된 폴더의 패스를 입력
```shell
console.dir(process.env);

console.log('JAVA_HOME 환경 변수의 값 : '+process.env[JAVA_HOME]);
```
오류발생! : process.env 속성에는 사용자 정의 환경 변수(user variables)만 들어 있기 때문. 이것만으로는 JAVA_HOME같은 시스템 환경 변수(system variables)에 접근할 수 없다.
*** user variables : 현재 사용자 계정에만 적용되는 값 / system variables : 모든 사용자 계정에 적용되는 값.



# 02-4 노드에서 모듈 사용

하나의 함수안에 모든 기능을 넣는 것보다 기능별로 여러 개의 함수로 나눈 후 필요한 함수만 가져다 사용하는것이 훨씬 효율적이다.  메인 파일의 코드 중에서 독립적인 기능은 별도 파일로 분리할 수 있으며, 메인 파일에서는 전체적인 실행 순서나 흐름만을 제어 한다. 이렇게 문리된 파일을 노드에서는 모듈 이라고 부른다.

각각의 기능을 분리시킬 때는 별도의 파일에 코드를 나누어 녾는다고 끝이 아니다. 분리 되어 있는 모듈 파일을 불러와서 사용할 수 있는 방법도 함께 만들어주어야 한다. 노드는 CommonJs의 표준 스펙을 따라 모듈을 사용할 수 있게 한다. 이 과정에서 exports 전역 객체를 사용한다.

모듈을 만들 때는 별도의 자바스크립트 파일을 만든 후 그 코드에서 exports 객체를 사용. exports 객체의 속성으로 변수나 함수를 지정하면 그 속성을 메인 자바스크립트 파일에서 불러와 사용할 수 있다.

이때 사용하는 메소드는 require() 이다. 이를 사용하면 모듈로 만들어 둔 파일의 이름을 이 메소드의 파라미터로 전달한다. require() 메소드를 호출하면 모듈 객체가 반환되는데, 모듈에서 exports 객체에 설정한 속성들은 이 모듈 객체를 통해 접근할 수 있다.

주의할 점은 exports 외에 module.exports를 사용할 수도 있는데. 이 둘의 차이는 expots는 속성을 추가할 수 있어 여러 개의 변수나 함수를 각각의 속성으로 추가할 수 있다. 이에 반해 module.exports에는 하나의 변수나 함수 또는 객체를 직접 할당.


### 더하기 함수를 모듈로 분리

```shell
var calc = {};
calc.add = function(a,b){
	return a+b;
}

console.log('모듈로 분리하기 전 - calc.add함수 호출 결과 : %d',calc.add(10,10));
```
이 코드중에 더하기 함수를 속성으로 추가했던 calc객체를 별도의 파일로 분리하면 모듈 파일이 만들어진다. 새로운 파일(calc.js)을 추가한 후 코드를 입력해 보자.
```shell
exports.add=function(a,.b){
	return a+b;
}
```
이렇게 하면 더하기 함수는 exports 객체에 add속성이 추가된다. 모듈 파일을 불러들여 사용하는 파일을 만들어 보자.
```shell
var calc = require('/calc');
console.log('모듈로 분리한 후 - calc.add함수 호출 결과 : %d',calc.add(10,10));
```
이렇게 만든 파일은 Main File이 되며, calc.js 모듈 파일을 불러와서 사용한다. calc.js 파일을 모듈로 불러오기 위해 require()함수를 호출. (이름 앞에 ./을 붙인 것은 파일 이름은 상대 패스로 지정하기 때문)


### module.exports로 메인 파일에 더하기 함수 호출

```shell
var calc = {};

calc.add = function(a,b){
	return a+b;
}

module.exports = calc;
```
이 파일은 calc.js 파일처럼 exports의 속성으로 만들지 않고, calc객체를 만든 뒤 그 객체의 속성으로 더하기 함수를 할당, module.exports에 calc객체를 할당 했다. 
위의 파일에 아래 코드를 추가해보자.
```shell
...
var calc2 = require('./calc2');
console.log('모듈로 분리한 후 - calc2.add함수 호출 결과 : %d',calc2.add(10,10));
```
결과는 다르지 않다.


이제 앞에서 해결하지 못했던 JAVA_HOME 환경 변수 접근 문제를 모듈로 해결해 보자. 다른 사람이 시스템 환경 변수를 접근할 수 있는 모듈을 만들어 두었으니 그것을 불러와 실행하면 된다. 이와같이 다른 사람이 만들어 둔 모듈을 외장 모듈 이라고 한다.
시스템 환경 변수에 접근할 수 있는 모듈의 이름은 nconf 이며, 이 모듈은 설정과 관련된 유용한 기능 뿐 아니라 시스템 환경 변수를 접근하는 기능도 포함하고 있다. 
```shell
var nconf = require('nconf');
nconf.env();

console.log('JAVA_HOME 환경 변수의 값 : %s',nconf.get('JAVA_HOME'));
```
nconf가 모듈로 만들어져 있으니 require()함수를 호출하여 불러온다. 그러나 우리가 직접 만든 모듈이 아니라면 상대 패스가 아닌 모듈의 이름만 지정해서 불러온다. nconf모듈은 그 모듈 안에 정의한 env()함수를 호출하면 환경 변수에 대한 정보를 가져와서 속성으로 보관한다.
다른 사람이 만들어 둔 모듈은 npm 패키지를 사용하면 다운로드 하여 설치할수 있다.
*** npm(Node Package Manager) : 노드의 패키지를 사용할 수 있도록 설치 및 삭제 등을 지원하는 프로그램.

cmd에서 nconf 패키지를 설치 해 보자.
```shell
cd workspace\(프로젝트이름)
npm install nconf
node (파일이름)
```
JAVA_HOME 환경 변수의 값이 정상적으로 나온다면 제대로 설치가 된 것이다.
이 npm으로 설치한 외부 패키지는 폴더 안에 있는 node_modules 에 설치 된다. 
설치된 패키지는 설치된 위치에 따라서 적용되는 범위가 다르다. 모든 프로젝트에 적용하고 싶다면 node_modules 폴더를 프로젝트들의 상위 폴더인 workspace폴더로 옮기면 된다. 메인파일이 실행 될 때는 먼저 현제폴더에 node_modules 폴더가 있는지 확인 후 없다면 상위 폴더들을 순차적으로 확인 한다.
