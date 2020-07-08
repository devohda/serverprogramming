//url 만들기(api 가져오기)
let url = 'http://localhost:8080/api/random/pick?keyword='; //ajax url 요청하기 위한 변수
let loca = ''; //장소 입력 받은 것 url에 추가하기 위한 변수
let foodText = ['한식', '중식', '일식', '분식', '양식']; //음식점 종류
let randomText = ['피씨방', '노래방', '당구장', '방탈출', '공원', '공방', '클럽', '보드게임']; //놀기 종류
i = 0;

function getRandomInt(min, max) {
    //max~min까지 랜덤으로 정수값 주는 함수.
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(document).ready(function () {
    // 지역 + 카테고리 클릭시 함수

    //음식점 카페 주점 놀기 중 하나 선택시 div 만들기위한 함수.

    const COURSE = document.querySelector('.course-area'); //div 추가할 위치

    //classList.add()로 class추가하고 appendChild로 만든 요소에 자식요소로 추가하는 방식 사용.
    function makingCourse() {
        const course_result = document.createElement('div'); //course_result = <div class="course-result scale in center"></div>
        course_result.classList.add('course-result');
        course_result.classList.add('scale-in-center'); //애니메이션 적용을 위한 class 추가

        const result_img = document.createElement('img'); //result_img = <img class="result-img">
        result_img.classList.add('result-img');

        const course = document.createElement('div'); //course = <div class="course"></div>
        course.classList.add('course');

        const result_title = document.createElement('p'); //result_title = <p class="result-title"></p>
        result_title.classList.add('result-title');
        const result_href = document.createElement('a'); //result_href = <a class="result-href">상세보기</a>
        result_href.classList.add('result-href');
        result_href.innerText = '상세보기';

        const result_content = document.createElement('div'); //result_content = <div class="result-content"> </div>
        result_content.classList.add('result-content');

        const result_address = document.createElement('p'); //result_address = <p class="result-address"></p>
        const result_category = document.createElement('p'); //result_category = <p class="result-category"></p>
        const result_tags = document.createElement('div'); //result_tags = <div class="result-tags"></div>

        result_address.classList.add('result-address');
        result_category.classList.add('result-category');
        result_tags.classList.add('result-tags');

        result_content.appendChild(result_address);
        result_content.appendChild(result_category);
        result_content.appendChild(result_tags);

        /* 
        <div class="result-content"> 
            <p class="result-address"></p>
            <p class="result-category"></p>
            <div class="result-tags"></div>
        </div>
        */

        const re_load = document.createElement('button'); //re_load = <button class="re-load">다시 뽑기</button>
        re_load.classList.add('re-load');
        re_load.innerText = '다시 뽑기';

        course.appendChild(result_title);
        course.appendChild(result_content);
        course.appendChild(result_href);
        course.appendChild(re_load);

        /*
        <div class="course">
            <p class="result-title"></p>
            <div class="result-content"> 
                <p class="result-address"></p>
                <p class="result-category"></p>
                <div class="result-tags"></div>
            </div>
            <a class="result-href">상세보기</a>
            <button class="re-load">다시 뽑기</button>
        </div>
        */

        const del = document.createElement('img'); //del = <img class="delete" src="../../src/Random/delete.png">
        del.classList.add('delete');
        del.setAttribute('src', '../../src/Random/delete.png');

        course_result.appendChild(result_img);
        course_result.appendChild(course);
        course_result.appendChild(del);

        /*
        <div class="course-result scale in center">
            <img class="result-img">
            <div class="course">
                <p class="result-title"></p>
                <div class="result-content"> 
                    <p class="result-address"></p>
                    <p class="result-category"></p>
                    <div class="result-tags"></div>
                </div>
                <a class="result-href">상세보기</a>
                <button class="re-load">다시 뽑기</button>
            </div>
            <img class="delete" src="../../src/Random/delete.png">
        </div>
         */

        return course_result; //만들어진 course-_result 반환!
    }

    // 지역 검색어 받기
    $('input').on('change', function () {
        loca = $(this).val();
    });
    $('#search-button').click(function () {
        loca = $('input').val();
    });

    //각 버튼 눌렀을 때

    $('.food').click(function food() {
        let c = makingCourse(); //makingCourse함수 실행으로 정보 넣을 div생성
        COURSE.appendChild(c); //html에 추가
        c.classList.add('foodbox');
        //loader 생성
        let dom1 = `<div class="loader"> 
                <div class="loader-inner ball-pulse-sync">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <span> <p>불러오는 중</p></span>
            </div>`;
        $(c).find('.course').append(dom1); //loader 추가 - loading 완료되면 사라지게 됨.
        //<![CDATA[
        $.ajax({
            url: `${url}${loca} ${foodText[getRandomInt(0, 4)]}`,
            type: 'GET',
            dataType: 'JSON',

            error: function () {
                alert('다시 뽑기를 눌러 주세요');
                $(c).find('.loader').remove(); // loader 제거
                $(c).css('height', '10rem');
            },
            success: function (result) {
                $(c).find('.loader').remove(); // loader 제거

                //내용 채우기
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
        //loader 생성
        let dom1 = `<div class="loader"> 
                <div class="loader-inner ball-pulse-sync">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <span> <p>불러오는 중</p></span>
            </div>`;
        $(c).find('.course').append(dom1); //loader 추가 - loading 완료되면 사라지게 됨.
        //<![CDATA[
        $.ajax({
            url: `${url}${loca} 카페`,
            type: 'GET',
            dataType: 'JSON',

            error: function () {
                alert('다시 뽑기를 눌러 주세요');
                $(c).find('.loader').remove(); // loader 제거
                $(c).css('height', '10rem');
            },
            success: function (result) {
                $(c).find('.loader').remove(); // loader 제거

                //내용 채우기
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
    $('.drink').click(function () {
        let c = makingCourse();
        COURSE.appendChild(c);
        c.classList.add('drinkbox');
        //loader 생성
        let dom1 = `<div class="loader"> 
                <div class="loader-inner ball-pulse-sync">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <span> <p>불러오는 중</p></span>
            </div>`;
        $(c).find('.course').append(dom1); //loader 추가 - loading 완료되면 사라지게 됨.
        //<![CDATA[
        $.ajax({
            url: `${url}${loca} 술집`,
            type: 'GET',
            dataType: 'JSON',

            error: function () {
                alert('다시 뽑기를 눌러 주세요');
                $(c).find('.loader').remove(); // loader 제거
                $(c).css('height', '10rem');
            },
            success: function (result) {
                $(c).find('.loader').remove(); // loader 제거

                //내용 채우기
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
    $('.play').click(function () {
        let c = makingCourse();
        COURSE.appendChild(c);
        c.classList.add('playbox');
        //loader 생성
        let dom1 = `<div class="loader"> 
                <div class="loader-inner ball-pulse-sync">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <span> <p>불러오는 중</p></span>
            </div>`;
        $(c).find('.course').append(dom1); //loader 추가 - loading 완료되면 사라지게 됨.
        //<![CDATA[
        $.ajax({
            url: `${url}${loca} ${randomText[getRandomInt(0, 7)]}`,
            type: 'GET',
            dataType: 'JSON',

            error: function () {
                alert('다시 뽑기를 눌러 주세요');
                $(c).find('.loader').remove(); // loader 제거
                $(c).css('height', '10rem');
            },
            success: function (result) {
                $(c).find('.loader').remove(); // loader 제거

                //내용 채우기
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
});

$(document).on('click', '.delete', function () {
    let c = $(this).parent();
    c.remove();
});

//다시 뽑기를 눌렀을 때
$(document).on('click', '.re-load', function () {
    let c = $(this).parents('.course-result'); //다시뽑기 한 카드의 정보를 재로딩
    let newUrl = url;
    let dom1 = `<div class="loader"> 
                <div class="loader-inner ball-pulse-sync">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <span> <p>불러오는 중</p></span>
            </div>`;
    $(c).find('.course').append(dom1); //loader 추가 - loading 완료되면 사라지게 됨.

    //카드의 종류에 따라 url 지정.
    if ($(c).hasClass('foodbox') === true) {
        newUrl = newUrl + loca + ' ' + foodText[getRandomInt(0, 4)];
    }
    if ($(c).hasClass('cafebox') === true) {
        newUrl = newUrl + loca + ' 카페';
    }
    if ($(c).hasClass('drinkbox') === true) {
        newUrl = newUrl + loca + ' 주점';
    }
    if ($(c).hasClass('playbox') === true) {
        newUrl = newUrl + loca + ' ' + randomText[getRandomInt(0, 7)];
    }
    //<![CDATA[
    $.ajax({
        url: `${newUrl}`,
        type: 'GET',
        dataType: 'JSON',
        error: function () {
            alert('다시 뽑기를 눌러 주세요');
            $(c).find('.loader').remove(); // loader 제거
            $(c).css('height', '10rem');
        },
        success: function (result) {
            $(c).find('.loader').remove(); // loader 제거

            $(c).children('.result-img').attr('src', result.data[0].img);
            $(c).find('.result-title').text(result.data[0].title);
            $(c).find('.result-href').attr('href', result.data[0].link);
            $(c).find('.result-href').attr('target', '_blank');
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
    //]]>
});

//전체 다시 뽑기 버튼을 눌렀을 때
$(document).on('click', '#all-re-load', function () {
    let resultAll = $('.course-result');
    let newUrl = url;
    let dom1 = `<div class="loader"> 
                <div class="loader-inner ball-pulse-sync">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <span> <p>불러오는 중</p></span>
            </div>`;
    $(resultAll).each(function (index, item) {
        let c = item;
        let newUrl;
        //각각의 카드의 종류에 따라 url 지정
        if ($(c).hasClass('foodbox') === true) {
            newUrl = url + loca + ' 음식점' + ' ' + foodText[getRandomInt(0, 4)];
        }
        if ($(c).hasClass('cafebox') === true) {
            newUrl = url + loca + ' 카페';
        }
        if ($(c).hasClass('drinkbox') === true) {
            newUrl = url + loca + ' 술집';
        }
        if ($(c).hasClass('playbox') === true) {
            newUrl = url + loca + ' ' + randomText[getRandomInt(0, 7)];
        }

        $(c).find('.course').append(dom1); //loader 추가 - loading 완료되면 사라지게 됨.
        //<![CDATA[
        $.ajax({
            url: `${newUrl}`,
            type: 'GET',
            dataType: 'JSON',

            error: function () {
                alert('다시 뽑기를 눌러 주세요');
                $(c).find('.loader').remove(); // loader 제거
                $(c).css('height', '10rem');
            },
            success: function (result) {
                $(c).find('.loader').remove(); // loader 제거

                //정보 새로 담기
                $(c).children('.result-img').attr('src', result.data[0].img);
                $(c).find('.result-title').text(result.data[0].title);
                $(c).find('.result-href').attr('href', result.data[0].link);
                $(c).find('.result-href').attr('target', '_blank');
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
        //]]>
    });
});
