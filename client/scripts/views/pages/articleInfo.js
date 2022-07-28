import Component from '../../views/component';

import Articles from '../../models/articles';

import InfoTemplate from '../../../templates/pages/articleInfo';
import Error404Template from '../../../templates/pages/error404';

class Info extends Component {
    constructor() {
        super();

        this.model = Articles;
    }

    async getData() {
        const articles = await Articles.getArticle(this.urlParts.id);
        let reactions = await Articles.getArticleReactions(this.urlParts.id);

        let needCreateReactionEmoji = reactions.filter(el => el.typeOfReaction === 'emoji').length === 0;

        if (needCreateReactionEmoji) {
            let typeOfReaction = 'emoji';
            const newReaction = {
                'values':`${this.urlParts.id}, '${typeOfReaction}', 0, 0, 0`
            };
            setTimeout(() => document.location.reload(), 1000);
            await this.model.addReactions(newReaction);

            reactions = await Articles.getArticleReactions(this.urlParts.id);
        }
        reactions.forEach(el => articles.push(el));
        return articles;
    }

    async render(article) {
        let articleInfo = article.slice(0,1)[0];
      //  let comment = article.filter(el => el.typeOfReaction === 'comment');
        let countEmoji = article.filter(el => el.typeOfReaction === 'emoji')[0];
        let comments = article.slice(1, article.length);

        return await (!article.error ? InfoTemplate({articleInfo, comments, countEmoji}) : Error404Template());
    }

    afterRender() {
        this.setActions();

    }

    setActions() {
        const removeArticleButton = document.getElementsByClassName('article-main-remove')[0];
        const sendCommentButton = document.getElementsByClassName('send-comment')[0];
        const commentTextField = document.getElementsByClassName('comment')[0];
        const commentsDiv = document.getElementsByClassName('comments')[0];
        const at = document.getElementsByClassName('descrip')[0];
        at.innerHTML = at.textContent;

        const emojiDiv = document.getElementsByClassName('reactions')[0];
        const likeEmoji = document.getElementsByClassName('like-count')[0];
        const dislikeEmoji = document.getElementsByClassName('dislike-count')[0];
        const smileEmoji = document.getElementsByClassName('smile-count')[0];
        let articleId = this.urlParts.id;
        let count = {
            countOfLikes: `${+likeEmoji.textContent}`,
            countOfDislikes: `${+dislikeEmoji.textContent}`,
            countOfSmiles: `${+smileEmoji.textContent}`,
            articleId: `${articleId}`
        };


        emojiDiv.onclick = evt => {
            const target = evt.target,
                targetClassList = target.classList;

            if (localStorage.getItem(`articleReactionId${this.urlParts.id}`) === this.urlParts.id) {
                // eslint-disable-next-line no-console
                console.log('Реакция уже добавлена');
            } else {
            switch (true) {
                case targetClassList.contains('like'):
                     count = {
                        countOfLikes: `${+likeEmoji.textContent + 1}`,
                         countOfDislikes: `${+dislikeEmoji.textContent}`,
                         countOfSmiles: `${+smileEmoji.textContent}`,
                        articleId: `${articleId}`
                    };
                     localStorage.setItem(`articleReactionId${this.urlParts.id}`, this.urlParts.id);
                    this.changeEmojiValue(count);
                    likeEmoji.innerHTML = `${+likeEmoji.textContent + 1}`;
                    break;

                case targetClassList.contains('dislike'):
                     count = {
                         countOfLikes: `${+likeEmoji.textContent}`,
                         countOfDislikes: `${+dislikeEmoji.textContent + 1}`,
                         countOfSmiles: `${+smileEmoji.textContent}`,
                         articleId: `${articleId}`
                    };
                    localStorage.setItem(`articleReactionId${this.urlParts.id}`, this.urlParts.id);
                    this.changeEmojiValue(count);
                    dislikeEmoji.innerHTML = `${+dislikeEmoji.textContent + 1}`;
                    break;

                case targetClassList.contains('smile'):
                    count = {
                        countOfLikes: `${+likeEmoji.textContent}`,
                        countOfDislikes: `${+dislikeEmoji.textContent}`,
                        countOfSmiles: `${+smileEmoji.textContent + 1}`,
                        articleId: `${articleId}`
                    };
                    localStorage.setItem(`articleReactionId${this.urlParts.id}`, this.urlParts.id);
                    this.changeEmojiValue(count);
                    smileEmoji.innerHTML = `${+smileEmoji.textContent + 1}`;
                    break;
            }
        }
        };


        function isAuthorisedAdmin() {
            const role = localStorage.getItem('role');
            if (role === 'admin') {
                removeArticleButton.style.display = 'block';
                removeArticleButton.setAttribute('href', '#/');
            }
        }
        isAuthorisedAdmin();

        removeArticleButton.onclick = () => this.removeArticle();
        sendCommentButton.onclick = () => {
            if (commentTextField.value) {
                this.addComment(commentTextField);

                const newCommentDiv = document.createElement('div');
                const userNameComment = document.createElement('a');
                const commentText = document.createElement('p');

                newCommentDiv.appendChild(userNameComment);
                newCommentDiv.appendChild(commentText);
                userNameComment.setAttribute('class','comment__title');
                commentText.setAttribute('class','comment-description');
                userNameComment.innerHTML = localStorage.name;
                commentText.innerHTML = commentTextField.value;
                commentsDiv.appendChild(newCommentDiv);
                commentTextField.value = '';

            }
        };

    }
    async changeEmojiValue(count) {
        await this.model.countEmoji(count);
    }


    async addComment() {
        const   commentTextField = document.getElementsByClassName('comment')[0];
        let id = this.urlParts.id;
        let userName = localStorage.name;
        let typeOfReaction = 'comment';
        let newComment = {
            'values':`${id}, '${typeOfReaction}', '${commentTextField.value}', '${userName}'`
        };
        await this.model.addComment(newComment);
    }

    async removeArticle() {
        if (confirm('Are you sure?')) {
            await this.model.removeArticle(this.urlParts.id);
        }
    }
}

export default Info;