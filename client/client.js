var express = require('express'); // node의 express를 사용
var app = express(); // express를 app에 저장.

app.use(express.static('Project')); // teamproject라는 폴더 안에 파일 접근 허용

app.get('/', (req, res) => {
    res.redirect('html/MainHome/MainHome.html');
});

app.listen(3000, function () {
    // 3000port에 localhost를 연결
    console.log('Conneted 3000 port!'); // 연결이 되면 명령프롬프트에서 Conneted 3000 port!를 출력
});
