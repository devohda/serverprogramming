//url 만들기(api 가져오기)
let url = 'http://59.6.42.102:8080/api/random/pick?keyword=';
let loca = '';
let foodText = ['한식', '중식', '일식', '분식', '양식'];
let randomText = ['피씨방', '노래방', '당구장', '방탈출', '공원', '공방', '클럽', '보드게임'];
i = 0;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(document).ready(function () {
    // 지역 + 카테고리 클릭시 함수

    //음식점 카페 주점 놀기 중 하나 선택시 div 만들기.
    const COURSE = document.querySelector('.course-area');

    function makingCourse() {
        const course_result = document.createElement('div');
        course_result.classList.add('course-result');
        course_result.classList.add('scale-in-center');

        const result_img = document.createElement('img');
        result_img.classList.add('result-img');

        const course = document.createElement('div');
        course.classList.add('course');

        const result_title = document.createElement('p');
        result_title.classList.add('result-title');
        const result_href = document.createElement('a');
        result_href.classList.add('result-href');
        result_href.innerText = '상세보기';

        const result_content = document.createElement('div');
        result_content.classList.add('result-content');

        const result_address = document.createElement('p');
        const result_category = document.createElement('p');
        const result_tags = document.createElement('div');

        result_address.classList.add('result-address');
        result_category.classList.add('result-category');
        result_tags.classList.add('result-tags');

        result_content.appendChild(result_address);
        result_content.appendChild(result_category);
        result_content.appendChild(result_tags);

        const re_load = document.createElement('button');
        re_load.classList.add('re-load');
        re_load.innerText = '다시 뽑기';

        course.appendChild(result_title);
        course.appendChild(result_content);
        course.appendChild(result_href);
        course.appendChild(re_load);

        const del = document.createElement('img');
        del.classList.add('delete');
        del.setAttribute('src', '../../src/Random/delete.png');

        course_result.appendChild(result_img);
        course_result.appendChild(course);
        course_result.appendChild(del);

        return course_result;
    }

    // 지역 입력 받기
    $('#search-button').click(function () {
        loca = $('input').val();
        console.log(loca + '1');
    });

    //각 버튼 눌렀을 때

    $('.food').click(function food() {
        let c = makingCourse();
        COURSE.appendChild(c);
        c.classList.add('foodbox');
        let dom1 = '<div class="loader"></div>';
        $(c).append(dom1);
        //<![CDATA[
        console.log(loca + '2');
        $.ajax({
            url: `${url}${loca} 음식점 ${foodText[getRandomInt(0, 4)]}`,
            //데이터전송및요청할URL 주소 -> 변수 url의 값으로 교체 예정
            type: 'GET',
            dataType: 'JSON',

            error: function () {
                alert('다시 뽑기를 눌러 주세요!!!!');
                $('.loader').remove();
            },
            success: function (result) {
                $('.loader').remove();
                $(c).children('.result-img').attr('src', result.data[0].img);
                $(c).find('.result-title').append(result.data[0].title);
                $(c).find('.result-href').attr('href', result.data[0].link);
                $(c).find('.result-href').attr('target', '_blank');
                $(c).find('.result-address').append(result.data[0].address);
                var s = result.data[0].category;
                $(s).each(function (index, item) {
                    $(c)
                        .find('.result-category')
                        .append(item + ' ');
                });
                var s2 = result.data[0].tags;
                $(s2).each(function (index, item) {
                    const tag = document.createElement('div');
                    tag.classList.add('tag');
                    tag.innerText = '#' + item;
                    $(c).find('.result-tags').append(tag);
                });
            },
        });
        //]]>
    });

    $('.cafe').click(function () {
        let c = makingCourse();
        COURSE.appendChild(c);
        c.classList.add('cafebox');
        let dom1 = '<div class="loader"></div>';
        $(c).append(dom1);
        //<![CDATA[
        $.ajax({
            url: `${url}${loca} 카페`,
            //데이터전송및요청할URL 주소 -> 변수 url의 값으로 교체 예정
            type: 'GET',
            dataType: 'JSON',

            error: function () {
                alert('다시 뽑기를 눌러 주세요!!!!');
                $('.loader').remove();
            },
            success: function (result) {
                $('.loader').remove();
                $(c).children('.result-img').attr('src', result.data[0].img);
                $(c).find('.result-title').append(result.data[0].title);
                $(c).find('.result-href').attr('href', result.data[0].link);
                $(c).find('.result-address').append(result.data[0].address);
                var s = result.data[0].category;
                $(s).each(function (index, item) {
                    $(c)
                        .find('.result-category')
                        .append(item + ' ');
                });
                var s2 = result.data[0].tags;
                $(s2).each(function (index, item) {
                    const tag = document.createElement('div');
                    tag.classList.add('tag');
                    tag.innerText = '#' + item;
                    $(c).find('.result-tags').append(tag);
                });
            },
        });
        //]]>
    });
    $('.drink').click(function () {
        let c = makingCourse();
        COURSE.appendChild(c);
        c.classList.add('drinkbox');
        let dom1 = '<div class="loader"></div>';
        $(c).append(dom1);
        //<![CDATA[
        $.ajax({
            url: `${url}${loca} 술집`,
            //데이터전송및요청할URL 주소 -> 변수 url의 값으로 교체 예정
            type: 'GET',
            dataType: 'JSON',

            error: function () {
                alert('다시 뽑기를 눌러 주세요!!!!');
                $('.loader').remove();
            },
            success: function (result) {
                $('.loader').remove();
                $(c).children('.result-img').attr('src', result.data[0].img);
                $(c).find('.result-title').append(result.data[0].title);
                $(c).find('.result-href').attr('href', result.data[0].link);
                $(c).find('.result-address').append(result.data[0].address);
                var s = result.data[0].category;
                $(s).each(function (index, item) {
                    $(c)
                        .find('.result-category')
                        .append(item + ' ');
                });
                var s2 = result.data[0].tags;
                $(s2).each(function (index, item) {
                    const tag = document.createElement('div');
                    tag.classList.add('tag');
                    tag.innerText = '#' + item;
                    $(c).find('.result-tags').append(tag);
                });
            },
        });
        //]]>
    });
    $('.play').click(function () {
        let c = makingCourse();
        COURSE.appendChild(c);
        c.classList.add('playbox');
        let dom1 = '<div class="loader"></div>';
        $(c).append(dom1);
        //<![CDATA[
        $.ajax({
            url: `${url}${loca} ${randomText[getRandomInt(0, 7)]}`,
            //데이터전송및요청할URL 주소 -> 변수 url의 값으로 교체 예정
            type: 'GET',
            dataType: 'JSON',

            error: function () {
                alert('다시 뽑기를 눌러 주세요!!!!');
                $('.loader').remove();
            },
            success: function (result) {
                $('.loader').remove();
                $(c).children('.result-img').attr('src', result.data[0].img);
                $(c).find('.result-title').append(result.data[0].title);
                $(c).find('.result-href').attr('href', result.data[0].link);
                $(c).find('.result-address').append(result.data[0].address);
                var s = result.data[0].category;
                $(s).each(function (index, item) {
                    $(c)
                        .find('.result-category')
                        .append(item + ' ');
                });
                var s2 = result.data[0].tags;
                $(s2).each(function (index, item) {
                    const tag = document.createElement('div');
                    tag.classList.add('tag');
                    tag.innerText = '#' + item;
                    $(c).find('.result-tags').append(tag);
                });
            },
        });
        //]]>
    });
});

