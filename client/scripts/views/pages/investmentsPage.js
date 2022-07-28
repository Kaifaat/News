import Component from '../../views/component';

import Articles from '../../models/articles';

import InvestmentsPageTemplate from '../../../templates/pages/investments';




class AddAndList extends Component {
    constructor() {
        super();

        this.model = Articles;
    }

    async getData() {
        return await this.model.getArticlesListInvestments();
    }

    async render(articles) {
        return await InvestmentsPageTemplate({articles});
    }

    afterRender() {
        this.setActions();

    }

    setActions() {
        const  articlesContainer = document.getElementsByClassName('articles')[0];

        articlesContainer.onclick = evt => {
            const target = evt.target,
                targetClassList = target.classList;

            switch (true) {
                case targetClassList.contains('article'):
                case targetClassList.contains('article__title'):
                    this.redirectToArticleInfo(target.dataset.id);
                    break;
                                }
        };
    }

    redirectToArticleInfo(id) {
        location.hash = `#/article/${id}`;
    }

}

export default AddAndList;

