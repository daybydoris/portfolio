'use strict';

window.addEventListener('DOMContentLoaded',function(){

    $("header").load("/portfolio/inc_head_foot.html header .h_container", init);

    function init(){
        

    
        const body = document.querySelector('body');
        const article = document.querySelector('article');

        const logo = document.querySelectorAll('.logo text');
        const menuTrigger = document.querySelector('.menu-trigger');
        const triggerSpan = document.querySelectorAll('.menu-trigger span');
        const nav = document.querySelector('nav');
        const navWrap = document.querySelector('.nav-wrap');

        const cursorPointer = document.querySelector('.cursor');
        let aTag = document.querySelectorAll('.atvBtn');


        let filename = location.pathname;

        headerColor(logo);
        headerColor(triggerSpan);

        function headerColor(name){
            console.log(filename);
            if(filename == '/portfolio/index.html'){
                window.addEventListener('scroll',function(){
                    if(window.scrollY > 1000){
                        changeColor('#fff');
                    }else{
                        changeColor('#151515');
                    }
                });    
            }else{
                if(article.classList.contains('bg-black')){
                    changeColor('#fff');
                }else{
                    changeColor('#151515');
                }
            }

            function changeColor(color){
                name.forEach(function(l){
                    if(l.tagName == 'text'){
                        l.style = `fill:${color}`;
                    }else{
                        l.style = `background:${color}`;
                    }
                });
            }
        }

        document.addEventListener('mousemove',cursorPos);

        //커서 따라다니는 원
        function cursorPos(e){
            let cursorX = e.pageX;
            let cursorY = e.pageY;
            let pointerW = cursorPointer.offsetWidth/2;
            let pointerH = cursorPointer.offsetHeight/2;
            
            window.addEventListener('scroll',function(){
                let scrollY = window.scrollY;
            });

            cursorPointer.style = "left:"+ (cursorX - pointerW) + "px; top:"+ (cursorY - pointerH - scrollY) + "px;";
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


    }


    
    
    // setTimeout(function(){
    //     

    //     //버튼 hover시 원 커지게 하기
    //     aTag.forEach(function(a){
    //         a.addEventListener('mouseover',function(){
    //             cursorPointer.classList.add('active');
    //         });
    //         a.addEventListener('mouseleave',function(){
    //             cursorPointer.classList.remove('active');
    //         });
    //     });

    //     menuTrigger.addEventListener('click',function(){
    //         //menuTrigger 클릭하면 모양 변형
    //         menuTrigger.classList.toggle('active');

    //         //menu-trigger 클릭하면 nav 나오게 하기
    //         if(menuTrigger.classList.contains('active')){
    //             navWrap.style.transition = "1s";
    //             navWrap.style.transform = "scale(1)";
    //             setTimeout(function(){
    //                 nav.classList.add('active');
    //             },800);
    //         }else{
    //             nav.classList.remove('active');
    //             setTimeout(function(){
    //                 navWrap.style.transform = "scale(0)";
    //             },300);
    //         }

            
    //     });

    // },800);


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