$(document).on('click', '.delete', function () {
    let c = $(this).parent();
    c.remove();
});

$(document).on('click', '.re-load', function () {
    let c = $(this).parents('.course-result');
    let newUrl = url;
    let dom1 = '<div class="loader"></div>';
    $(c).append(dom1);
    if ($(c).hasClass('foodbox') === true) {
        newUrl = newUrl + loca + ' 음식점' + ' ' + foodText[getRandomInt(0, 4)];
    }
    if ($(c).hasClass('cafebox') === true) {
        newUrl = newUrl + loca + ' 카페';
    }
    if ($(c).hasClass('drinkbox') === true) {
        newUrl = newUrl + loca + ' 주점';
    }
    if ($(c).hasClass('playbox') === true) {
        newUrl = newUrl + loca + ' ' + randomText[getRandomInt(0, 8)];
    }
    $.ajax({
        url: `${newUrl}`,
        //데이터전송및요청할URL 주소 -> 변수 url의 값으로 교체 예정
        type: 'GET',
        dataType: 'JSON',
        error: function () {
            alert('다시 뽑기를 눌러 주세요!!!!');
            $('.loader').remove();
        },
        success: function (result) {
            $('.loader').remove();
            $(c).children('.result-img').attr('src', result.data[0].img);
            $(c).find('.result-title').text(result.data[0].title);
            $(c).find('.result-href').attr('href', result.data[0].link);
            $(c).find('.result-address').text(result.data[0].address);
            var s = result.data[0].category;
            $(c).find('.result-category').text('');
            $(s).each(function (index, item) {
                $(c)
                    .find('.result-category')
                    .append(item + ' ');
            });
            var s2 = result.data[0].tags;
            $(c).find('.result-tags').text('');
            $(s2).each(function (index, item) {
                const tag = document.createElement('div');
                tag.classList.add('tag');
                tag.innerText = '#' + item;
                $(c).find('.result-tags').append(tag);
            });
        },
    });
});

$(document).on('click', '#all-re-load', function () {
    let resultAll = $('.course-result');
    let newUrl = url;
    let dom1 = '<div class="loader"></div>';
    $('.course-result').append(dom1);
    $(resultAll).each(function (index, item) {
        let c = item;
        let newUrl = url;
        if ($(c).hasClass('foodbox') === true) {
            newUrl = newUrl + loca + ' 음식점' + ' ' + foodText[getRandomInt(0, 4)];
        }
        if ($(c).hasClass('cafebox') === true) {
            newUrl = newUrl + loca + ' 카페';
        }
        if ($(c).hasClass('drinkbox') === true) {
            newUrl = newUrl + loca + ' 술집';
        }
        if ($(c).hasClass('playbox') === true) {
            newUrl = newUrl + loca + ' ' + randomText[getRandomInt(0, 7)];
        }
        $.ajax({
            url: `${newUrl}`,
            //데이터전송및요청할URL 주소 -> 변수 url의 값으로 교체 예정
            type: 'GET',
            dataType: 'JSON',

            error: function () {
                alert('통신실패!!!!');
                alert('다시 뽑기를 눌러 주세요!!!!');
                $('.loader').remove();
            },
            success: function (result) {
                $('.loader').remove();
                $(c).children('.result-img').attr('src', result.data[0].img);
                $(c).find('.result-title').text(result.data[0].title);
                $(c).find('.result-href').attr('href', result.data[0].link);
                $(c).find('.result-address').text(result.data[0].address);
                var s = result.data[0].category;
                $(c).find('.result-category').text('');
                $(s).each(function (index, item) {
                    $(c)
                        .find('.result-category')
                        .append(item + ' ');
                });
                var s2 = result.data[0].tags;
                $(c).find('.result-tags').text('');
                $(s2).each(function (index, item) {
                    $(c);
                    const tag = document.createElement('div');
                    tag.classList.add('tag');
                    tag.innerText = '#' + item;
                    $(c).find('.result-tags').append(tag);
                });
            },
        });
    });
});
