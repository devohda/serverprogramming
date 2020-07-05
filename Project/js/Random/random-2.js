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
                $.each(s, function (i, el) {});
                $(document).find('#resultcategory').append(s);
            },
        });

        return false; //action 페이지로전환되는것을차단합니다.
    });
});
//]]>
