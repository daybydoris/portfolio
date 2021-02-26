"use strict";

function projectDetail() {
    //start

    //-----------------------------------------------
    // 1. PROJECT DETAIL 데이터 블러오기 (AJAX 통신)
    //-----------------------------------------------

    $.ajax({
        url: "../project.json",
        type: "GET",
        success: function (data) {

            //-------------------
            // 1-1. DOM 선택
            //-------------------

            const article = document.querySelector('article.project-detail');
            const listBack = document.querySelector('.listBack');
            const indexTxt = document.querySelector('.index-txt');
            const topTitle = document.querySelector('.top-title');
            const topTime = document.querySelector('.top-time');
            const mDemo = document.querySelector('.mDemo');
            const pcDemo = document.querySelector('.pcDemo');
            const overall = document.querySelector('.top-overall');
            const feature = document.querySelector('.feature');
            const prev = document.querySelector('.prev a');
            const next = document.querySelector('.next a');



            //--------------------------
            // 1-2. PREV / NEXT BUTTON
            //--------------------------

            prev.addEventListener('click', funPrevNext);
            next.addEventListener('click', funPrevNext);

            function funPrevNext(e) {
                e.preventDefault();

                let numNow = localStorage.getItem('num');

                //prev
                if (e.target.closest('div').classList.contains('prev')) {
                    if (numNow > 0) {
                        numNow--;
                        localStorage.setItem('num', numNow);
                        location.href = 'project-detail.html';
                    } else {
                        alert('첫 게시글입니다.');
                        return false;
                    }
                } else {

                    //next
                    if (numNow < data.project.length - 1) {
                        numNow++;
                        localStorage.setItem('num', numNow);
                        location.href = 'project-detail.html';
                    } else {
                        alert('마지막 게시글입니다.');
                        return false;
                    }
                }
            }

            //----------------------------
            // 1-3. HTML TAG 추가
            //----------------------------
            //키 설정 해야함 (localStorage로 받아서)
            data.project.forEach(function (p) {
                if (p.num == localStorage.getItem('num')) {

                    createIndexTxt();
                    createMobileDemo();
                    projectName();
                    projectTime();
                    createDemo();
                    createIntro();
                    createPagePrev();
                    createUsedSkill();
                    createRes();
                    createFeature();

                    //타이틀
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

                    //프로젝트 이름
                    function projectName() {
                        const name = document.createElement('p');

                        name.textContent = p.title;

                        topTitle.appendChild(name);
                    }

                    //프로젝트 기간
                    function projectTime() {
                        const time = document.querySelector('p');

                        time.textContent = p.elapsed;

                        topTime.appendChild(time);
                    }

                    //웹사이트 바로가기(모바일)
                    function createMobileDemo() {
                        const mDemoBtn = document.createElement('a');
                        const mCircle = document.createElement('a');

                        mDemoBtn.textContent = "웹사이트 방문하기";
                        mDemoBtn.setAttribute("href", p.siteUrl);
                        mDemoBtn.setAttribute("target", "_blank");
                        mDemoBtn.classList = "detail-btn"

                        mCircle.setAttribute("href", p.siteUrl);
                        mCircle.classList = "circle";


                        mDemo.appendChild(mDemoBtn);
                        mDemo.appendChild(mCircle);
                    }

                    //웹사이트 바로가기(PC)
                    function createDemo() {
                        const demoBtn = document.createElement('a');
                        const circle = document.createElement('a');

                        demoBtn.textContent = "웹사이트 방문하기";
                        demoBtn.setAttribute("href", p.siteUrl);
                        demoBtn.setAttribute("target", "_blank");
                        demoBtn.classList = "detail-btn atvBtn";

                        circle.setAttribute("href", p.siteUrl);
                        circle.classList = "circle atvBtn";

                        pcDemo.appendChild(demoBtn);
                        pcDemo.appendChild(circle);
                    }

                    //프로젝트 개요
                    function createIntro() {
                        const overallDetail = document.createElement('p');

                        overallDetail.innerHTML = p.intro;

                        overall.appendChild(overallDetail);
                    }


                    //프로젝트 미리보기
                    function createPagePrev() {

                        const pagePrevList = document.querySelector('.page-prev-list');

                        if (p.prevImg) {
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
                    }


                    //기술 스택
                    function createUsedSkill() {
                        const skillList = document.querySelector('.skill-list');


                        skillList.innerHTML = p.usedSkill;
                    }

                    //반응형 분기점
                    function createRes() {
                        if (p.isResponsive == true) {
                            const resDetail = document.querySelector('.res-detail .inner');
                            const lastPx = resDetail.querySelector('span');

                            for (var key in p.responsiveType) {
                                const resolution = document.createElement('span');
                                const type = document.createElement('span');

                                type.id = key;
                                type.textContent = key;

                                resolution.textContent = p.responsiveType[key];

                                resDetail.insertBefore(resolution, lastPx);
                                resDetail.insertBefore(type, lastPx);
                            }
                        } else {
                            const res = document.querySelector('.res-detail');
                            const skillList = document.querySelector('.skill-list');

                            res.remove();
                        }
                    }


                    //중점 구현 기능
                    function createFeature() {
                        const featCon = p.features;

                        feature.innerHTML = p.features;
                    }
                }
            });



            setTimeout(function () {

                //---------------------
                // 1-4. tab
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
                        const whereToScroll = document.querySelector('#' + where);
                        const offsetTop = whereToScroll.offsetTop - 120;

                        window.scrollTo(0, offsetTop);

                        //모든 버튼의 active 제거
                        btn.parentNode.childNodes.forEach(function (b) {
                            b.classList.remove('active');
                        });
                        //클릭한 버튼만 active 추가
                        btn.classList.add('active');
                    }
                });
            }, 500);
        }
    });

    //end
}

export default projectDetail;