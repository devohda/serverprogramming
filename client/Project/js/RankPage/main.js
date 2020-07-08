$(document).ready(function () {
    var restaurant = document.getElementById('restaurant');
    var pub = document.getElementById('pub');
    var cafe = document.getElementById('cafe');
    var dessert = document.getElementById('dessert');
    var playing = document.getElementById('playing');
    var naverurl = `http://59.6.42.102:8080/api/rank/list?keyword=`;
    var korearankurl = `http://59.6.42.102:8080/api/rank/tour?city=&category=&order=`; //디폴트
    $.ajax({
        url: `${naverurl}음식점`,
        //url: 'http://59.6.42.102:8080/api/rank/test',
        type: 'get',
        dataType: 'json',
    }).done((response) => {
        console.log('식당');

        for (var i = 0; i < 4; i = i + 1) {
            restaurant.children[1].children[i].children[0].style.backgroundImage = 'url(' + response.data[i].img + ')';
            restaurant.children[1].children[i].children[1].children[0].children[0].append(response.data[i].title);
            for (var j = 0; j < response.data[i].category.length; j++) {
                restaurant.children[1].children[i].children[1].children[0].children[1].innerHTML += response.data[i].category[j] + ' ';
            }
            if (response.data[i].content == '') {
                restaurant.children[1].children[i].children[1].children[1].style.display = 'none';
            }
            restaurant.children[1].children[i].children[1].children[1].append(response.data[i].content);
            restaurant.children[1].children[i].children[1].children[2].append('리뷰 ' + response.data[i].review);
            if (response.data[i].address) {
                console.log('주소');
                restaurant.children[1].children[i].children[1].children[3].append(response.data[i].address);
            } else if (response.data[i].tags.length) {
                console.log('태그');
                restaurant.children[1].children[i].children[1].children[3].style.display = 'none';
                for (var j = 0; j < response.data[i].tags.length; j++) {
                    restaurant.children[1].children[i].children[1].children[4].innerHTML +=
                        '<div class="body-content-list-tags">' + response.data[i].tags[j] + '</div>';
                }
            }
        }
    });
    $.ajax({
        url: `${naverurl}술집`,
        //url: 'http://59.6.42.102:8080/api/rank/test',
        type: 'get',
        dataType: 'json',
    }).done((response) => {
        console.log('술집');
        for (var i = 0; i < 4; i = i + 1) {
            pub.children[1].children[i].children[0].style.backgroundImage = 'url(' + response.data[i].img + ')';
            pub.children[1].children[i].children[1].children[0].children[0].append(response.data[i].title);
            for (var j = 0; j < response.data[i].category.length; j++) {
                pub.children[1].children[i].children[1].children[0].children[1].innerHTML += response.data[i].category[j] + ' ';
            }
            if (response.data[i].content == '') {
                pub.children[1].children[i].children[1].children[1].style.display = 'none';
            }
            pub.children[1].children[i].children[1].children[1].append(response.data[i].content);
            pub.children[1].children[i].children[1].children[2].append('리뷰수 ' + response.data[i].review);
            if (response.data[i].address) {
                console.log('주소');
                pub.children[1].children[i].children[1].children[3].append(response.data[i].address);
            } else if (response.data[i].tags.length) {
                console.log('태그');
                pub.children[1].children[i].children[1].children[3].style.display = 'none';
                for (var j = 0; j < response.data[i].tags.length; j++) {
                    pub.children[1].children[i].children[1].children[4].innerHTML +=
                        '<div class="body-content-list-tags">' + response.data[i].tags[j] + '</div>';
                }
            }
        }
    });
    $.ajax({
        url: `${naverurl}카페`,
        //url: 'http://59.6.42.102:8080/api/rank/test',
        type: 'get',
        dataType: 'json',
    }).done((response) => {
        console.log('카페');
        for (var i = 0; i < 4; i = i + 1) {
            cafe.children[1].children[i].children[0].style.backgroundImage = 'url(' + response.data[i].img + ')';
            cafe.children[1].children[i].children[1].children[0].children[0].append(response.data[i].title);
            for (var j = 0; j < response.data[i].category.length; j++) {
                cafe.children[1].children[i].children[1].children[0].children[1].innerHTML += response.data[i].category[j] + ' ';
            }
            if (response.data[i].content == '') {
                cafe.children[1].children[i].children[1].children[1].style.display = 'none';
            }
            cafe.children[1].children[i].children[1].children[1].append(response.data[i].content);
            cafe.children[1].children[i].children[1].children[2].append('리뷰수 ' + response.data[i].review);
            if (response.data[i].address) {
                console.log('주소');
                cafe.children[1].children[i].children[1].children[3].append(response.data[i].address);
            } else if (response.data[i].tags.length) {
                console.log('태그');
                cafe.children[1].children[i].children[1].children[3].style.display = 'none';
                for (var j = 0; j < response.data[i].tags.length; j++) {
                    cafe.children[1].children[i].children[1].children[4].innerHTML +=
                        '<div class="body-content-list-tags">' + response.data[i].tags[j] + '</div>';
                }
            }
        }
    });

    $.ajax({
        url: `${naverurl}디저트`,
        //url: 'http://59.6.42.102:8080/api/rank/test',
        type: 'get',
        dataType: 'json',
    }).done((response) => {
        console.log('디저트');
        for (var i = 0; i < 4; i = i + 1) {
            dessert.children[1].children[i].children[0].style.backgroundImage = 'url(' + response.data[i].img + ')';
            dessert.children[1].children[i].children[1].children[0].children[0].append(response.data[i].title);
            for (var j = 0; j < response.data[i].category.length; j++) {
                dessert.children[1].children[i].children[1].children[0].children[1].innerHTML += response.data[i].category[j] + ' ';
            }
            if (response.data[i].content == '') {
                dessert.children[1].children[i].children[1].children[1].style.display = 'none';
            }
            dessert.children[1].children[i].children[1].children[1].append(response.data[i].content);
            dessert.children[1].children[i].children[1].children[2].append('리뷰수 ' + response.data[i].review);
            if (response.data[i].address) {
                console.log('주소');
                dessert.children[1].children[i].children[1].children[3].append(response.data[i].address);
            } else if (response.data[i].tags.length) {
                console.log('태그');
                dessert.children[1].children[i].children[1].children[3].style.display = 'none';
                for (var j = 0; j < response.data[i].tags.length; j++) {
                    dessert.children[1].children[i].children[1].children[4].innerHTML +=
                        '<div class="body-content-list-tags">' + response.data[i].tags[j] + '</div>';
                }
            }
        }
    });
    $.ajax({
        url: `${korearankurl}`, //여행
        //url: 'http://59.6.42.102:8080/api/rank/test',
        type: 'get',
        dataType: 'json',
    }).done((response) => {
        console.log(response);
        for (var i = 0; i < 4; i = i + 1) {
            playing.children[1].children[i].children[0].style.backgroundImage = 'url(' + response.data[i].img + ')';
            playing.children[1].children[i].children[1].children[0].children[0].append(response.data[i].title);
            playing.children[1].children[i].children[1].children[1].append(response.data[i].content);
            playing.children[1].children[i].children[1].children[2].append(response.data[i].address);
        }
    });
});