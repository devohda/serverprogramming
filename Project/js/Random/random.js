i = 0;
$(document).ready(function () {
    // 지역 + 카테고리 클릭시 함수
    $('.food').click(function food() {
        i = i + 1;
        $(document)
            .find('.course-area')
            .append(
                '<div class="course-result">' +
                    '<img class="resultimg' +
                    '" src="" />' +
                    '<div class="course">' +
                    '<p class="resulttitle' +
                    '"></p>' +
                    '<a href"" class="resulthref' +
                    '">' +
                    '<p class="resultlink' +
                    '">링크</p>' +
                    '</a>' +
                    '<p class="resultaddress' +
                    '">1&nbsp;</p>' +
                    '<p class="resultcategory' +
                    '">2&nbsp;</p>' +
                    '<p class="resulttags' +
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
            return 
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
