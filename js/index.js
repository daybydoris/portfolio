'use strict';


function index() {
    //----------------------------
    // 1. particle.js
    //----------------------------

    particlesJS.load('particles-js', 'particlesjs-config.json', function () {
        console.log('callback - particles.js config loaded');
    });

    //-----------------------------
    // 2. scrolldown 아이콘 애니메이션
    //-----------------------------

    setInterval(lineActive, 2000);

    function lineActive() {
        const lineWrap = document.querySelector('.line-wrap');
        const srcollLine = document.querySelector('.line');

        srcollLine.style = "top:0%; opacity:0.5;";
        setTimeout(function () {
            srcollLine.style = "top:100%";
        }, 1000);
        setTimeout(function () {
            srcollLine.style = "top:100%; opacity:0;";
        }, 1400);
        setTimeout(function () {
            srcollLine.style = "top:-110%; opacity:0;";
        }, 1800);
    }


    //-------------------------------
    // 3. article PROJECT (AJAX 통신)
    //-------------------------------

    $.ajax({
        url: "project.json",
        type: "GET",
        success: function (data) {

            const slider = document.querySelector('.slider');

            data.project.forEach(function (p) {

                //-------------------------------
                // 3-1. SLIDER 콘텐츠  넣기
                //-------------------------------

                //slider-con
                let sliderCon = document.createElement('div');

                //img-box
                let imgBox = document.createElement('div');
                let aTag = document.createElement('a');
                let img = document.createElement('img');
                let thumb = p.thumb;

                //svg-box
                let svgBox = document.createElement('div');
                let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');

                imgBox.classList = "img-box";
                img.setAttribute('src', thumb);

                aTag.id = p.num;
                aTag.setAttribute('href', '/portfolio/pages/project-detail.html');

                imgBox.appendChild(img);

                text.setAttribute('x', '50%');
                text.setAttribute('y', '80%');
                text.setAttribute('text-anchor', 'middle');
                text.textContent = p.title + ".";
                text.classList = "title";

                svg.setAttribute('width', '100%');
                svg.setAttribute('height', '120');
                svg.setAttribute('viewbox', '0 0 100% 120');

                svgBox.classList = "svg-box atvBtn locate";

                svg.appendChild(text);
                svgBox.appendChild(svg);

                aTag.appendChild(imgBox);
                aTag.appendChild(svgBox);

                sliderCon.classList = "slider-con";
                sliderCon.appendChild(aTag);

                slider.appendChild(sliderCon);

            });

            $('.svg-box').on('click', saveProjectId);

            //-------------------------
            // 3-2. 게시글 넘버값 저장
            //-------------------------

            function saveProjectId(e) {
                e.preventDefault();

                let projectId = e.target.closest('a').id;
                localStorage.setItem('num', projectId);
            }

            //-----------------------------
            // 3-3. slick
            //-----------------------------

            $(".slider").slick({
                slidesToShow: 1,
                autoplay: true,
                autoplaySpeed: 2000,
                centerMode: true,
                arrows: true,
                rtl: false,
                draggable: true
            });
            $(".slider").on('beforeChange', function () {
                $(".slider").addClass('active');
            })
            $(".slider").on('afterChange', function () {
                setTimeout(function () { $(".slider").removeClass('active'); }, 100);
            })

        }
    });

    console.log('index');
}

export default index;