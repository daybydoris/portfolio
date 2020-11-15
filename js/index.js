'use strict';

window.addEventListener('DOMContentLoaded',function(){

    setInterval(lineActive,2000);

    //scrolldown 아이콘 애니메이션
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


});