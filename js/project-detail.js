"use strict";

$(function () {
    //start

    $.ajax({
        url: "../project.json",
        type: "GET",
        success: function (data) {

            const article = document.querySelector('article.project-detail');
            const listBack = document.querySelector('.listBack');
            const indexTxt = document.querySelector('.index-txt');
            const topTitle = document.querySelector('.top-title');
            const topTime = document.querySelector('.top-time');
            const demo = document.querySelector('.demo');
            const overall = document.querySelector('.top-overall');
            const feature = document.querySelector('.feature');

            const pagePrevOrig = document.querySelector('.page-prev-orig');

            //prev/next
            const prev = document.querySelector('.prev');
            const next = document.querySelector('.next');

            prev.addEventListener('click', funPrevNext);
            next.addEventListener('click', funPrevNext);

            function funPrevNext(e) {
                e.preventDefault();
                let numNow = localStorage.getItem('num');

                if (e.target.closest('div').classList.contains('prev')) {
                    if (numNow > 0) {
                        numNow--;
                        localStorage.setItem('num', numNow);
                        location.href = 'project-detail.html';
                    } else {
                        alert('첫 게시글입니다.');
                    }
                } else {
                    console.log(numNow);
                    if (numNow < data.project.length - 1) {
                        numNow++;
                        localStorage.setItem('num', numNow);
                        location.href = 'project-detail.html';
                    } else {
                        alert('마지막 게시글입니다.');
                    }
                }
            }



            //키 설정 해야함 (localStorage로 받아서)
            data.project.forEach(function (p) {
                if (p.num == localStorage.getItem('num')) {

                    createIndexTxt();
                    projectName();
                    projectTime();
                    createDemo();
                    createIntro();
                    createPagePrev();
                    createUsedSkill();
                    createRes();
                    createFeature();
                    // createPagePrevOrig();

                    function createIndexTxt() {
                        const front = document.createElement('div');
                        const txtBack = document.createElement('span');

                        txtBack.textContent = p.title + ".";
                        txtBack.className = "txt-back";

                        front.textContent = p.title + ".";
                        front.className = "front";

                        front.appendChild(txtBack);

                        indexTxt.appendChild(front);
                    }

                    function projectName() {
                        const name = document.createElement('p');

                        name.textContent = p.title;

                        topTitle.appendChild(name);
                    }

                    function projectTime() {
                        const time = document.querySelector('p');

                        time.textContent = p.elapsed;

                        topTime.appendChild(time);
                    }

                    function createDemo() {
                        const demoBtn = document.createElement('a');
                        const circle = document.createElement('a');

                        demoBtn.textContent = "웹사이트 방문하기";
                        demoBtn.setAttribute("href", p.siteUrl);
                        demoBtn.setAttribute("target", "_blank");
                        demoBtn.classList = "detail-btn atvBtn"

                        circle.setAttribute("href", p.siteUrl);
                        circle.classList = "circle atvBtn";

                        demo.appendChild(demoBtn);
                        demo.appendChild(circle);
                    }

                    function createIntro() {
                        const overallDetail = document.createElement('p');

                        overallDetail.innerHTML = p.intro;

                        overall.appendChild(overallDetail);
                    }

                    function createPagePrev() {
                        const pagePrevList = document.querySelector('.page-prev-list');

                        p.prevImg.forEach(function (img, key) {
                            const pagePrevItem = document.createElement('li');
                            const pagePrevImg = document.createElement('img');

                            pagePrevImg.setAttribute('src', img);
                            pagePrevItem.appendChild(pagePrevImg);
                            pagePrevItem.className = "page-prev-item";
                            pagePrevItem.setAttribute('data-num', key);

                            pagePrevList.appendChild(pagePrevItem);
                        });
                    }

                    // function createPagePrevOrig() {

                    //     const origList = document.createElement('ul');

                    //     p.origImg.forEach(function (orig, key) {
                    //         const origItem = document.createElement('li');
                    //         const origCon = document.createElement('img');

                    //         origCon.setAttribute('src', orig);
                    //         origCon.style.width = `${window.innerWidth * 0.7}px`;
                    //         origItem.appendChild(origCon);
                    //         origItem.setAttribute('data-num', key);
                    //         origItem.classList.add('hidden');

                    //         origList.appendChild(origItem);
                    //     });

                    //     pagePrevOrig.appendChild(origList);
                    //     pagePrevOrig.classList.add('hidden');

                    // }

                    function createUsedSkill() {
                        const skillList = document.querySelector('.skill-list');

                        p.usedSkill.forEach(function (skill) {
                            const skillItem = document.createElement('li');
                            const skillImg = document.createElement('img');
                            const skillName = document.createElement('span');

                            skillImg.setAttribute('src', `../img/about-icon-${skill}.png`);

                            skillName.textContent = skill;

                            skillItem.className = "skill-item";
                            skillItem.appendChild(skillImg);
                            skillItem.appendChild(skillName);

                            skillList.appendChild(skillItem);
                        });
                    }

                    function createRes() {
                        if (p.isResponsive == true) {
                            const resDetail = document.querySelector('.res-detail .inner');
                            const lastPx = resDetail.querySelector('span');

                            for (var key in p.responsiveType) {
                                const resolution = document.createElement('span');
                                const type = document.createElement('span');

                                type.id = key;
                                type.textContent = key;

                                resolution.textContent = `${p.responsiveType[key]}px`;

                                resDetail.insertBefore(resolution, lastPx);
                                resDetail.insertBefore(type, lastPx);
                            }
                        } else {
                            const res = document.querySelector('.res-detail');
                            const skillList = document.querySelector('.skill-list');

                            res.remove();
                            skillList.style = "width:100%; flex-wrap:nowrap;";
                        }
                    }

                    function createFeature() {
                        const featCon = p.features;

                        feature.innerHTML = p.features;
                    }



                    //중점 구현 기능 Tab 이동
                    $(".tab a").on("click", function (e) {
                        e.preventDefault();//이벤트의 기본동작을 막는다.
                        var thisTarget = $(this).attr("href");
                        $(window).scrollTop($('#' + thisTarget).offset().top);
                    });

                }
            });

            //---------------------
            // original img
            //---------------------
            // const pagePrevItem = document.querySelectorAll('.page-prev-item');

            // pagePrevItem.forEach(function (item) {
            //     item.addEventListener('click', origPopup);

            //     function origPopup() {
            //         const origItem = document.querySelectorAll('.page-prev-orig li');

            //         const prevNum = this.getAttribute('data-num');

            //         origItem.forEach(function (orig) {
            //             const origNum = orig.getAttribute('data-num');
            //             const origBack = document.querySelector('.page-prev-back');
            //             const winH = window.innerHeight / 2;
            //             let scrollY = window.scrollY;

            //             origBack.style = "display: block";
            //             pagePrevOrig.classList.remove('hidden');


            //             if (origNum == prevNum) {
            //                 orig.classList.remove('hidden');
            //                 const origH = orig.offsetHeight / 2;

            //                 pagePrevOrig.style = `top:${winH + scrollY - origH}px;`;

            //                 const popupExit = document.querySelector('.orig-exit');

            //                 popupExit.addEventListener('click', function () {
            //                     orig.classList.add('hidden');
            //                     pagePrevOrig.classList.add('hidden');

            //                 });

            //             } else {
            //                 orig.classList.add('hidden');

            //             }


            //         });

            //     }
            // });

            setTimeout(function () {






                //---------------------
                // tab
                //---------------------


                //tab 위치 잡기
                const tab = document.querySelector('.tab');
                const tabBtn = document.querySelectorAll('.tab a');
                const tabOffsetTop = tab.offsetTop - 20;


                //스크롤 y좌표 잡아서 tab 위치를 넘어서면 fixed
                window.addEventListener('scroll', function () {
                    let scrollY = window.scrollY;

                    if (scrollY >= tabOffsetTop) {
                        tab.classList.add('active');
                    } else {
                        tab.classList.remove('active');
                        tab.style = "";
                    }
                });

                // tab click event

                tabBtn.forEach(function (btn) {
                    btn.addEventListener('click', scrollToTab);


                    function scrollToTab(e) {
                        e.preventDefault();

                        const where = e.target.getAttribute('href');
                        const whereToScroll = document.querySelector(`#${where}`);
                        const offsetTop = whereToScroll.offsetTop - 120;

                        window.scrollTo(0, offsetTop);
                    }
                });


                // tab active




            }, 500);





            //---------------------
            // slick
            //---------------------
            $("li .figure-box").slick({
                slidesToShow: 1,
                autoplay: false,
                centerMode: true,
                arrows: false,
                variableWidth: true,
                dots: true
            });

        }



    });




    //end
});