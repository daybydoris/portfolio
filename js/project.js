"use strict";

window.addEventListener('DOMContentLoaded', function () {

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

            this.style = `transform: perspective(1500px) translate3d(0, 0px, 0) rotateX(${degX}) rotateY(${degY})`;
        }

        function thumbStop() {
            this.style = 'transform:rotate(0)';
        }

        //-----------------------------
        // 섬네일 클릭 / 페이지 이동 효과
        //-----------------------------



    });
});