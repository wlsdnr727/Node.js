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

