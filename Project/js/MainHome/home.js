$(document).ready(function () {
    $('.add_slide').bxSlider({
        //bXSlider 사용
        auto: true, // 자동으로 애니메이션 시작
        speed: 750, // 애니메이션 속도
        pause: 1500, // 애니메이션 유지 시간 (1000은 1초)
        mode: 'fade', // 슬라이드 모드
        pager: false, // 페이지 표시 사라짐
        captions: false, // 이미지 위에 텍스트 없음
        controls: true, // 슬라이더 위 컨트롤 표시
    });
});
