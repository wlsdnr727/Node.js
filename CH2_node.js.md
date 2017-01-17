# 02-1 노드 프로젝트만들기

### 노드프로젝트만들기

이클립스실행 - Perspective를 Node로 전환 - Node.js Project 생성(Temple to use를 Hello World로 설정) - hello-world-server.js 파일 Run as->1 Node Application 실행 - 콘솔창에 나오는 주소를 웹 브라우저에 입력(되도록 크롬 사용) 

Hello World가 출력된 화면이 보이는 이유?
: 프로젝트 안의 자바스크립트 파일이 실행되면서 웹 서버가 동작. 웹 서버가 웹 브라우저로부터 요청을 받아 처리한 결과를 응답으로 보내 준 후, 웹 브라우저가 화면에 표시. 정지후에는 사용 불가능. 

즉, 노드를 위해 만든 자바스크립트 파일을 실행하려면 node.exe 파일을 실행하면서 자바스크립트 파일의 이름을 전달해야 한다. 이클립스에서는 이를 Run As -> 1 Node Application 메뉴를 써서 보이고 있다.

이클립스에 설정된 노드 정보 확인?
: Window - Preferences - 왼쪽에 Nodeclipse 선택(앞장에서 설치한 이클립스의 Enide Studio 플러그인은 Nodeclipse로 표시됨. 이 플러그인은 노드를 이용해 프로그램을 좀 더 쉽게 만들수 있도록 노드 프로젝트를 자동으로 만들어 주고, node.exe파일을 사용해서 자바스크립트 파일을 실행시킬수 있음.
: Node.exe 파일을 실행 -> 노드 실행 환경이 갖춰짐 -> 자바사크립트 파일의 코드가 해석되어 실행 -> 결과가 콘솔창에 출력



### 콘솔에 로그 뿌리기

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
