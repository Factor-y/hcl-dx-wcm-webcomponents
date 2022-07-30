import { LitElement, html } from 'lit';
import { dxBase } from '../base/baseDXConfiguration.js'
/*
    WebContentViewer is equivalent to HCL's DX Web Content Viwer Portlet
*/
export class WebContentViewer extends LitElement {

    static properties = {
        version: {},
        hostUrl: {},
        wcmServletPath: {},
        vpName: {},
        library: {},
        sitearea: {},
        content: {},
        component: {},
        presentationTemplate: {},
        page: { type: Number },
        subType: {}
    };

    _computeWCMUrl() {
        let wcmUrl = this.hostUrl + this.wcmServletPath;

        if (this.vpName != "") {
            wcmUrl += '/' + this.vpName;
        }
        wcmUrl += '/' + this.library;
        wcmUrl += '/' + this.sitearea;

        /* Component mode */
        if (this.component != "") {
            wcmUrl += '?WCM_PI=1&source=library&srv=cmpnt&cmpntid=' + this.component;
            if (this.page > 0) {
                wcmUrl += '&WCM_Page.' + this.component + '=' + this.page;
            }
        }
        /* Web content mode */
        else {

        }

        if (this.subType) {
            wcmUrl += '&subType=' + this.subType;
        }

        return wcmUrl
    }

    _fetchRemoteContent() {

    }

    constructor() {
        super();
        this.version = 'STARTING';
        this.wcmServletPath = '/wps/wcm/connect';
        this.vpName = "";
        this.library = "";
        this.sitearea = "";
        this.page = 0;
        this.content = "";
    }

    connectedCallback() {
        super.connectedCallback()
        console.log('connected, getting content from remote')
        let _self = this;
        fetch(this._computeWCMUrl())
            .then(response => {
                console.log('I got content', response);
                _self.content = response.body;
            })
            .catch(error => {
                _self.content = error;
            });
    }

    render() {
        return html`<a href="${this._computeWCMUrl()}" target="_new">${this._computeWCMUrl()}</a><hr>${this.content}`;
    }
}
customElements.define('hcldx-web-content-viewer', WebContentViewer);