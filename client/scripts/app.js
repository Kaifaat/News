import '../styles/app';

import {parseCurrentURL} from './helpers/utils.js';

import Header from './views/partials/header.js';
import Footer from './views/partials/footer.js';

import sportPage from './views/pages/sportPage.js';
import investmentsPage from './views/pages/investmentsPage.js';
import technologyPage from './views/pages/technologyPage.js';
import realEstatePage from './views/pages/realEstatePage.js';
import articleInfo from './views/pages/articleInfo.js';
import createArticle from './views/pages/createArticle.js';
import loginPage from './views/pages/loginPage.js';
import registrationPage from './views/pages/registrationPage.js';
import interviewPage from './views/pages/interviewPage.js';


import mainPage from './views/pages/mainPage.js';
import Error404 from './views/pages/error404.js';

const Routes = {
    '/': mainPage,
    '/sport': sportPage,
    '/investments': investmentsPage,
    '/technology': technologyPage,
    '/real-estate': realEstatePage,
    '/article/:id': articleInfo,
    '/createArticle': createArticle,
    '/login': loginPage,
    '/registration': registrationPage,
    '/interview': interviewPage
};

function router() {
    (async() => {
        const headerContainer = document.getElementsByClassName('header-container')[0],
            contentContainer = document.getElementsByClassName('content-container')[0],
            header = new Header();

        const urlParts = parseCurrentURL(),
            pagePath = `/${urlParts.page || ''}${urlParts.id ? '/:id' : ''}${urlParts.action ? `/${urlParts.action}` : ''}`,
            page = Routes[pagePath] ? new Routes[pagePath]() : new Error404();

        headerContainer.innerHTML = await header.render();
        header.afterRender();

        const pageData = await page.getData();
        contentContainer.innerHTML = await page.render(pageData);
        page.afterRender();
    })();
}

(async() => {
    const footerContainer = document.getElementsByClassName('footer-container')[0],
        footer = new Footer();

    footerContainer.innerHTML = await footer.render();
})();

module.hot ? module.hot.accept(router()) : (window.onload = router);
window.onhashchange = router;




