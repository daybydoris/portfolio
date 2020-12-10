'use strict';

function common() {

    //-----------------------
    //  브라우저 체크 
    //-----------------------

    var agent = navigator.userAgent.toLowerCase();

    if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)) { // IE 일 경우
        alert('본 포트폴리오 사이트는 IE를 지원하지 않습니다. 크롬, 파이어폭스 등 다른 브라우저를 이용해주세요.');
        location.href = "https://www.google.com/intl/ko/chrome/";
        return;
    }

    //헤더 불러오기
    $("header").load("/portfolio/inc_head_foot.html header .h_container", init);

    function init() {

        //-----------------------------
        // 1. DOM 선택
        //-----------------------------

        const html = document.querySelector('html');
        const body = document.querySelector('body');
        const bodyWrap = document.querySelector('.body-wrap');
        const header = document.querySelector('header');
        const article = document.querySelector('article');

        const logo = document.querySelectorAll('.logo text');
        const menuTrigger = document.querySelector('.menu-trigger');
        const triggerSpan = document.querySelectorAll('.menu-trigger span');
        const menuBtn = document.querySelectorAll('nav .menu a');

        const images = document.querySelectorAll('.disappear');

        const cursorPointer = document.querySelector('.cursor');


        const conLabel = document.querySelector('.contact-label');
        const conBox = document.querySelector('.contact-box');
        const conBoxWrap = document.querySelector('.contact-box-wrap');




        //-----------------------------
        // 2. AOS plugin
        //-----------------------------

        AOS.init({
            duration: "500",
            once: true
        });





        //-----------------------------
        // 3. header color
        //-----------------------------

        let filename = location.pathname;


        //index.html은 스크롤 이벤트
        //나머지는 article 컬러에 따라서 변경

        function headerColor(name) {

            if (filename == '/portfolio/' || filename == '/portfolio/index.html') {

                let indexProject = document.querySelector('article.index-project');
                let projectOffsetTop = indexProject.offsetTop;

                window.addEventListener('scroll', function () {
                    let scrollY = window.scrollY;
                    let changeTiming = projectOffsetTop - scrollY;

                    if (changeTiming <= 0) {
                        changeColor('#fff');
                    } else {
                        changeColor('#151515');
                    }
                });

            } else {
                if (article.classList.contains('bg-black')) {
                    changeColor('#fff');
                } else {
                    changeColor('#151515');
                }
            }

            //색상 변경 함수
            function changeColor(color) {
                name.forEach(function (l) {
                    if (l.tagName == 'text') {
                        l.style = "fill:" + color + ";";
                    } else {
                        l.style = "background:" + color + ";";
                    }
                });
            }
        }

        headerColor(logo);
        headerColor(triggerSpan);


        //-----------------------------
        // 4. 페이지 전환 효과
        //-----------------------------

        setTimeout(function () {
            let locateBtn = document.querySelectorAll('.locate');


            //화면 나타날 때 opacity 서서히 올리기
            $('header').fadeTo(200, 1);
            $('main').fadeTo(500, 1);
            $('.contact-label').fadeTo(100, 1);

            locateBtn.forEach(function (l) {
                l.addEventListener('click', function (e) {
                    e.preventDefault();
                    if (!$(".slider").hasClass('active')) {
                        pageTransition(e);
                    }
                });
            });

            $('.img-box img').mousedown(function (event) {
                event.stopPropagation();
            });

            //페이지 이동
            function pageTransition(e) {

                let pageUrl;

                if (e.target.href == undefined || e.target.href == "") {
                    pageUrl = e.target.closest('a').getAttribute('href');
                } else {
                    pageUrl = e.target.getAttribute('href');
                }

                //배경색 바꾸기

                if (pageUrl.includes('project.html') || pageUrl.includes('project-detail.html')) {
                    body.style.backgroundColor = '#151515';

                } else {
                    html.style.backgroundColor = '#fff';
                    body.style.backgroundColor = '#fff';
                }


                //콘텐츠 서서히 사라지기
                setTimeout(function () {
                    $('header').fadeOut(200);
                    $('main').fadeOut(500);
                    $('.contact-label').fadeOut(200);

                }, 300);


                setTimeout(function () {
                    location.href = pageUrl;
                }, 1000);
            }
        }, 500);



        //--------------------
        // 5. 마우스 커서 효과
        //--------------------
        setTimeout(function () {
            let aTag = document.querySelectorAll('.atvBtn');

            //버튼 hover시 원 커지게 하기
            aTag.forEach(function (a) {
                a.addEventListener('mouseover', function () {
                    cursorPointer.classList.add('active');
                });
                a.addEventListener('mouseleave', function () {
                    cursorPointer.classList.remove('active');
                });
            });
        }, 100);

        document.addEventListener('mousemove', cursorPos);

        function cursorPos(e) {
            let cursorX = e.pageX;
            let cursorY = e.pageY;
            let pointerW = cursorPointer.offsetWidth / 2;
            let pointerH = cursorPointer.offsetHeight / 2;

            window.addEventListener('scroll', function () {
                let scrollY = window.scrollY;
            });

            cursorPointer.style = "left:" + (cursorX - pointerW) + "px; top:" + (cursorY - pointerH - scrollY) + "px;";
        }








        //-----------------------------
        // 6. 트리거 메뉴 및 내비게이션
        //-----------------------------

        const nav = document.querySelector('nav');
        const navWrap = document.querySelector('.nav-wrap');


        //스크롤 막기/허용
        function stopScroll() {
            body.classList.add("stopScroll");
        }
        function allowScroll() {
            body.classList.remove("stopScroll");
        }

        //header 막기
        function blockHeader() {
            header.style.display = 'none';
        }
        function allowHeader() {
            header.style.display = 'block';
        }


        //menuTrigger 클릭 이벤트
        menuTrigger.addEventListener('click', triggerChange);
        menuTrigger.addEventListener('click', navToggle);


        //menu-trigger 모양 변형
        function triggerChange() {
            menuTrigger.classList.toggle('active');
        }


        //-----------------------------
        // 내비게이션
        //-----------------------------

        //nav 열기/닫기
        function navToggle() {

            if (menuTrigger.classList.contains('active')) {
                stopScroll();

                navWrap.style.transition = "0.8s";
                navWrap.style.transform = "scale(1.5)";


                setTimeout(function () {
                    $('nav').fadeTo(100, 1);
                }, 500);

            } else {

                $('nav').fadeTo(100, 0);

                allowScroll();

                setTimeout(function () {
                    navWrap.style.transform = "scale(0)";
                }, 300);
            }
        }

        //nav 메뉴 클릭 후 화면 전환
        menuBtn.forEach(function (a) {
            a.addEventListener('click', navTransition);
        });

        //nav 페이지 이동 이벤트
        function navTransition(e) {
            e.preventDefault();

            let pageUrl;

            if (e.target.href == undefined || e.target.href == "") {
                pageUrl = e.target.closest('a').getAttribute('href');
            } else {
                pageUrl = e.target.getAttribute('href');
            }

            allowScroll();

            //nav 서서히 사라짐
            $('nav').fadeTo(100, 0);

            //navWrap 크기 줄어듦
            setTimeout(function () {
                navWrap.style.transform = "scale(0)";
            }, 150);

            setTimeout(function () {
                //콘텐츠 서서히 사라지기
                $('header').fadeOut(200);
                $('main').fadeOut(500);
                $('.contact-label').fadeOut(200);

                //배경색 바꾸기
                if (pageUrl.includes('project.html') || pageUrl.includes('project-detail.html')) {
                    body.style.backgroundColor = '#151515';

                } else {
                    html.style.backgroundColor = '#fff';
                    body.style.backgroundColor = '#fff';
                }
            }, 700);

            setTimeout(function () {
                location.href = e.target.getAttribute('href');
            }, 1200);
        }



        //-----------------------------
        // 7. CONTACT
        //-----------------------------


        //contact
        conLabel.addEventListener('click', contactToggle);

        //contact-label 색상 변경
        if (filename == '/portfolio/' || filename == '/portfolio/index.html') {
            const winH = window.innerHeight;

            window.addEventListener('scroll', function () {
                let indexProject = document.querySelector('article.index-project');
                let projectOffsetTop = indexProject.offsetTop;
                let scrollY = window.scrollY;
                let changeTiming = projectOffsetTop - scrollY;

                if (changeTiming <= (winH * 0.8)) {
                    conLabel.style.color = "#151515";
                    conLabel.style.backgroundColor = "#fff";
                } else {
                    conLabel.style.color = "#fff";
                    conLabel.style.backgroundColor = "#151515";
                }
            });

        }


        //contact-box 열기/닫기
        function contactToggle(e) {
            e.preventDefault();

            const contact = document.querySelector('.contact');

            //OPEN
            if (!contact.classList.contains('active')) {

                contact.classList.add('active');

                blockHeader();
                stopScroll();

                const winSize = window.matchMedia('(max-width:767px)');

                //label 위치 변경

                conLabel.textContent = 'Close';
                if (conLabel.style.backgroundColor == "rgb(255, 255, 255)") {
                    setTimeout(function () {
                        //반응형 처리
                        if (winSize.matches == true) {
                            //mobile
                            conLabel.style = 'color:#151515; background-color:#fff; left:95%; opacity:1;';
                        } else {
                            //pc
                            conLabel.style = 'color:#151515; background-color:#fff; left:98%; opacity:1;';
                        }
                    }, 300);
                } else {
                    setTimeout(function () {
                        //반응형 처리
                        if (winSize.matches == true) {
                            //mobile
                            conLabel.style = 'left:95%; opacity:1;';
                        } else {
                            //pc
                            conLabel.style = 'left:98%; opacity:1;';
                        }
                    }, 300);
                }
            } else {
                //CLOSE

                contact.classList.remove('active');

                allowHeader();
                allowScroll();


                setTimeout(function () {
                    conLabel.textContent = 'Contact';
                }, 1000);

                //label 위치 변경
                if (conLabel.style.backgroundColor == "rgb(255, 255, 255)") {

                    setTimeout(function () {
                        conLabel.style = 'color:#151515; background-color:#fff; left:100%; opacity:1;';
                    }, 1000);

                } else {

                    setTimeout(function () {
                        conLabel.style = 'left:100%; opacity:1;';
                    }, 1000);

                }



            }

        }


    }

}

export default common;