export default class ViewUpdater {
    /**
     * @constructs ViewUpdater
	   * @description ViewUpdater is responsible for updating the page
     * according to the result of the request. Sets up all the page elements.
     * @param {string} [rootId=EmailChecker] id of the form
     */
    constructor(rootId = 'EmailChecker') {
        this.root = document.getElementById(rootId);
        this.input = this.root.getElementsByTagName('input')[0],
        this.btn = this.root.getElementsByTagName('button')[2],
        this.btnSpinner = this.btn.getElementsByTagName('span')[0],
        this.btnTxt = this.btn.getElementsByTagName('span')[1];
        this.alert = this.root.getElementsByTagName('div')[0];
        this.alertMsg = this.alert.getElementsByTagName('span')[1];
        this.posFeedback = this.root.getElementsByTagName('div')[2];
        this.negFeedback = this.root.getElementsByTagName('div')[3];
    }

    /**
     * Enforces initial page UI state.
     * @function initial
     * @memberof ViewUpdater
     * @instance
     * @returns {void}
     */
    initial() {
        this.alert.classList.add("d-none");
        this.btnSpinner.classList.add("d-none");
        this.btnTxt.textContent = 'Check';
        this.btn.removeAttribute("disabled", "disabled");
        this.posFeedback.classList.add("d-none");
        this.negFeedback.classList.add("d-none");
        this.input.removeAttribute("disabled", "disabled");
        this.input.classList.remove('is-invalid', 'is-valid');
        //this.input.value = '';
    }

    /**
     * Enforces loading page UI state.
     * @function loading
     * @memberof ViewUpdater
     * @instance
     * @returns {void}
     */
    loading() {
        this.initial();
        this.btnSpinner.classList.remove("d-none");
        this.btnTxt.textContent = 'Checking...';
        this.btn.setAttribute("disabled", "disabled");
        this.input.setAttribute("disabled", "disabled");
    }

    /**
     * Enforces success page UI state.
     * @function success
     * @memberof ViewUpdater
     * @instance
     * @param {string} msg message to show in case of success.
     * @param {object} data service API response.
     * @returns {void}
     */
    success(msg, data) {
        this.initial();
        this.input.classList.add('is-valid');
        this.posFeedback.innerHTML = `<pre>${msg} \n ${JSON.stringify(data, null, 4)}</pre>`;
        this.posFeedback.classList.remove("d-none");
    }

    /**
     * Enforces failure page UI state.
     * @function failure
     * @memberof ViewUpdater
     * @instance
     * @param {string} msg message to show in case of failure.
     * @param {object} data service API response.
     * @returns {void}
     */
    failure(msg, data) {
        this.initial();
        this.input.classList.add('is-invalid');
        this.negFeedback.innerHTML = `<pre>${msg} \n ${JSON.stringify(data, null, 4)}</pre>`;
        this.negFeedback.classList.remove("d-none");
    }

    /**
     * Outputs JS error message.
     * @function error
     * @memberof ViewUpdater
     * @instance
     * @param {Error} error an error object.
     * @returns {void}
     */
    error(error) {
        this.initial();
        this.alert.classList.remove("d-none");
        this.alertMsg.textContent = `${error.name}: ${error.message}`;
    }
};
