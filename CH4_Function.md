# § 주소 문자열과 요청 파라미터

> 웹 사이트에 접속하기 위한 사이트 주소 정보는 Node에서 URL 객체로 만들 수 있다.

> 예를 들어 구글에서 "nodejs" 에 관한 정보를 얻기 위해서 "nodejs" 라는 키워드를 가지고 검색을 하였을 때 다음과 같은 주소 문자열을 만들어 검색 요청을 하게 된다.

```shell
https://www.google.co.kr/?gfe_rd=cr&ei=p4aHWPjhAZHM8geAnZHACw&gws_rd=ssl#q=nodejs
```

> 파라미터란 프로그램을 실행할 때 명령의 세부적인 동작을 구체적으로 지정하는 숫자는 문자를 의미한다.

> 위와 같이 만들어진 주소 문자열은 단순 문자열이므로 서버에서 이 정보를 받아 처리할 때에는 어디까지가 주소이고 요청 파라미터인지 구별할 필요가 있다.

> 어디까지가 URL 주소이고 어디까지가 값인지 판단하기 위해 ?로 구분하며, 개별값의 구분자로 &를 사용한다.

> Node 상에서는 url 모듈을 미리 만들어 두어 이와 같은 작업을 쉽게 할 수 있도록 한다.

> 즉, url 모듈을 사용하면 주소 문자열을 URL 객체로 만들거나 URL 객체에서 주소 문자열로 변환하는 일이 간편해진다.

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

> 이벤트란 한쪽에서 다른 쪽으로 어떤 일이 발생했음을 알려주는 것을 말한다.

> Node에서는 대부분 이벤트를 기반으로 하는 비동기 방식(Non-Blocking IO) 으로 일을 처리한다. → CH1 참조

> 이벤트를 전달한다는 것은 '지금 이쪽의 상태는 이렇다' 라는 정보를 다른 쪽으로 보내는 것을 의미한다.

> 다른 쪽에서 특정 이벤트를 받고 싶을 때 이벤트 리스너(Event Listener) 를 등록할 수 있다.

> 이벤트 리스너는 특정 이벤트가 전달되었을 때 그 이벤트를 처리할 수 있도록 만들어 둔 것을 의미한다.

> Node 상에는 이벤트를 쉽게 주고받을 수 있게 EventEmitter를 사용한다.

## 이벤트 보내고 받기
