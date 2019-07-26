(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = DomReady;

/**
  * Creates and returns a promise that will resolve
  * once the DOM is ready. Based on document readyState property.
  * @function DomReady
  * @returns {Promise} Promise object
  */
function DomReady() {
  return new Promise(function (resolve, reject) {
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      resolve(document.readyState);
    }

    document.onreadystatechange = function () {
      if (~['interactive', 'complete'].indexOf(document.readyState)) {
        resolve(document.readyState);
        document.onreadystatechange = null;
      }
    };
  });
}

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MailChecker =
/*#__PURE__*/
function () {
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
  function MailChecker(config, ViewUpdater) {
    _classCallCheck(this, MailChecker);

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


  _createClass(MailChecker, [{
    key: "setEventHandler",
    value: function setEventHandler(eventName) {
      var _this = this;

      this.view.btn.addEventListener(eventName, function () {
        _this.sendRequest().then(function (res) {
          if (res) {
            if (res.format_valid === true) {
              _this.view.success(_this.config.successMsg, res);
            } else if (res.format_valid === false) {
              _this.view.failure(_this.config.failureMsg, res);
            } else {
              _this.view.error(new Error(_this.config.serviceErrMsg));
            }
          }
        })["catch"](function (err) {
          return _this.view.error(err);
        });
      });
    }
    /**
     * Sends the request to the API.
     * @function sendRequest
     * @memberof MailChecker
     * @instance
     * @returns {Promise} Promise object with the request result to come.
     */

  }, {
    key: "sendRequest",
    value: function sendRequest() {
      var email = this.isEmailProvided();

      if (!email) {
        this.view.error(new Error(this.config.missingEmailMsg));
        return Promise.resolve();
      } else {
        this.view.loading();
        var endPoint = "".concat(this.config.url, "?access_key=").concat(this.config.access_key, "&email=").concat(email, "&format=1");
        return fetch(endPoint).then(function (response) {
          return response.json();
        });
      }
    }
    /**
     * Gets the inserted email from the form.
     * @function isEmailProvided
     * @memberof MailChecker
     * @instance
     * @returns {boolean|string} false, if no email, or inserted email.
     */

  }, {
    key: "isEmailProvided",
    value: function isEmailProvided() {
      return !!this.view.input.value.trim() ? this.view.input.value.trim() : false;
    }
  }]);

  return MailChecker;
}();

exports["default"] = MailChecker;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ViewUpdater =
/*#__PURE__*/
function () {
  /**
   * @constructs ViewUpdater
  * @description ViewUpdater is responsible for updating the page
   * according to the result of the request. Sets up all the page elements.
   * @param {string} [rootId=EmailChecker] id of the form
   */
  function ViewUpdater() {
    var rootId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'EmailChecker';

    _classCallCheck(this, ViewUpdater);

    this.root = document.getElementById(rootId);
    this.input = this.root.getElementsByTagName('input')[0], this.btn = this.root.getElementsByTagName('button')[2], this.btnSpinner = this.btn.getElementsByTagName('span')[0], this.btnTxt = this.btn.getElementsByTagName('span')[1];
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


  _createClass(ViewUpdater, [{
    key: "initial",
    value: function initial() {
      this.alert.classList.add("d-none");
      this.btnSpinner.classList.add("d-none");
      this.btnTxt.textContent = 'Check';
      this.btn.removeAttribute("disabled", "disabled");
      this.posFeedback.classList.add("d-none");
      this.negFeedback.classList.add("d-none");
      this.input.removeAttribute("disabled", "disabled");
      this.input.classList.remove('is-invalid', 'is-valid'); //this.input.value = '';
    }
    /**
     * Enforces loading page UI state.
     * @function loading
     * @memberof ViewUpdater
     * @instance
     * @returns {void}
     */

  }, {
    key: "loading",
    value: function loading() {
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

  }, {
    key: "success",
    value: function success(msg, data) {
      this.initial();
      this.input.classList.add('is-valid');
      this.posFeedback.innerHTML = "<pre>".concat(msg, " \n ").concat(JSON.stringify(data, null, 4), "</pre>");
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

  }, {
    key: "failure",
    value: function failure(msg, data) {
      this.initial();
      this.input.classList.add('is-invalid');
      this.negFeedback.innerHTML = "<pre>".concat(msg, " \n ").concat(JSON.stringify(data, null, 4), "</pre>");
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

  }, {
    key: "error",
    value: function error(_error) {
      this.initial();
      this.alert.classList.remove("d-none");
      this.alertMsg.textContent = "".concat(_error.name, ": ").concat(_error.message);
    }
  }]);

  return ViewUpdater;
}();

exports["default"] = ViewUpdater;
;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * App config, just plain object.
 * @exports config
 * @property {string} config.access_key my access key to use the API.
 * @property {string} config.url an url pointing to the service API.
 * @property {string} config.rootId name of the app root element on the page.
 * @property {string} config.successMsg successful email check message.
 * @property {string} config.failureMsg failed email check message.
 * @property {string} config.missingEmailMsg missing email message.
 * @property {string} config.serviceErrMsg API error message.
 */
var _default = {
  'access_key': '222537cad765d0ba4fed55c99ec5f371',
  'url': 'https://apilayer.net/api/check',
  'rootId': 'EmailChecker',
  'successMsg': 'The email you provided seems to be valid :) See the details below:',
  'failureMsg': 'The email you provided seems to be invalid :( See the details below:',
  'missingEmailMsg': 'You should enter an email to check!',
  'serviceErrMsg': 'Something went wrong and the API is not available now! Try later.'
};
exports["default"] = _default;

},{}],5:[function(require,module,exports){
"use strict";

var _config = _interopRequireDefault(require("./config"));

var _ViewUpdater = _interopRequireDefault(require("./ViewUpdater"));

var _DomReady = _interopRequireDefault(require("./DomReady"));

var _MailChecker = _interopRequireDefault(require("./MailChecker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _DomReady["default"])().then(function (res) {
  new _MailChecker["default"](_config["default"], _ViewUpdater["default"]);
});

},{"./DomReady":1,"./MailChecker":2,"./ViewUpdater":3,"./config":4}]},{},[5]);
