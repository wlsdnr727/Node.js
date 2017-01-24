# 주소 문자열과 요청 파라미터

> 웹 사이트에 접속하기 위한 사이트 주소 정보는 Node에서 URL 객체로 만들 수 있다.

> 예를 들어 구글에서 "nodejs" 에 관한 정보를 얻기 위해서 "nodejs" 라는 키워드를 가지고 검색을 하였을 때 다음과 같은 주소 문자열을 만들어 검색 요청을 하게 된다.

```shell
https://www.google.co.kr/search?q=url+%EB%AA%A8%EB%93%88&biw=1536&bih=735&source=lnms&sa=X&ved=0ahUKEwiy5L-gpdvRAhWGnJQKHeNQDOcQ_AUIBygA&dpr=1.25#q=nodejs
```

 

> 파라미터란 프로그램을 실행할 때 명령의 세부적인 동작을 구체적으로 지정하는 숫자는 문자를 의미한다.

> 위와 같이 만들어진 주소 문자열은 단순 문자열이므로 서버에서 이 정보를 받아 처리할 때에는 어디까지가 주소이고 요청 파라미터인지 구별할 필요가 있다.