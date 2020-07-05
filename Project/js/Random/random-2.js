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
                $(document).find('#resulttitle').append(result.data[0].title);
                $(document).find('#resulthref').attr('href', result.data[0].link);
                $(document).find('#resultaddress').append(result.data[0].address);
                var s = result.data[0].category;
                $(s).each(function (index, item) {
                    $(document)
                        .find('#resultcategory')
                        .append(item + ' ');
                });
                var s2 = result.data[0].tags;
                $(s2).each(function (index, item) {
                    $(document)
                        .find('#resulttags')
                        .append(item + ' ');
                });
            },
        });

        return false; //action 페이지로전환되는것을차단합니다.
    });
});
//]]>
$(document).ready(function () {
    $(this)
        .find('#erase')
        .click(function () {
            $('.randomfood').remove();
        });
});
