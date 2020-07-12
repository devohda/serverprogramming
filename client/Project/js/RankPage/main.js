$(document).ready(function () {
    var restaurant = document.getElementById('restaurant');
    var pub = document.getElementById('pub');
    var cafe = document.getElementById('cafe');
    var dessert = document.getElementById('dessert');
    var playing = document.getElementById('playing');
    var naverurl = `http://localhost:8080/api/rank/list?keyword=`;
    var korearankurl = `http://localhost:8080/api/rank/tour?city=&category=&order=`; //디폴트
    $.ajax({
        url: `${naverurl}음식점`,
        type: 'get',
        dataType: 'json',
    }).done((response) => {
        console.log('식당');
        //restaurant.children[1]는 음식점 카드 묶음
        for (var i = 0; i < 4; i = i + 1) {
            restaurant.children[1].children[i].children[0].style.backgroundImage = 'url(' + response.data[i].img + ')';
            //<div class="card-header" style="background-image: url(http://placehold.it/150x150);"></div>
            restaurant.children[1].children[i].children[1].children[0].children[0].append(response.data[i].title);
            //<h2 class="body-title"></h2>
            for (var j = 0; j < response.data[i].category.length; j++) {
                restaurant.children[1].children[i].children[1].children[0].children[1].innerHTML += response.data[i].category[j] + ' ';
                //<div class="body-category"></div>;
            }
            if (response.data[i].content == '') {
                //데이터의 content가 없으면 카드의 안보이게 한다
                //restaurant.children[1].children[i].children[1].children[1].style.display = 'none';
                //<p class="body-content"></p>
            }
            restaurant.children[1].children[i].children[1].children[1].append(response.data[i].content);
            //<p class="body-content"></p>
            restaurant.children[1].children[i].children[1].children[2].append('리뷰 ' + response.data[i].review);
            //<p class="body-review"></p>
            if (response.data[i].address) {
                //데이더의 address가 존재한다면 주소 나타내준다
                restaurant.children[1].children[i].children[1].children[3].append(response.data[i].address);
                //<div class="body-content-extra"></div>;
            } else if (response.data[i].tags.length) {
                //데이터의 tags가 존재한다면 주소 말고 태그들을 보여준다
                restaurant.children[1].children[i].children[1].children[3].style.display = 'none';
                //<div class="body-content-extra"></div>;
                for (var j = 0; j < response.data[i].tags.length; j++) {
                    restaurant.children[1].children[i].children[1].children[4].innerHTML +=
                        '<div class="body-content-list-tags">' + response.data[i].tags[j] + '</div>';
                }
            }
        }
    });
    $.ajax({
        url: `${naverurl}술집`,
        type: 'get',
        dataType: 'json',
    }).done((response) => {
        console.log('술집');
        for (var i = 0; i < 4; i = i + 1) {
            pub.children[1].children[i].children[0].style.backgroundImage = 'url(' + response.data[i].img + ')';
            //<div class="card-header" style="background-image: url(http://placehold.it/150x150);"></div>
            pub.children[1].children[i].children[1].children[0].children[0].append(response.data[i].title);
            //<h2 class="body-title"></h2>
            for (var j = 0; j < response.data[i].category.length; j++) {
                pub.children[1].children[i].children[1].children[0].children[1].innerHTML += response.data[i].category[j] + ' ';
                //<div class="body-category"></div>;
            }
            if (response.data[i].content == '') {
                //데이터의 content가 없으면 카드의 안보이게 한다
                //restaurant.children[1].children[i].children[1].children[1].style.display = 'none';
                //<p class="body-content"></p>
                pub.children[1].children[i].children[1].children[1].style.display = 'none';
            }
            pub.children[1].children[i].children[1].children[1].append(response.data[i].content);
            //<p class="body-content"></p>
            pub.children[1].children[i].children[1].children[2].append('리뷰수 ' + response.data[i].review);
            //<p class="body-review"></p>
            if (response.data[i].address) {
                //데이더의 address가 존재한다면 주소 나타내준다
                pub.children[1].children[i].children[1].children[3].append(response.data[i].address);
                //<div class="body-content-extra"></div>;
            } else if (response.data[i].tags.length) {
                //데이터의 tags가 존재한다면 주소 말고 태그들을 보여준다
                pub.children[1].children[i].children[1].children[3].style.display = 'none';
                //<div class="body-content-extra"></div>;
                for (var j = 0; j < response.data[i].tags.length; j++) {
                    pub.children[1].children[i].children[1].children[4].innerHTML +=
                        '<div class="body-content-list-tags">' + response.data[i].tags[j] + '</div>';
                }
            }
        }
    });
    $.ajax({
        url: `${naverurl}카페`,
        type: 'get',
        dataType: 'json',
    }).done((response) => {
        console.log('카페');
        for (var i = 0; i < 4; i = i + 1) {
            cafe.children[1].children[i].children[0].style.backgroundImage = 'url(' + response.data[i].img + ')';
            //<div class="card-header" style="background-image: url(http://placehold.it/150x150);"></div>
            cafe.children[1].children[i].children[1].children[0].children[0].append(response.data[i].title);
            //<h2 class="body-title"></h2>
            for (var j = 0; j < response.data[i].category.length; j++) {
                cafe.children[1].children[i].children[1].children[0].children[1].innerHTML += response.data[i].category[j] + ' ';
                //<div class="body-category"></div>;
            }
            if (response.data[i].content == '') {
                //데이터의 content가 없으면 카드의 안보이게 한다
                //restaurant.children[1].children[i].children[1].children[1].style.display = 'none';
                //<p class="body-content"></p>
                cafe.children[1].children[i].children[1].children[1].style.display = 'none';
            }
            cafe.children[1].children[i].children[1].children[1].append(response.data[i].content);
            //<p class="body-content"></p>
            cafe.children[1].children[i].children[1].children[2].append('리뷰수 ' + response.data[i].review);
            //<p class="body-review"></p>
            if (response.data[i].address) {
                //데이더의 address가 존재한다면 주소 나타내준다
                cafe.children[1].children[i].children[1].children[3].append(response.data[i].address);
                //<div class="body-content-extra"></div>;
            } else if (response.data[i].tags.length) {
                //데이터의 tags가 존재한다면 주소 말고 태그들을 보여준다
                cafe.children[1].children[i].children[1].children[3].style.display = 'none';
                //<div class="body-content-extra"></div>;
                for (var j = 0; j < response.data[i].tags.length; j++) {
                    cafe.children[1].children[i].children[1].children[4].innerHTML +=
                        '<div class="body-content-list-tags">' + response.data[i].tags[j] + '</div>';
                }
            }
        }
    });

    $.ajax({
        url: `${naverurl}디저트`,
        type: 'get',
        dataType: 'json',
    }).done((response) => {
        console.log('디저트');
        for (var i = 0; i < 4; i = i + 1) {
            dessert.children[1].children[i].children[0].style.backgroundImage = 'url(' + response.data[i].img + ')';
            //<div class="card-header" style="background-image: url(http://placehold.it/150x150);"></div>
            dessert.children[1].children[i].children[1].children[0].children[0].append(response.data[i].title);
            //<h2 class="body-title"></h2>
            for (var j = 0; j < response.data[i].category.length; j++) {
                dessert.children[1].children[i].children[1].children[0].children[1].innerHTML += response.data[i].category[j] + ' ';
                //<div class="body-category"></div>;
            }
            if (response.data[i].content == '') {
                //데이터의 content가 없으면 카드의 안보이게 한다
                //restaurant.children[1].children[i].children[1].children[1].style.display = 'none';
                //<p class="body-content"></p>
                dessert.children[1].children[i].children[1].children[1].style.display = 'none';
            }
            dessert.children[1].children[i].children[1].children[1].append(response.data[i].content);
            //<p class="body-content"></p>
            dessert.children[1].children[i].children[1].children[2].append('리뷰수 ' + response.data[i].review);
            //<p class="body-review"></p>
            if (response.data[i].address) {
                //데이더의 address가 존재한다면 주소 나타내준다
                dessert.children[1].children[i].children[1].children[3].append(response.data[i].address);
                //<div class="body-content-extra"></div>;
            } else if (response.data[i].tags.length) {
                //데이터의 tags가 존재한다면 주소 말고 태그들을 보여준다
                dessert.children[1].children[i].children[1].children[3].style.display = 'none';
                //<div class="body-content-extra"></div>;
                for (var j = 0; j < response.data[i].tags.length; j++) {
                    dessert.children[1].children[i].children[1].children[4].innerHTML +=
                        '<div class="body-content-list-tags">' + response.data[i].tags[j] + '</div>';
                }
            }
        }
    });
    $.ajax({
        url: `${korearankurl}`, //여행지
        type: 'get',
        dataType: 'json',
    }).done((response) => {
        for (var i = 0; i < 4; i = i + 1) {
            playing.children[1].children[i].children[0].style.backgroundImage = 'url(' + response.data[i].img + ')';
            //<div class="card-header" style="background-image: url(http://placehold.it/150x150);"></div>
            playing.children[1].children[i].children[1].children[0].children[0].append(response.data[i].title);
            //<h2 class="body-title"></h2>;
            playing.children[1].children[i].children[1].children[1].append(response.data[i].content);
            //<p class="body-content-tour"></p>
            playing.children[1].children[i].children[1].children[2].append(response.data[i].address);
            //<p class="body-address"></p>
        }
    });
});
