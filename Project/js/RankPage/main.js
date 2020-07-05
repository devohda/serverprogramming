$(document).ready(function () {
    var restaurant = document.getElementById('restaurant');
    var pub = document.getElementById('pub');
    var cafe = document.getElementById('cafe');
    var dessert = document.getElementById('dessert');
    var playing = document.getElementById('playing');

    $.ajax({
        //url: 'http://59.6.42.102:8080/api/rank/list?keyword=%EC%9D%8C%EC%8B%9D%EC%A0%90', //음식점
        url: 'http://59.6.42.102:8080/api/rank/test',
        type: 'get',
        dataType: 'json',
    }).done((response) => {
        console.log('식당');
        for (var i = 0; i < 4; i = i + 1) {
            restaurant.children[1].children[i].children[0].style.backgroundImage = 'url(' + response.data[i].img + ')';
            restaurant.children[1].children[i].children[1].children[0].append(response.data[i].title);
            restaurant.children[1].children[i].children[1].children[1].append(response.data[i].content);
            restaurant.children[1].children[i].children[1].children[2].append('리뷰수 ' + response.data[i].review);
            if (response.data[i].address) {
                console.log('주소');
                restaurant.children[1].children[i].children[1].children[3].append(response.data[i].address);
            } else if (response.data[i].category.length != 0) {
                console.log('카테고리');
                for (var j = 0; j < response.data[i].category.length; j++) {
                    restaurant.children[1].children[i].children[1].children[3].innerHTML +=
                        '<div class="body-content-list-category">' + response.data[i].category[j] + '</div>';
                }
            } else if (response.data[i].tags.length) {
                console.log('태그');
                for (var j = 0; j < response.data[i].tags.length; j++) {
                    restaurant.children[1].children[i].children[1].children[3].innerHTML +=
                        '<div class="body-content-list-tags">' + response.data[i].tags[j] + '</div>';
                }
            }
        }
    });
    $.ajax({
        //url: 'http://59.6.42.102:8080/api/rank/list?keyword=%EC%88%A0%EC%A7%91', //술집
        url: 'http://59.6.42.102:8080/api/rank/test',
        type: 'get',
        dataType: 'json',
    }).done((response) => {
        console.log('술집');
        for (var i = 0; i < 4; i = i + 1) {
            pub.children[1].children[i].children[0].style.backgroundImage = 'url(' + response.data[i].img + ')';
            pub.children[1].children[i].children[1].children[0].append(response.data[i].title);
            pub.children[1].children[i].children[1].children[1].append(response.data[i].content);
            pub.children[1].children[i].children[1].children[2].append('리뷰수 ' + response.data[i].review);
            if (response.data[i].address) {
                console.log('주소');
                pub.children[1].children[i].children[1].children[3].append(response.data[i].address);
            } else if (response.data[i].category.length != 0) {
                console.log('카테고리');
                for (var j = 0; j < response.data[i].category.length; j++) {
                    pub.children[1].children[i].children[1].children[3].innerHTML +=
                        '<div class="body-content-list-category">' + response.data[i].category[j] + '</div>';
                }
            } else if (response.data[i].tags.length) {
                console.log('태그');
                for (var j = 0; j < response.data[i].tags.length; j++) {
                    pub.children[1].children[i].children[1].children[3].innerHTML +=
                        '<div class="body-content-list-tags">' + response.data[i].tags[j] + '</div>';
                }
            }
        }
    });
    $.ajax({
        //url: 'http://59.6.42.102:8080/api/rank/list?keyword=%EC%B9%B4%ED%8E%98', //카페
        url: 'http://59.6.42.102:8080/api/rank/test',
        type: 'get',
        dataType: 'json',
    }).done((response) => {
        console.log('카페');
        for (var i = 0; i < 4; i = i + 1) {
            cafe.children[1].children[i].children[0].style.backgroundImage = 'url(' + response.data[i].img + ')';
            cafe.children[1].children[i].children[1].children[0].append(response.data[i].title);
            cafe.children[1].children[i].children[1].children[1].append(response.data[i].content);
            cafe.children[1].children[i].children[1].children[2].append('리뷰수 ' + response.data[i].review);
            if (response.data[i].address) {
                console.log('주소');
                cafe.children[1].children[i].children[1].children[3].append(response.data[i].address);
            } else if (response.data[i].category.length != 0) {
                console.log('카테고리');
                for (var j = 0; j < response.data[i].category.length; j++) {
                    cafe.children[1].children[i].children[1].children[3].innerHTML +=
                        '<div class="body-content-list-category">' + response.data[i].category[j] + '</div>';
                }
            } else if (response.data[i].tags.length) {
                console.log('태그');
                for (var j = 0; j < response.data[i].tags.length; j++) {
                    cafe.children[1].children[i].children[1].children[3].innerHTML +=
                        '<div class="body-content-list-tags">' + response.data[i].tags[j] + '</div>';
                }
            }
        }
    });

    $.ajax({
        //url: 'http://59.6.42.102:8080/api/rank/list?keyword=%EB%94%94%EC%A0%80%ED%8A%B8', //디저트
        url: 'http://59.6.42.102:8080/api/rank/test',
        type: 'get',
        dataType: 'json',
    }).done((response) => {
        console.log('디저트');
        for (var i = 0; i < 4; i = i + 1) {
            dessert.children[1].children[i].children[0].style.backgroundImage = 'url(' + response.data[i].img + ')';
            dessert.children[1].children[i].children[1].children[0].append(response.data[i].title);
            dessert.children[1].children[i].children[1].children[1].append(response.data[i].content);
            dessert.children[1].children[i].children[1].children[2].append('리뷰수 ' + response.data[i].review);
            if (response.data[i].address) {
                console.log('주소');
                dessert.children[1].children[i].children[1].children[3].append(response.data[i].address);
            } else if (response.data[i].category.length != 0) {
                console.log('카테고리');
                for (var j = 0; j < response.data[i].category.length; j++) {
                    dessert.children[1].children[i].children[1].children[3].innerHTML +=
                        '<div class="body-content-list-category">' + response.data[i].category[j] + '</div>';
                }
            } else if (response.data[i].tags.length) {
                console.log('태그');
                for (var j = 0; j < response.data[i].tags.length; j++) {
                    dessert.children[1].children[i].children[1].children[3].innerHTML +=
                        '<div class="body-content-list-tags">' + response.data[i].tags[j] + '</div>';
                }
            }
        }
    });
    $.ajax({
        //url: 'http://59.6.42.102:8080/api/rank/tour?city=&category=&order=', //여행
        url: 'http://59.6.42.102:8080/api/rank/test',
        type: 'get',
        dataType: 'json',
    }).done((response) => {
        console.log('놀기');
        for (var i = 0; i < 4; i = i + 1) {
            playing.children[1].children[i].children[0].style.backgroundImage = 'url(' + response.data[i].img + ')';
            playing.children[1].children[i].children[1].children[0].append(response.data[i].title);
            playing.children[1].children[i].children[1].children[1].append(response.data[i].content);
            playing.children[1].children[i].children[1].children[2].append('리뷰수 ' + response.data[i].review);
            if (response.data[i].address) {
                console.log('주소');
                playing.children[1].children[i].children[1].children[3].append(response.data[i].address);
            } else if (response.data[i].category.length != 0) {
                console.log('카테고리');
                for (var j = 0; j < response.data[i].category.length; j++) {
                    playing.children[1].children[i].children[1].children[3].innerHTML +=
                        '<div class="body-content-list-category">' + response.data[i].category[j] + '</div>';
                }
            } else if (response.data[i].tags.length) {
                console.log('태그');
                for (var j = 0; j < response.data[i].tags.length; j++) {
                    playing.children[1].children[i].children[1].children[3].innerHTML +=
                        '<div class="body-content-list-tags">' + response.data[i].tags[j] + '</div>';
                }
            }
        }
    });
});
