import Component from '../../views/component';

import Articles from '../../models/articles';

import RegistrationPageTemplate from '../../../templates/pages/registrationPage';




class AddAndList extends Component {
    constructor() {
        super();

        this.model = Articles;
    }

    async getData() {
        return await this.model.login();
    }

    async render() {
        return await RegistrationPageTemplate();
    }

    afterRender() {
        this.setActions();

    }

    setActions() {
        const userNameField = document.getElementsByClassName('user-name')[0],
            userPasswordField = document.getElementsByClassName('user-password')[0],
            userRepeatPasswordField = document.getElementsByClassName('user-password-two')[0],
            loginBtn = document.getElementsByClassName('login-button')[0];
            loginBtn.onclick = () => {
                if (userNameField.value.length > 20) {
                    alert('Логин не должен содержать более 20 символов');
                } else if (userPasswordField.value !== userRepeatPasswordField.value) {
                    alert('Пароли должны совпадать');
                } else {
                    this.registerUser(userNameField, userPasswordField);
                    loginBtn.setAttribute('href', '#/login');
            }
        };
    }

     async registerUser(userNameField, userPasswordField) {
        let newUser = {
            'values':`'${userNameField.value}', '${userPasswordField.value}'`};

        return await this.model.registration(newUser);
        }
 }

 export default AddAndList;

