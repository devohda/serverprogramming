i = 0;
$(document).ready(function () {
    // 지역 + 카테고리 클릭시 함수

    //음식점 카페 주점 놀기 중 하나 선택시 div 만들기.
    const COURSE = document.querySelector('.course-area');

    function makingCourse() {
        const course_result = document.createElement('div');
        course_result.classList.add('course-result');

        const result_img = document.createElement('img');
        result_img.classList.add('result-img');

        const course = document.createElement('div');
        course.classList.add('course');

        const result_title = document.createElement('p');
        result_title.classList.add('result-title');
        const result_href = document.createElement('a');
        result_href.classList.add('result-href');

        const result_content = document.createElement('div');
        result_content.classList.add('result-content');

        const result_address = document.createElement('p');
        const result_category = document.createElement('p');
        const result_tags = document.createElement('p');

        result_address.classList.add('result-address');
        result_category.classList.add('result-category');
        result_tags.classList.add('result-tags');

        result_content.appendChild(result_address);
        result_content.appendChild(result_category);
        result_content.appendChild(result_tags);

        const re_load = document.createElement('button');
        re_load.classList.add('re-load');

        course.appendChild(result_title);
        course.appendChild(result_href);
        course.appendChild(result_content);
        course.appendChild(re_load);

        const del = document.createElement('img');
        del.classList.add('delete');

        course_result.appendChild(result_img);
        course_result.appendChild(course);
        course_result.appendChild(del);

        return course_result;
    }

    let url = '';

    let location = input();
    function input() {
        let location = $('#input').value;
        return location;
    }

    $('.category-position').click(function () {
        const c = makingCourse();
        COURSE.appendChild(c);
    });

    $('.food').click(function food() {
        i = i + 1;
        $(document).return;
    });
    $('.cafe').click(function () {
        i = i + 1;
        $(document)
            .find('.course-area')
            .append(
                '<div class="course-result">' +
                    '<img class="resultimg' +
                    i +
                    '" src="" />' +
                    '<div class="course">' +
                    '<p class="resulttitle' +
                    i +
                    '"></p>' +
                    '<a href"" class="resulthref' +
                    i +
                    '">' +
                    '<p class="resultlink' +
                    i +
                    '">링크</p>' +
                    '</a>' +
                    '<p class="resultaddress' +
                    i +
                    '">1&nbsp;</p>' +
                    '<p class="resultcategory' +
                    i +
                    '">2&nbsp;</p>' +
                    '<p class="resulttags' +
                    i +
                    '">3&nbsp;</p>' +
                    '</div>' +
                    '<div class="erase">삭제</div>' +
                    '<div class="button-area">' +
                    '<form method="GET" name="result" class="result">' +
                    '<input type="button" name="" class="rerandom" value="다시뽑기" />' +
                    '</form>' +
                    '</div>' +
                    '</div>',
            );
    });
    $('.drink').click(function () {
        i = i + 1;
        $(document)
            .find('.course-area')
            .append(
                '<div class="course-result">' +
                    '<img class="resultimg' +
                    i +
                    '" src="" />' +
                    '<div class="course">' +
                    '<p class="resulttitle' +
                    i +
                    '"></p>' +
                    '<a href"" class="resulthref' +
                    i +
                    '">' +
                    '<p class="resultlink' +
                    i +
                    '">링크</p>' +
                    '</a>' +
                    '<p class="resultaddress' +
                    i +
                    '">1&nbsp;</p>' +
                    '<p class="resultcategory' +
                    i +
                    '">2&nbsp;</p>' +
                    '<p class="resulttags' +
                    i +
                    '">3&nbsp;</p>' +
                    '</div>' +
                    '<div class="erase">삭제</div>' +
                    '<div class="button-area">' +
                    '<form method="GET" name="result" class="result">' +
                    '<input type="button" name="" class="rerandom" value="다시뽑기" />' +
                    '</form>' +
                    '</div>' +
                    '</div>',
            );
    });
    $('.play').click(function () {
        i = i + 1;
        $(document)
            .find('.course-area')
            .append(
                '<div class="course-result">' +
                    '<img class="resultimg' +
                    i +
                    '" src="" />' +
                    '<div class="course">' +
                    '<p class="resulttitle' +
                    i +
                    '"></p>' +
                    '<a href"" class="resulthref' +
                    i +
                    '">' +
                    '<p class="resultlink' +
                    i +
                    '">링크</p>' +
                    '</a>' +
                    '<p class="resultaddress' +
                    i +
                    '">1&nbsp;</p>' +
                    '<p class="resultcategory' +
                    i +
                    '">2&nbsp;</p>' +
                    '<p class="resulttags' +
                    i +
                    '">3&nbsp;</p>' +
                    '</div>' +
                    '<div class="erase">삭제</div>' +
                    '<div class="button-area">' +
                    '<form method="GET" name="result" class="result">' +
                    '<input type="button" name="" class="rerandom" value="다시뽑기" />' +
                    '</form>' +
                    '</div>' +
                    '</div>',
            );
    });
});
//<![CDATA[
$(function () {
    $('.food').click(function () {
        $.ajax({
            url: 'http://59.6.42.102:8080/api/random/test', //데이터전송및요청할URL 주소
            type: 'GET',
            dataType: 'JSON',

            error: function () {
                alert('통신실패!!!!');
            },
            success: function (result) {
                $(document).find('.resultimg').attr('src', result.data[0].img);
                $(document).find('.resulttitle').append(result.data[0].title);
                $(document).find('.resulthref').attr('href', result.data[0].link);
                $(document).find('.resultaddress').append(result.data[0].address);
                var s = result.data[0].category;
                $(s).each(function (index, item) {
                    $(document)
                        .find('.resultcategory')
                        .append(item + ' ');
                });
                var s2 = result.data[0].tags;
                $(s2).each(function (index, item) {
                    $(document)
                        .find('.resulttags')
                        .append('"' + item + '" ');
                });
            },
        });

        return false; //action 페이지로전환되는것을차단합니다.
    });
});
//]]>
$(document).on('click', '.erase', function () {
    $(this).parent().remove();
    i = i - 1;
});

$(document).on('click', '.rerandom', function () {
    var box = $(this).parents('.course-result');
    $.ajax({
        url: 'http://59.6.42.102:8080/api/random/test', //데이터전송및요청할URL 주소
        type: 'GET',
        dataType: 'JSON',

        error: function () {
            alert('통신실패!!!!');
        },
        success: function (result) {
            console.log(result);
            box.find('.resultimg').attr('src', result.data[0].img);
        },
    });
});
