import Component from '../../views/component';

import Articles from '../../models/articles';

import LoginPageTemplate from '../../../templates/pages/loginPage';


class AddAndList extends Component {
    constructor() {
        super();

        this.model = Articles;
    }

    async getData() {
        return await this.model.login();
    }

    async render() {
        return await LoginPageTemplate();
    }

    afterRender() {
        this.setActions();

    }

    setActions() {
        const userNameField = document.getElementsByClassName('user-name')[0],
            userPasswordField = document.getElementsByClassName('user-password')[0],
            loginBtn = document.getElementsByClassName('login-button')[0];
        loginBtn.onclick = () => this.checkUser(userNameField, userPasswordField).then(result => {
            localStorage.setItem('name', result[0].userName);
            localStorage.setItem('role', result[0].role);
            document.location.reload();
        });
        loginBtn.setAttribute('href', '#/');
    }

    async checkUser(userNameField, userPasswordField) {
        let checkUser = {
            'userName': `${userNameField.value}`, 'password': `${userPasswordField.value}`
        };

        return await this.model.login(checkUser);
    }
}

export default AddAndList;

