import Component from '../../views/component';

import MainPageTemplate from '../../../templates/pages/mainPage';
import Articles from '../../models/articles';
import Error404Template from '../../../templates/pages/error404';


class Main extends Component {
    constructor() {
        super();

    }

    async getData() {
        const articles = await Articles.getLastNewsMiddle();
        const topArticles = await Articles.getLastNewsTopRight();
        const bottomArticle = await Articles.getLastInterview();

        topArticles.forEach(el => articles.push(el));
        bottomArticle.forEach(el => articles.push(el));
        return articles;

    }

    async render(article1) {

        let categoryTechnologyArticles = article1.filter(rec => rec.categoryId === '3'); // 6
        let categoryNoTechnologyArticles = article1.filter(rec => rec.categoryId !== '3' && rec.categoryId !== '5'); // 6
        let mainNew = categoryTechnologyArticles.slice(0, 1);
        let rightNews = categoryTechnologyArticles.slice(1, 3);
        let downNews = categoryTechnologyArticles.slice(3, 6);
        let lastInterview = article1.filter(rec => rec.categoryId === '5');

        return await (!article1.error ? MainPageTemplate({
            categoryNoTechnologyArticles,
            rightNews,
            downNews,
            mainNew,
            lastInterview
        }) : Error404Template());
    }

    afterRender() {
        this.setActions();

    }

    setActions() {
        const articlesContainer = document.getElementsByClassName('about')[0];


        articlesContainer.onclick = evt => {
            const target = evt.target,
                targetClassList = target.classList;

            switch (true) {
                case targetClassList.contains('article'):
                case targetClassList.contains('article__title'):
                case targetClassList.contains('image'):
                    this.redirectToArticleInfo(target.dataset.id);
                    break;
            }
        };
        fetch('http://api.openweathermap.org/data/2.5/weather?id=625143&lang=ru&appid=966083f3465a5d05765604d34569a3f4').then(function(resp) {
            return resp.json();
        }).then(function(data) {
            document.querySelector('.weather__city').textContent = data.name;
            document.querySelector('.weather__forecast').innerHTML = Math.round(data.main.temp - 273) + '&deg;';
            document.querySelector('.weather__desc').textContent = data.weather[0]['description'];
            document.querySelector('.weather__icon').innerHTML = `<img alt="" src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
        });
        const myHeaders = new Headers();
        myHeaders.append('apikey', 'Xnz6oSlUxwraAL6xCkh5cr3qCicd1JwL');

        const requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };

        fetch('https://api.apilayer.com/currency_data/live?source=BYN&currencies=USD,EUR,RUB', requestOptions).then(function(resp) {
            return resp.json();
        }).then(function(data) {
            let BYN = (1 / data.quotes.BYNUSD).toFixed(2);
            let EUR = (1 / data.quotes.BYNEUR).toFixed(2);
            let RUB = (100 / data.quotes.BYNRUB).toFixed(2);
            document.querySelector('.USD').innerHTML ='USD:' + BYN + 'руб';
            document.querySelector('.EUR').innerHTML ='EUR:' + EUR + 'руб';
            document.querySelector('.RUB').innerHTML ='RUB:' + RUB + 'руб';
        });
    }

    redirectToArticleInfo(id) {
        location.hash = `#/article/${id}`;
    }
}


export default Main;