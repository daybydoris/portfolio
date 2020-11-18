"use strict";

window.addEventListener('DOMContentLoaded', function(){

    const projectItem = document.querySelectorAll('.project-item');
    const thumb = document.querySelectorAll('.thumb');

    projectItem.forEach(function(item){
        item.addEventListener('click', saveProjectId);

        function saveProjectId(e){
            e.preventDefault();
            let projectId = e.target.closest('a').id;
            let projectUrl = e.target.closest('a').href;

            localStorage.setItem('num', projectId);

            location.href = projectUrl;
        }
    });

    thumb.forEach(function(t){
        t.addEventListener('mousemove', thumbMove);
        t.addEventListener('mouseout', thumbStop);

        
        // -----------------------
        // 마우스 오버 효과
        // -----------------------
        function thumbMove(e){
            let halfW = (this.offsetWidth / 2);
            let halfH = (this.offsetHeight / 2);

            let coorX = (halfW - (e.pageX - this.offsetLeft));
            let coorY = (halfH - (e.pageY - this.offsetTop));

            let degX = ((coorY / halfH) * 15 ) + 'deg';
            let degY = ((coorX / halfW) * -15 ) + 'deg';

            this.style = `transform: perspective(1500px) translate3d(0, 0px, 0) rotateX(${degX}) rotateY(${degY})`;
        }

        function thumbStop(){
            this.style = `transform:rotate(0)`;
        }
    });
});