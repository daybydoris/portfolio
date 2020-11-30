"use strict";

window.addEventListener('DOMContentLoaded', function () {


    $.ajax({
        url: "../project.json",
        type: "GET",
        success: function (data) {

            data.project.forEach(function (p, key) {

                //createElement

                let projectList = document.querySelector('.project-list'),
                    projectItem = document.createElement('li'),

                    thumb = document.createElement('div'),
                    aTag = document.createElement('a'),
                    thumbImg = document.createElement('img'),

                    projectPrev = document.createElement('div'),
                    svgBox = document.createElement('div'),
                    titleSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),

                    responsive = document.createElement('div'),

                    prevText = document.createElement('p');

                // classList 및 setAttribute

                //thumb
                thumbImg.setAttribute('src', '../' + p.thumb);

                aTag.href = 'project-detail.html';
                aTag.id = key;
                aTag.classList = "atvBtn locate";

                thumb.classList = "thumb";

                aTag.appendChild(thumbImg);
                thumb.appendChild(aTag);

                //svgBox
                titleSvg.innerHTML = p.mobileTitle + p.pcTitle;
                titleSvg.classList = "title-svg";

                svgBox.classList = "svg-box";

                projectPrev.classList = "project-prev";

                svgBox.appendChild(titleSvg);
                projectPrev.appendChild(svgBox);

                //responsive

                let pc = document.createElement('p'),
                    tablet = document.createElement('p'),
                    mobile = document.createElement('p'),
                    slash1 = document.createElement('span'),
                    slash2 = document.createElement('span');

                pc.id = "pc",
                    tablet.id = "tablet",
                    mobile.id = "mobile";

                pc.textContent = "PC";
                tablet.textContent = "Tablet";
                mobile.textContent = "Mobile";
                slash1.textContent = "/";
                slash2.textContent = "/";

                responsive.appendChild(pc);
                responsive.appendChild(slash1);
                responsive.appendChild(tablet);
                responsive.appendChild(slash2);
                responsive.appendChild(mobile);

                responsive.classList = "responsive";

                projectPrev.appendChild(responsive);


                setTimeout(function () {

                    if (p.isResponsive == false) {
                        pc.style.color = "#202020";
                        tablet.style.color = "#202020";
                        mobile.style.color = "#202020";
                    } else {
                        pc.style.color = "#99785F";
                        tablet.style.color = "#99785F";
                        mobile.style.color = "#99785F";
                    }
                }, 500);

                //prev-text

                prevText.textContent = p.prevTxt;
                prevText.classList = "prev-txt";
                projectPrev.appendChild(prevText);

                function isOdd(num) { return num % 2; }

                if (isOdd(key) == 0) {
                    projectItem.classList = "project-item odd";
                } else {
                    projectItem.classList = "project-item even";
                }
                projectItem.appendChild(thumb);
                projectItem.appendChild(projectPrev);
                projectItem.setAttribute('data-aos', 'fade-up');

                if (key == 0) {
                    projectItem.setAttribute('data-aos-delay', '500');
                } else {
                    projectItem.setAttribute('data-aos-offset', '500');
                }

                projectList.appendChild(projectItem);


            });

            setTimeout(function () {
                const projectItem = document.querySelectorAll('.thumb a');
                const thumb = document.querySelectorAll('.thumb');
                const body = document.querySelector('body');
                const projectPrev = document.querySelectorAll('.project-prev');

                thumb.forEach(function (t) {
                    t.addEventListener('mousemove', thumbMove);
                    t.addEventListener('mouseout', thumbStop);
                    t.addEventListener('click', thumbStop);
                    t.addEventListener('click', saveProjectId);

                    //-----------------------
                    //게시글 넘버값 저장
                    //-----------------------

                    function saveProjectId(e) {
                        e.preventDefault();

                        let projectId = e.target.closest('a').id;
                        localStorage.setItem('num', projectId);
                    }

                    //-----------------------
                    // 페이지 전환 효과
                    //-----------------------

                    //스크롤 막기/허용
                    function stopScroll() {
                        body.classList.add("stopScroll");
                    }
                    function allowScroll() {
                        body.classList.remove("stopScroll");
                    }


                    //-----------------------
                    // 마우스 오버 효과
                    //-----------------------

                    function thumbMove(e) {
                        let halfW = (this.offsetWidth / 2);
                        let halfH = (this.offsetHeight / 2);

                        let coorX = (halfW - (e.pageX - this.offsetLeft));
                        let coorY = (halfH - (e.pageY - this.offsetTop));

                        let degX = ((coorY / halfH) * 15) + 'deg';
                        let degY = ((coorX / halfW) * -15) + 'deg';

                        this.style = "transform: perspective(1500px) translate3d(0, 0px, 0) rotateX(" + degX + ") rotateY(" + degY + ");";
                    }

                    function thumbStop() {
                        this.style = 'transform:rotate(0)';
                    }



                });
            }, 500);

        }


    });


});