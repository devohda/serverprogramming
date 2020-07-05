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
        del.setAttribute('src', '../../src/Random/delete.png');

        course_result.appendChild(result_img);
        course_result.appendChild(course);
        course_result.appendChild(del);

        return course_result;
    }

    //url 만들기(api 가져오기)
    let url = 'http://59.6.42.102:8080/api/random/pick?keyword=';
    let location;

    // 지역 입력 받기
    $('#search-button').click(function () {
        location = $('input').val();
    });

    //각 버튼 눌렀을 때

    $('.food').click(function food() {
        let c = makingCourse();
        url = url + location + '맛집';
        //<![CDATA[
        $.ajax({
            url: 'http://59.6.42.102:8080/api/random/test',
            //데이터전송및요청할URL 주소 -> 변수 url의 값으로 교체 예정
            type: 'GET',
            dataType: 'JSON',

            error: function () {
                alert('통신실패!!!!');
                COURSE.appendChild(c);
            },
            success: function (result) {
                $(c).children('.result-img').attr('src', result.data[0].img);
                $(c).children('.result-title').append(result.data[0].title);
                $(c).children('.result-href').attr('href', result.data[0].link);
                $(c).children('.result-address').append(result.data[0].address);
                var s = result.data[0].category;
                $(s).each(function (index, item) {
                    $(c)
                        .children('.result-category')
                        .append(item + ' ');
                });
                var s2 = result.data[0].tags;
                $(s2).each(function (index, item) {
                    $(c)
                        .children('.result-tags')
                        .append('"' + item + '" ');
                });
                COURSE.appendChild(c);
            },
        });
        //]]>
    });

    $('.cafe').click(function () {
        let c = makingCourse();
        url = url + location + '카페';
        //<![CDATA[
        $.ajax({
            url: 'http://59.6.42.102:8080/api/random/test',
            //데이터전송및요청할URL 주소 -> 변수 url의 값으로 교체 예정
            type: 'GET',
            dataType: 'JSON',

            error: function () {
                alert('통신실패!!!!');
            },
            success: function (result) {
                $(c).children('.result-img').attr('src', result.data[0].img);
                $(c).children('.result-title').append(result.data[0].title);
                $(c).children('.result-href').attr('href', result.data[0].link);
                $(c).children('.result-address').append(result.data[0].address);
                var s = result.data[0].category;
                $(s).each(function (index, item) {
                    $(c)
                        .children('.result-category')
                        .append(item + ' ');
                });
                var s2 = result.data[0].tags;
                $(s2).each(function (index, item) {
                    $(c)
                        .children('.result-tags')
                        .append('"' + item + '" ');
                });
                COURSE.appendChild(c);
            },
        });
        //]]>
    });
    $('.drink').click(function () {
        let c = makingCourse();
        url = url + location + '주점';
        //<![CDATA[
        $.ajax({
            url: 'http://59.6.42.102:8080/api/random/test',
            //데이터전송및요청할URL 주소 -> 변수 url의 값으로 교체 예정
            type: 'GET',
            dataType: 'JSON',

            error: function () {
                alert('통신실패!!!!');
            },
            success: function (result) {
                $(c).children('.result-img').attr('src', result.data[0].img);
                $(c).children('.result-title').append(result.data[0].title);
                $(c).children('.result-href').attr('href', result.data[0].link);
                $(c).children('.result-address').append(result.data[0].address);
                var s = result.data[0].category;
                $(s).each(function (index, item) {
                    $(c)
                        .children('.result-category')
                        .append(item + ' ');
                });
                var s2 = result.data[0].tags;
                $(s2).each(function (index, item) {
                    $(c)
                        .children('.result-tags')
                        .append('"' + item + '" ');
                });
                COURSE.appendChild(c);
            },
        });
        //]]>
    });
    $('.play').click(function () {
        let c = makingCourse();
        url = url + location + '놀기';
        //<![CDATA[
        $.ajax({
            url: 'http://59.6.42.102:8080/api/random/test',
            //데이터전송및요청할URL 주소 -> 변수 url의 값으로 교체 예정
            type: 'GET',
            dataType: 'JSON',

            error: function () {
                alert('통신실패!!!!');
            },
            success: function (result) {
                $(c).children('.result-img').attr('src', result.data[0].img);
                $(c).children('.result-title').append(result.data[0].title);
                $(c).children('.result-href').attr('href', result.data[0].link);
                $(c).children('.result-address').append(result.data[0].address);
                var s = result.data[0].category;
                $(s).each(function (index, item) {
                    $(c)
                        .children('.result-category')
                        .append(item + ' ');
                });
                var s2 = result.data[0].tags;
                $(s2).each(function (index, item) {
                    $(c)
                        .children('.result-tags')
                        .append('"' + item + '" ');
                });
                COURSE.appendChild(c);
            },
        });
        //]]>
    });
    //카드 하나 지우기
    $('.delete').click(function () {
        $(this).parent().remove();
    });

    //reload 하기
    $('.re-load').click(function () {
        var box = $(this).parents('.course-result');
        box.remove();
    });








    
});
