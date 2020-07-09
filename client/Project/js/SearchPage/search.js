$(document).ready(() => {
    const getUrlParams = () => {
        var params = {};
        window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) {
            params[key] = value;
        });
        return params;
    };
    // 초기화
    const qs = getUrlParams();
    let page = 1;
    let type = '';
    if (qs.type) {
        type = qs.type;
    }
    let dom = '';
    let totalpage;
    let working = false;
    const url = 'http://localhost:8080';

    // select 초기화
    if (qs.type === 'list') {
        $('#search-select').val('list');
        $('#search-method').html("<input id='search-input' placeholder='위치 + 음식점·시설으로 검색!' />");
        $('#search-input').val(decodeURIComponent(qs.keyword));
    } else if (qs.type === 'tour') {
        $('#search-select').val('tour');
        const method = `
                <select id="search-city" class="search-type">
                    <option value="">전국</option>
                    <option value="11">서울특별시</option>
                    <option value="26">부산광역시</option>
                    <option value="27">대구광역시</option>
                    <option value="28">인천광역시</option>
                    <option value="29">광주광역시</option>
                    <option value="30">대전광역시</option>
                    <option value="31">울산광역시</option>
                    <option value="36110">세종시</option>
                    <option value="41">경기도</option>
                    <option value="42">강원도</option>
                    <option value="43">충청북도</option>
                    <option value="44">충청남도</option>
                    <option value="45">전라북도</option>
                    <option value="46">전라남도</option>
                    <option value="47">경상북도</option>
                    <option value="48">경상남도</option>
                    <option value="50">제주도</option>
                </select>
                <select id="search-category" class="search-type">
                    <option value="">전체</option>
                    <option value="A01010100">국립공원</option>
                    <option value="A01010400">산</option>
                    <option value="A01010700">수목원</option>
                    <option value="A01010800">폭포</option>
                    <option value="A01010900">계곡</option>
                    <option value="A01011300">섬</option>
                    <option value="A01011400">항구/포구</option>
                    <option value="A02010600">민속마을</option>
                    <option value="A02010700">유적지/사적지</option>
                    <option value="A02020600">테마공원</option>
                    <option value="A02020700">공원</option>
                    <option value="A02030200">전통체험</option>
                    <option value="A02030400">이색체험</option>
                    <option value="A02060100">박물관</option>
                    <option value="A02060200">기념관</option>
                    <option value="A02060300">전시관</option>
                    <option value="A02060900">도서관</option>
                </select>
                <select id="search-order" class="search-type">
                    <option value="">조회수많은순</option>
                    <option value="review">추천후기많은순</option>
                    <option value="new">최근등록순</option>
                </select>
            `;
        $('#search-method').html($(method));
        $('#search-city').val(qs.city);
        $('#search-category').val(qs.category);
        $('#search-order').val(qs.order);
    } else {
    }
    // select 변경 감지 함수
    $('#search-select').change(function () {
        type = $(this).val();
        if (type === 'list') {
            $('#search-method').html("<input id='search-input' placeholder='위치 + 음식점·시설으로 검색!' />");
        } else if (type === 'tour') {
            const method = `
                <select id="search-city" class="search-type">
                    <option value="">전국</option>
                    <option value="11">서울특별시</option>
                    <option value="26">부산광역시</option>
                    <option value="27">대구광역시</option>
                    <option value="28">인천광역시</option>
                    <option value="29">광주광역시</option>
                    <option value="30">대전광역시</option>
                    <option value="31">울산광역시</option>
                    <option value="36110">세종시</option>
                    <option value="41">경기도</option>
                    <option value="42">강원도</option>
                    <option value="43">충청북도</option>
                    <option value="44">충청남도</option>
                    <option value="45">전라북도</option>
                    <option value="46">전라남도</option>
                    <option value="47">경상북도</option>
                    <option value="48">경상남도</option>
                    <option value="50">제주도</option>
                </select>
                <select id="search-category" class="search-type">
                    <option value="">전체</option>
                    <option value="A01010100">국립공원</option>
                    <option value="A01010400">산</option>
                    <option value="A01010700">수목원</option>
                    <option value="A01010800">폭포</option>
                    <option value="A01010900">계곡</option>
                    <option value="A01011300">섬</option>
                    <option value="A01011400">항구/포구</option>
                    <option value="A02010600">민속마을</option>
                    <option value="A02010700">유적지/사적지</option>
                    <option value="A02020600">테마공원</option>
                    <option value="A02020700">공원</option>
                    <option value="A02030200">전통체험</option>
                    <option value="A02030400">이색체험</option>
                    <option value="A02060100">박물관</option>
                    <option value="A02060200">기념관</option>
                    <option value="A02060300">전시관</option>
                    <option value="A02060900">도서관</option>
                </select>
                <select id="search-order" class="search-type">
                    <option value="">조회수많은순</option>
                    <option value="review">추천후기많은순</option>
                    <option value="new">최근등록순</option>
                </select>
            `;
            $('#search-method').html($(method));
        } else {
        }
    });

    // 검색 결과 출력
    const getPost = () => {
        working = true;
        $('.loader').css('display', 'block');
        $('html, body').animate({ scrollTop: $(document).height() - $(window).height() });
        if (qs.type === 'list') {
            $('#search-info').html(`"${decodeURIComponent(qs.keyword)}" 에 대한 음식점·시설 검색 결과`);
            $.ajax({
                url: `${url}/api/search/list?page=${page}&keyword=${qs.keyword}`,
                method: 'GET',
                dataType: 'JSON',
            })
                .done((resp) => {
                    totalpage = resp.page;
                    resp.data.map((item, index) => {
                        dom = `<div class="card" onClick="window.open('${item.link}')">
                                <div class="card-header" style="background-image: url(${item.img}), url('../../src/searchPage/noimg.gif')">
                                </div>
                                <div class="card-body">
                                    <div>
                                        <span class="body-title">
                                            ${item.title}
                                        </span>
                                        <span class="body-category">
                                            ${
                                                item.category &&
                                                item.category
                                                    .map((ctg) => {
                                                        return `${ctg} `;
                                                    })
                                                    .join('')
                                            }
                                        </span>
                                    </div>
                                    <span class="body-content">${item.content}</span>
                                    <div class="body-tag-box">
                                        ${
                                            item.tags &&
                                            item.tags
                                                .map((tag) => {
                                                    return `<div class="body-content-list-tags">${tag}</div>`;
                                                })
                                                .join('')
                                        }
                                    </div>
                                    <div class="body-review">리뷰 ${item.review}</div>
                                    <div class="body-content-extra">
                                        ${item.address}
                                    </div>
                                </div>
                            </div>
                    `;
                        $('.cardview').append($(dom));
                        $('.loader').css('display', 'none');
                        working = false;
                    });
                })
                .fail((resp) => {
                    dom = "<div class='not-search'>검색 결과가 없습니다.</div>";
                    $('.cardview').append(dom);
                    $('.loader').css('display', 'none');
                    working = false;
                });
        } else if (qs.type === 'tour') {
            $('#search-info').html(`"${decodeURIComponent(qs.keyword)}" 에 대한 관광지 검색 결과`);
            $.ajax({
                url: `${url}/api/search/tour?page=${page}&city=${qs.city}&category=${qs.category}&order=${qs.order}`,
                method: 'GET',
                dataType: 'JSON',
            })
                .done((resp) => {
                    resp.data.map((item, index) => {
                        dom = `<div class="card" onClick="window.open('${item.link}')">
                                <div class="card-header" style="background-image: url(${item.img}), url('../../src/searchPage/noimg.gif')">
                                </div>
                                <div class="card-body">
                                    <div>
                                        <span class="body-title">
                                            ${item.title}
                                        </span>
                                        <span class="body-category">
                                            ${item.category}
                                        </span>
                                    </div>
                                    <span class="body-content">${item.content}</span>
                                    <div class="body-content-extra">
                                        ${item.address}
                                    </div>
                                </div>
                            </div>
                    `;
                        $('.cardview').append($(dom));
                        $('.loader').css('display', 'none');
                        working = false;
                    });
                })
                .fail((resp) => {
                    dom = "<div class='not-search'>검색 결과가 없습니다.</div>";
                    $('.cardview').append(dom);
                    $('.loader').css('display', 'none');
                    working = false;
                });
        } else {
            dom = "<div class='not-search'>검색어를 입력해주세요</div>";
            $('.cardview').html(dom);
            $('.loader').css('display', 'none');
        }
    };
    getPost();

    // 무한스크롤 getPost
    $(window).scroll(() => {
        const scrollHeight = $(window).scrollTop() + $(window).height();
        const documentHeight = $(document).height();

        if (scrollHeight >= documentHeight) {
            if (page * 20 >= totalpage || $('.not-search').length === 1) {
                return;
            }
            if (working) {
                return;
            }
            page += 1;
            getPost();
        }
    });

    // 검색

    const handleSearch = () => {
        if (type === 'list' || type === '') {
            const keyword = $('#search-input').val();
            if (keyword === '') {
                alert('검색어를 입력해주세요.');
                $('#search-input').focus();
                return;
            }
            location.href = `search.html?type=list&keyword=${keyword}`;
        } else {
            const city = $('#search-city').val();
            const category = $('#search-category').val();
            const order = $('#search-order').val();
            location.href = `search.html?type=tour&city=${city}&category=${category}&order=${order}&keyword=${$(
                '#search-city option:checked',
            ).text()}-${$('#search-category option:checked').text()}-${$('#search-order option:checked').text()}`;
        }
    };
    $('#search-button').click(() => {
        handleSearch();
    });
    $(document).on('keypress', '#search-input', (e) => {
        if (e.which === 13) {
            handleSearch();
        }
    });
});
