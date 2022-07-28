import {parseCurrentURL} from '../helpers/utils.js';

class Component {
    constructor() {
        this.urlParts = parseCurrentURL();
    }

    async getData() {}

    afterRender() {}
}

export default Component;