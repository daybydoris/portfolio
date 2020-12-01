import 'babel-polyfill';
import common from './common.js';
import index from './index.js';
import project from './project.js';
import projectDetail from './project-detail.js';

function init() {
    common();

    var pageName = location.pathname;

    switch (pageName) {
        case '/portfolio/': index(); break;
        case '/portfolio/index.html': index(); break;
        case '/portfolio/pages/about.html': about(); break;
        case '/portfolio/pages/project.html': project(); break;
        case '/portfolio/pages/project-detail.html': projectDetail(); break;
    }

}
window.addEventListener('DOMContentLoaded', init);