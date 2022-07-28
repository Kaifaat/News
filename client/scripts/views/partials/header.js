import Component from '../../views/component';

import HeaderTemplate from '../../../templates/partials/header';

class Header extends Component {
    constructor() {
        super();
    }
    async render() {
         return await HeaderTemplate();
    }
    afterRender() {
        this.setActions();
    }

    setActions() {
        const el =  document.documentElement;

        function isAutorized() {
            const logInIcon = document.getElementsByClassName('sign-in')[0];
            const logOutIcon = document.getElementsByClassName('log-out')[0];
            const role = localStorage.getItem('role');
            if (role){
                logInIcon.style.display = 'none';
                logOutIcon.style.display = 'block';
            }
        }
        isAutorized();

        function isAdmin() {
            const addButton = document.getElementsByClassName('add-news')[0];
            const role = localStorage.getItem('role');
            if (role === 'admin') {
                addButton.style.display = 'block';
            }
        }
        isAdmin();
        function logOut() {
            const logOutIcon = document.getElementsByClassName('log-out')[0];
            logOutIcon.onclick = () => {
                localStorage.clear();
                document.location.reload();
            };
        }
        logOut();

        function theme() {
            const changeTheme = document.getElementsByClassName('theme')[0];
            const darkTheme = document.getElementsByClassName('changeTheme')[0];
            const lightTheme = document.getElementsByClassName('changeTheme')[1];

            changeTheme.addEventListener('click', () => {

                if (el.hasAttribute('data-theme')) {
                    darkTheme.style.display = 'none';
                    lightTheme.style.display = 'block';
                    localStorage.setItem('style', 'light');
                    el.removeAttribute('data-theme');
                } else {
                    el.setAttribute('data-theme', 'dark');
                    lightTheme.style.display = 'none';
                    darkTheme.style.display = 'block';
                    localStorage.setItem('style', 'dark');
                }
            });
        }
        theme();
        if (localStorage.getItem('style') === 'dark') {
            el.setAttribute('data-theme', 'dark');
        }
    }
}

export default Header;

