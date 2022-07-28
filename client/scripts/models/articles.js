class Articles {
    static async getArticlesListInvestments() {
        const response = await fetch('http://localhost:3010/api/articlesInvestments');

        return await response.json();
    }

    static async getArticlesListSport() {
        const response = await fetch('http://localhost:3010/api/articlesSport');

        return await response.json();
    }

    static async getArticlesListTechnology() {
        const response = await fetch('http://localhost:3010/api/articlesTechnology');

        return await response.json();
    }

    static async getArticlesListRealEstate() {
        const response = await fetch('http://localhost:3010/api/articlesRealEstate');

        return await response.json();
    }

    static async getInterviewList() {
        const response = await fetch('http://localhost:3010/api/interview');

        return await response.json();
    }

    static async addArticle(newArticle) {
        const response = await fetch('http://localhost:3010/api/article', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newArticle)
        });

        return await response.json();
    }

    static async getArticle(id) {
        const response = await fetch(`http://localhost:3010/api/article/${id}`);

        return await response.json();
    }

    static async editArticle(updatedArticle) {
        await fetch(`http://localhost:3010/api/article/${updatedArticle.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedArticle)
        });
    }

    static async countEmoji(count) {
        await fetch('http://localhost:3010/api/article/33', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(count)
        });
    }

    static async addComment(newComment) {
        const response = await fetch('http://localhost:3010/api/addComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComment)
        });

        return await response.json();
    }

    static async addReactions(newReaction) {
        const response = await fetch('http://localhost:3010/api/addReactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newReaction)
        });

        return await response.json();
    }

    static async getArticleIdByTitle(articleTitle) {
        const response = await fetch(`http://localhost:3010/api/getArticleIdByTitle/${articleTitle}`);

        let asd = await response.json();
        return asd;
    }


    static async removeArticle(id) {
        await fetch(`http://localhost:3010/api/article/${id}`, {
            method: 'DELETE'
        });
    }

    // сделал 3 запроса, т.к преобразовать все в один не получилось
    static async getLastNewsMiddle() {
        const response = await fetch('http://localhost:3010/api/lastNewsMiddle');
        const response1 = await fetch('http://localhost:3010/api/lastNewsMiddle2');
        const response2 = await fetch('http://localhost:3010/api/lastNewsMiddle4');

        let responseInvestentsNew = await response.json();
        let responseSportNew = await response1.json();
        let responseRealEstateNew = await response2.json();
        let middleNewsResponse = [];
        middleNewsResponse.push(responseInvestentsNew[0]);
        middleNewsResponse.push(responseSportNew[0]);
        middleNewsResponse.push(responseRealEstateNew[0]);

        return middleNewsResponse;
    }

    static async getLastNewsTopRight() {
        const response = await fetch('http://localhost:3010/api/lastNewsTopRight');

        return await response.json();
    }

    static async getLastInterview() {
        const response = await fetch('http://localhost:3010/api/lastInterview');

        return await response.json();
    }

    static async login(checkUser) {
        const response = await fetch('http://localhost:3010/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(checkUser)
        });

        return await response.json();
    }

    static async registration(newUser) {
        const response = await fetch('http://localhost:3010/api/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });

        return await response.json();
    }


    static async getArticleReactions(articleId) {
        const response = await fetch(`http://localhost:3010/api/reactions/${articleId}`, {});

        return await response.json();
    }
}

export default Articles;