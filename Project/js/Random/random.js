$(document).ready(function () {
    // 지역 + 카테고리 클릭시 함수
    var i = 0;
    $('.food').click(function () {
        i = i + 1;
        $(document)
            .find('.course-area')
            .append(
                '<div class="randomfood">' +
                    '<img class="resultimg' +
                    i +
                    '" src="" />' +
                    '<div id="course">' +
                    '<p id="course' +
                    i +
                    '">코스 ' +
                    i +
                    '</p>' +
                    '<p id="resulttitle' +
                    i +
                    '"></p>' +
                    '<a href"" id="resulthref">' +
                    '<p id="resultlink' +
                    i +
                    '">링크</p>' +
                    '</a>' +
                    '</div>' +
                    '<div class="button-area">' +
                    '<form method="GET" name="result" id="result">' +
                    '<input type="button" name="" id="rerandom" value="다시뽑기" />' +
                    '</form>' +
                    '</div>' +
                    '</div>',
            );
    });
});
//<![CDATA[
$(function () {
    var i = 0;
    $('.food').click(function () {
        i = i + 1;
        $.ajax({
            url: 'http://59.6.42.102:8080/api/random/test', //데이터전송및요청할URL 주소
            type: 'GET',
            dataType: 'JSON',

            error: function () {
                alert('통신실패!!!!');
            },
            success: function (result) {
                $(document)
                    .find('.resultimg' + i)
                    .attr('src', result.data[0].img);
                $(document)
                    .find('#resulttitle' + i)
                    .append(result.data[0].title);
                $(document).find('#resulthref').attr('href', result.data[0].link);
            },
        });

        return false; //action 페이지로전환되는것을차단합니다.
    });
});
//]]>
