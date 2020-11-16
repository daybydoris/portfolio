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

            //키 설정 해야함 (localStorage로 받아서)
            data.project.forEach(function (p, k) {

                createIndexTxt();
                projectName();
                projectTime();
                createDemo();
                createIntro();
                createPagePrev();
                createUsedSkill();
                createRes();

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
                    demoBtn.setAttribute("target","_blank");
                    demoBtn.className = "detail-btn atvBtn locate";

                    circle.setAttribute("href", p.siteUrl);
                    circle.className = "circle atvBtn locate";

                    demo.appendChild(demoBtn);
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

                        pagePrevList.appendChild(pagePrevItem);
                    });
                }

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

                }

            });

        }
    });


    //end
});