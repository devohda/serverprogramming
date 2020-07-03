$(document).ready(function () {
    var restaurant = document.getElementById('restaurant');
    console.log(restaurant.children[1].children[0].children[0]);
    console.log(restaurant.children[1].children[0].children[1].children[0]);
    console.log(restaurant.children[1].children[0].children[1].children[1]);

    restaurant.children[1].children[0].children[0].style.backgroundImage =
        'url(https://search.pstatic.net/common/?autoRotate=true&quality=95&src=http%3A%2F%2Fldb.phinf.naver.net%2F20200618_95%2F1592444372334s0Q8n_PNG%2FUQiRrrx0gOnDEYDXvZLryj1e.png&type=f150_150)';
    restaurant.children[1].children[1].children[0].style.backgroundImage =
        'url(https://search.pstatic.net/common/?autoRotate=true&quality=95&src=http%3A%2F%2Fldb.phinf.naver.net%2F20190204_269%2F1549212634045uJAvX_PNG%2FZfpnq_GUADvxtxA8DK6xvfOK.png&type=f150_150)';
    restaurant.children[1].children[2].children[0].style.backgroundImage =
        'url(https://search.pstatic.net/common/?autoRotate=true&quality=95&src=http%3A%2F%2Fldb.phinf.naver.net%2F20200427_10%2F1587969016245CR50X_JPEG%2F_G0A0536.jpg&type=f150_150)';
    restaurant.children[1].children[3].children[0].style.backgroundImage =
        'url(https://search.pstatic.net/common/?autoRotate=true&quality=95&src=http%3A%2F%2Fldb.phinf.naver.net%2F20160217_196%2F1455703574607ss2iH_JPEG%2F176167593632346_5.jpeg&type=f150_150)';

    restaurant.children[1].children[0].children[1].children[0].textContent = '어글리스토브 신논현강남역점';
    restaurant.children[1].children[1].children[1].children[0].textContent = '어니언 성수';
    restaurant.children[1].children[2].children[1].children[0].textContent = '그랜드 워커힐 서울 더파빌리온';
    restaurant.children[1].children[3].children[1].children[0].textContent = '빌즈 광화문';

    restaurant.children[1].children[0].children[1].children[1].textContent =
        '강남 어글리스토브 브런치가 맛있는 파스타집 강남 어글리스토브 브런치가 맛있는 파스타집 강남 어글리스토브 브런치가 맛있는 파스타집 강남 어글리스토브 브런치가 맛있는 파스타집 강남 어글리스토브 브런치가 맛있는 파스타집';
    restaurant.children[1].children[1].children[1].children[1].textContent = '성수 어니언 팡도르가 맛있는 베이커리 카페';
    restaurant.children[1].children[2].children[1].children[1].textContent = '그랜드 워커힐 서울 더파빌리온';
    restaurant.children[1].children[3].children[1].children[1].textContent = '빌즈 광화문';
    /*
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            
            for (var i; i < 4; i = i + 1) {
                restaurant.children[1].children[i].children[0].style.backgoundImage = 'url(http://placehold.it/160x160)';
            }
        }
    };
    xmlhttp.open('GET', ' http://59.6.42.102:8080/api/rank/test?keyword=%EC%84%9C%EC%9A%B8%20%EC%B9%B4%ED%8E%98');
    xmlhttp.send();
    */
});
