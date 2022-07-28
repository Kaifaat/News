import Component from '../../views/component';
import Articles from '../../models/articles';
import createArticleTemplate from '../../../templates/pages/createArticle';


class AddAndList extends Component {
    constructor() {
        super();

        this.model = Articles;
    }

    async render(articles) {
        return await createArticleTemplate({articles});
    }

    afterRender() {
        this.setActions();

    }

    setActions() {
        const articleTitleField = document.getElementsByClassName('add-news-form-title')[0],
            articleDescriptionField = document.getElementsByClassName('add-news-form-content')[0],
            addArticleBtn = document.getElementsByClassName('main-button')[0],
            articleMiniDescriptionField = document.getElementsByClassName('add-news-form-summary')[0],
            articleImage = document.getElementsByClassName('add-news-form-image')[0],
            articleCategory = document.getElementsByClassName('add-news-form-section')[0];
        addArticleBtn.onclick = () => this.addArticle(articleTitleField, articleDescriptionField, articleMiniDescriptionField,
            articleImage, articleCategory).then(() => this.addReactions(articleTitleField));
        addArticleBtn.setAttribute('href', '#/');
    }

    async addArticle(articleTitleField, articleDescriptionField, articleMiniDescriptionField,
                     articleImage, articleCategory) {
        let newArticle = {'values': `'${articleTitleField.value}', '${articleDescriptionField.value}','${articleMiniDescriptionField.value}','${articleImage.value}','${articleCategory.value}'`};
        await this.model.addArticle(newArticle);
        return;
    }

    async addReactions(articleTitle) {
        let id = await this.model.getArticleIdByTitle(articleTitle.value);
        let typeOfReaction = 'emoji';
        const newReaction = {
            'values': `${id}, '${typeOfReaction}', 0, 0, 0`
        };
        await this.model.addReactions(newReaction);

    }
}

export default AddAndList;

