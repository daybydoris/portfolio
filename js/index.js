'use strict';

window.addEventListener('DOMContentLoaded',function(){

    //----------------------------
    // particle.js
    //----------------------------

    particlesJS.load('particles-js', 'particlesjs-config.json', function() {
        console.log('callback - particles.js config loaded');
      });


    //-----------------------------
    // scrolldown 아이콘 애니메이션
    //-----------------------------

    setInterval(lineActive,2000);

    function lineActive(){
        const lineWrap = document.querySelector('.line-wrap');
        const srcollLine = document.querySelector('.line');

            srcollLine.style = "top:0%; opacity:0.5;";
        setTimeout(function(){
            srcollLine.style = "top:100%";
        },1000);
        setTimeout(function(){
            srcollLine.style = "top:100%; opacity:0;";
        },1400);
        setTimeout(function(){
            srcollLine.style = "top:-110%; opacity:0;";
        },1800);
    }

    

    $.ajax({
        url: "project.json",
        type: "GET",
        success: function (data) {
            
            const slider = document.querySelector('.slider');

            data.project.forEach(function(p){

                //slick content 넣기
                    //slider-con
                    let sliderCon = document.createElement('div');

                    //img-box
                    let imgBox = document.createElement('div');
                    let aTag = document.createElement('a');
                    let img = document.createElement('img');
                    let thumb = p.thumb;

                    //svg-box
                    let svgBox = document.createElement('div');
                    let svg = document.createElement('svg');
                    let text = document.createElement('text');

                    imgBox.className = "img-box";
                    img.setAttribute('src',thumb);

                    aTag.id = p.num;
                    aTag.setAttribute('href','/portfolio/pages/project-detail.html');
                    aTag.classList.add('locate');
                    aTag.classList.add('atvBtn');
                    aTag.appendChild(img);

                    imgBox.appendChild(aTag);

                    text.setAttribute('x','50%');
                    text.setAttribute('y','50%');
                    text.setAttribute('text-anchor','middle');
                    text.textContent = `${p.title}.`;
                    text.classList = "title";

                    svg.setAttribute('width','100%');
                    svg.setAttribute('height','120');
                    svg.setAttribute('viewbox','0 0 100% 120');

                    svgBox.className = "svg-box";

                    svg.appendChild(text);
                    svgBox.appendChild(svg);

                    sliderCon.className = "slider-con";
                    sliderCon.appendChild(imgBox);
                    sliderCon.appendChild(svgBox);

                    slider.appendChild(sliderCon);

            });

            $('.img-box img').on('click', saveProjectId);

            //-----------------------
            //게시글 넘버값 저장
            //-----------------------

            function saveProjectId(e) {
                e.preventDefault();

                let projectId = e.target.closest('a').id;
                localStorage.setItem('num', projectId);
            }

            //-----------------------------
            // slick
            //-----------------------------
            
            $(".slider").slick({
                slidesToShow: 1,
                autoplay: true,
                autoplaySpeed: 2000,
                centerMode: true,
                arrows: false,
                rtl: false,
                variableWidth: true
            });

        }
    });

});