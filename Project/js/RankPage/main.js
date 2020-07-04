$(document).ready(function () {
    var restaurant = document.getElementById('restaurant');
    var restaurant = document.getElementById('restaurant');
    var restaurant = document.getElementById('restaurant');
    var restaurant = document.getElementById('restaurant');
    var restaurant = document.getElementById('restaurant');
    $.ajax({
        url: 'http://59.6.42.102:8080/api/rank/list?keyword=%EC%9D%8C%EC%8B%9D%EC%A0%90',
        type: 'get',
        dataType: 'json',
    }).done((response) => {
        for (var i = 0; i < 4; i = i + 1) {
            restaurant.children[1].children[i].children[0].style.backgroundImage = 'url(' + response.data[i].img + ')';
            restaurant.children[1].children[i].children[1].children[0].textContent = response.data[i].title;
            restaurant.children[1].children[i].children[1].children[1].textContent = response.data[i].content;
            for (var j = 0; j < response.data[i].category.length; j = j + 1) {
                console.log(restaurant.children[1].children[i].children[1].children);
                restaurant.children[1].children[i].children[1].children[2].textContent = response.data[i].category[j];
            }
        }
    });
    $.ajax({
        url: 'http://59.6.42.102:8080/api/rank/test',
        type: 'get',
        dataType: 'json',
    }).done((response) => {
        for (var i = 0; i < 4; i = i + 1) {
            restaurant.children[1].children[i].children[0].style.backgroundImage = 'url(' + response.data[i].img + ')';
            restaurant.children[1].children[i].children[1].children[0].textContent = response.data[i].title;
            restaurant.children[1].children[i].children[1].children[1].textContent = response.data[i].content;
            for (var j = 0; j < response.data[i].category.length; j = j + 1) {
                console.log(restaurant.children[1].children[i].children[1].children);
                restaurant.children[1].children[i].children[1].children[2].textContent = response.data[i].category[j];
            }
        }
    });
    $.ajax({
        url: 'http://59.6.42.102:8080/api/rank/test',
        type: 'get',
        dataType: 'json',
    }).done((response) => {
        for (var i = 0; i < 4; i = i + 1) {
            restaurant.children[1].children[i].children[0].style.backgroundImage = 'url(' + response.data[i].img + ')';
            restaurant.children[1].children[i].children[1].children[0].textContent = response.data[i].title;
            restaurant.children[1].children[i].children[1].children[1].textContent = response.data[i].content;
            for (var j = 0; j < response.data[i].category.length; j = j + 1) {
                console.log(restaurant.children[1].children[i].children[1].children);
                restaurant.children[1].children[i].children[1].children[2].textContent = response.data[i].category[j];
            }
        }
    });
    $.ajax({
        url: 'http://59.6.42.102:8080/api/rank/test',
        type: 'get',
        dataType: 'json',
    }).done((response) => {
        for (var i = 0; i < 4; i = i + 1) {
            restaurant.children[1].children[i].children[0].style.backgroundImage = 'url(' + response.data[i].img + ')';
            restaurant.children[1].children[i].children[1].children[0].textContent = response.data[i].title;
            restaurant.children[1].children[i].children[1].children[1].textContent = response.data[i].content;
            for (var j = 0; j < response.data[i].category.length; j = j + 1) {
                console.log(restaurant.children[1].children[i].children[1].children);
                restaurant.children[1].children[i].children[1].children[2].textContent = response.data[i].category[j];
            }
        }
    });
    $.ajax({
        url: 'http://59.6.42.102:8080/api/rank/test',
        type: 'get',
        dataType: 'json',
    }).done((response) => {
        for (var i = 0; i < 4; i = i + 1) {
            restaurant.children[1].children[i].children[0].style.backgroundImage = 'url(' + response.data[i].img + ')';
            restaurant.children[1].children[i].children[1].children[0].textContent = response.data[i].title;
            restaurant.children[1].children[i].children[1].children[1].textContent = response.data[i].content;
            for (var j = 0; j < response.data[i].category.length; j = j + 1) {
                console.log(restaurant.children[1].children[i].children[1].children);
                restaurant.children[1].children[i].children[1].children[2].textContent = response.data[i].category[j];
            }
        }
    });
});
