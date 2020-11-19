'use strict';

window.addEventListener('DOMContentLoaded',function(){

    //----------------------------
    // canvas
    //----------------------------
    const canvas = document.querySelector('canvas');

    let ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(1500, 250, 650, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(1700, 500, 50, 0, 2 * Math.PI);
    ctx.stroke();

    setInterval(lineActive,2000);

    //-----------------------------
    // scrolldown 아이콘 애니메이션
    //-----------------------------
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

    //-----------------------------
    // slick
    //-----------------------------

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
                    let img = document.createElement('img');
                    let thumb = p.thumb;

                    //svg-box
                    let svgBox = document.createElement('div');
                    let svg = document.createElement('svg');
                    let text = document.createElement('text');



                    imgBox.className = "img-box";
                    img.setAttribute('src',thumb);
                    img.className = "atvBtn";

                    imgBox.appendChild(img);

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

                    sliderCon.className = "slider-con locate";
                    sliderCon.appendChild(imgBox);
                    sliderCon.appendChild(svgBox);

                    slider.appendChild(sliderCon);

            });

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