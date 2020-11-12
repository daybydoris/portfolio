'use strict';

window.addEventListener('DOMContentLoaded',function(){

    const cursorPointer = document.querySelector('.cursor');
    const aTag = document.querySelectorAll('.atvBtn');
    const menuTrigger = document.querySelector('.menu-trigger');
    const nav = document.querySelector('nav');
    const navWrap = document.querySelector('.nav-wrap');

    document.addEventListener('mousemove',cursorPos);

    //커서 따라다니는 원
    function cursorPos(e){
        let cursorX = e.pageX;
        let cursorY = e.pageY;
        let pointerW = cursorPointer.offsetWidth/2;
        let pointerH = cursorPointer.offsetHeight/2;

        cursorPointer.style = "left:"+ (cursorX - pointerW) + "px; top:"+ (cursorY - pointerH) + "px;";
    }

    //버튼 hover시 원 커지게 하기
    aTag.forEach(function(a){
        a.addEventListener('mouseover',function(){
            cursorPointer.classList.add('active');
        });
        a.addEventListener('mouseleave',function(){
            cursorPointer.classList.remove('active');
        });
    });

    menuTrigger.addEventListener('click',function(){
        //menuTrigger 클릭하면 모양 변형
        menuTrigger.classList.toggle('active');

        //menu-trigger 클릭하면 nav 나오게 하기
        if(menuTrigger.classList.contains('active')){
            navWrap.style.transition = "1s";
            navWrap.style.transform = "scale(70)";
            setTimeout(function(){
                nav.classList.add('active');
            },500);
        }else{
            nav.classList.remove('active');
            setTimeout(function(){
                navWrap.style.transform = "scale(0)";
            },300);
        }

        
    });




    // menuTrigger.addEventListener('click',function(){
    //     menuTrigger.classList.toggle('active');

    //     if(!navCircle.classList.contains('active')){
    //         navCircle.classList.add('active');
    //     }else{
    //         navCircle.classList.remove('active');
    //     }
    //     // setTimeout(function(){
    //     //     nav.classList.toggle('active');
    //     // },500);
    // });

});