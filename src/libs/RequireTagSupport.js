class RequireTagSupport extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        require(this.getAttribute('path'));
        setTimeout(() => {
            this.parentNode.removeChild(this);
        }, 400);
    }
}
customElements.define('node-require', RequireTagSupport);
//# sourceMappingURL=RequireTagSupport.js.map