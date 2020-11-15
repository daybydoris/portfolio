'use strict';

window.addEventListener('DOMContentLoaded',function(){

    $("header").load("/portfolio/inc_head_foot.html header .h_container", init);

    function init(){
    
        const body = document.querySelector('body');
        const header = document.querySelector('header');
        const article = document.querySelector('article');

        const logo = document.querySelectorAll('.logo text');
        const menuTrigger = document.querySelector('.menu-trigger');
        const triggerSpan = document.querySelectorAll('.menu-trigger span');
        const menuBtn = document.querySelectorAll('nav .menu');
        

        const cursorPointer = document.querySelector('.cursor');
        let aTag = document.querySelectorAll('.atvBtn');

        const conLabel = document.querySelector('.contact-label');
        const conBox = document.querySelector('.contact-box');
        const conBoxWrap = document.querySelector('.contact-box-wrap');


        let filename = location.pathname;

        headerColor(logo);
        headerColor(triggerSpan);

        //header 색상 변경
        //index.html은 스크롤 이벤트
        //나머지는 article 컬러에 따라서 변경
        function headerColor(name){
            console.log(filename);
            if(filename == '/portfolio/'){
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

            //색상 변경 함수
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


        //menuTrigger 클릭 이벤트
        menuTrigger.addEventListener('click',triggerChange);
        menuTrigger.addEventListener('click',navToggle);


        //menu-trigger 모양 변형
        function triggerChange(){
            menuTrigger.classList.toggle('active');
        }



        //스크롤 막기/허용
        function stopScroll(){
            body.classList.add("stopScroll");
        }
        function allowScroll(){
            body.classList.remove("stopScroll");
        }

        //header 막기
        function blockHeader(){
            header.style.display = 'none';
        }
        function allowHeader(){
            header.style.display = 'block';
        }

        const nav = document.querySelector('nav');
        const navWrap = document.querySelector('.nav-wrap');



        //nav 열기/닫기
        function navToggle(){
            

            if(menuTrigger.classList.contains('active')){

                navWrap.style.transition = "0.7s";
                navWrap.style.transform = "scale(1)";

                stopScroll();
                
                setTimeout(function(){
                    nav.classList.add('active');
                },800);

            }else{

                nav.classList.remove('active');

                allowScroll();

                setTimeout(function(){
                    navWrap.style.transform = "scale(0)";
                },300);
            }
        }

        //nav 메뉴 클릭 후 화면 전환
        menuBtn.forEach(function(a){
            a.addEventListener('click', PageTransition);
        });

        //페이지 이동 이벤트
        function PageTransition(e){
            e.preventDefault();

            nav.classList.remove('active');

                allowScroll();

                setTimeout(function(){
                    navWrap.style.transform = "scale(0)";
                },300);
                setTimeout(function(){
                    location.href = e.target.getAttribute('href');
                },1200);
        }


        //contact
        conLabel.addEventListener('click', contactToggle);

        //contact-box 열기/닫기
        function contactToggle(e){
            e.preventDefault();

            const contact = document.querySelector('.contact');

            if(!contact.classList.contains('active')){

                contact.classList.add('active');

                blockHeader();
                stopScroll();
                
                //label 위치 변경
                setTimeout(function(){
                    conLabel.textContent = 'Close';
                    conLabel.style = 'left:98.5vw';
                },1000);
                
            }else{
                contact.classList.remove('active');
                conLabel.style = 'left:98%';

                allowHeader();
                allowScroll();

                //label 위치 변경
                setTimeout(function(){
                    conLabel.style = 'left:100%';
                    conLabel.textContent = 'Contact';

                },1000);
            }

        }

        

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