export default class MailChecker {
   /**
    * @constructs MailChecker
    * @description MailChecker provides us with functionality to
    * make requests to mailboxlayer.com API in order to check
    * the emails inserted by users.
    * @param {object} config with settings, described in
    * separate file config.js.
    * @param {class} ViewUpdater class responsible for updating the page
    * will be created as instance variable of MailChecker instance.
    */
    constructor(config, ViewUpdater) {
        this.config = config;
        this.view = new ViewUpdater(this.config.rootId);
        this.setEventHandler('click');
    }

    /**
     * Sets event listener, passes results to the view & wires everything up.
     * @function setEventHandler
     * @memberof MailChecker
     * @instance
     * @param {string} eventName the name of an event, in our case 'click'
     * @returns {void}
     */
    setEventHandler(eventName) {
        this.view.btn.addEventListener(eventName, () => {
              this.sendRequest()
              .then((res) => {
                  if(res) {
                      if(res.format_valid === true) {
                          this.view.success(this.config.successMsg, res);
                      } else if(res.format_valid === false) {
                          this.view.failure(this.config.failureMsg, res);
                      } else {
                          this.view.error(new Error(this.config.serviceErrMsg));
                      }
                  }
              })
              .catch(err => this.view.error(err));
            }
        );
    }

    /**
     * Sends the request to the API.
     * @function sendRequest
     * @memberof MailChecker
     * @instance
     * @returns {Promise} Promise object with the request result to come.
     */
    sendRequest() {
        let email = this.isEmailProvided();

        if(!email) {
            this.view.error(new Error(this.config.missingEmailMsg));
            return Promise.resolve();
        } else {
            this.view.loading();

            let endPoint = `${this.config.url}?access_key=${this.config.access_key}&email=${email}&format=1`;

            return fetch(endPoint).then(response => response.json());
        }
    }

    /**
     * Gets the inserted email from the form.
     * @function isEmailProvided
     * @memberof MailChecker
     * @instance
     * @returns {boolean|string} false, if no email, or inserted email.
     */
    isEmailProvided() {
        return !!this.view.input.value.trim() ? this.view.input.value.trim() : false;
    }
}
