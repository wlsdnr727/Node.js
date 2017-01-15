# Node.js의 필요성

기존 웹서버에서는 파일을 업로드할 때, 파일 업로드 기능을 담당하는 핸들러가 생성되어 핸들러가 하나의 요청이 끝날 때 까지 다른 요청을 대기시키는 방식이었다.

즉, 업로드가완료되기 전까지 웹 서버에서 다른 작업은 할 수 없는 단점 발생. 또한 요청이 많을 경우 CPU나 메모리 사용량도 크게 증가. 

이와 같은 방식을 동기 입출력(Blocking IO)라고 한다.

## Blocking IO

프로그램이 파일시스템에 읽기를 요청하면, 파일시스템 내에 파일이 처리될 때 까지 프로그램이 대기하는 방식. 

이를 해결하기 위해 non-Blocking IO를 이용하여 개발됨.

## Non-Blocking IO

Blocking IO와 반대로 프로그램에서 파일시스템으로 읽기를 요청하면, 파일 시스템 내에 파일을 준비하고 처리한 뒤, Callback 함수를 이용해 프로그램을 파일 읽기를 요청한 시점으로 복귀시키는 방식

![Non_Blocking IO](https://github.com/SKKUMathcom/Node.js/blob/master/image/02udF.jpg)

이런 방식을 사용하면, 파일을 읽기 전까지 다른 행동을 할 수 있음. 

```shell

**Blocking IO**

var contents = file.read('a.txt');

### file.read 될때 까지 대기 ###

doShow(contents);

var result = doAdd(10,10);

```

```shell

**Non-Blocking IO **

file.read('a.txt',function(contents){
	doShow(contents);
});

var result = doAdd(10,10);

```

Blocking IO 방식에서는 file.read('a.txt'); 가 완료될 때 까지프로그램이 대기되고 다 끝나야 doShow();가 활성화되는데에 반해

Non-Blocking IO에서는 file.read()를 contents를 대입하고 이의 내용을 읽는 doShow함수까지 file.read('a.txt')함수 내의 파라미터로 전달된다. 따라서 다 보여주기도 전에 doAdd() 함수가 실행되어 result에 20이 저장된다.

자바스크립트가 Non-Blocking IO를 지원한다고 해서 무조건 빠른것은 아니다. 자바스크립트는 interprete language(line by line으로 실행되는 언어라고 단순하게 생각하자)이므로 실행속도가 느린데, 크롬의 V8자바스크립트 엔진이 개발되면서 해결되었다.

크롬 외에도 파이어폭스에서는 Spider Monkey, 사파리에서는 Squirrel Fish, 익스플로어에서는 Chakra 를 이용해서 자바스크립트를 동작이 더 빠른 언어로 변환하여 실행하여준다.


## Event Driven IO

프로그램에 영향을 주도록 사용자가 생성하는 동작, 일 등을 이벤트라고 한다. node.js는(실제로는 Java Script) 실시간으로 발생하는 이벤트를 감지하고 이 이벤트가 발생함에 따라 함수를 실행하도록 하는 이벤트 기반 입출력(Event Driven IO)을 지원한다.

javascript에서는 이벤트를 정의하고, on()이라는 메소드를 사용하여 이벤트와 함수를 바인딩(binding)하여 이벤트기반입출력을 구현한다.

