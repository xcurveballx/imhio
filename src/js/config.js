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

export default {
    'access_key': '222537cad765d0ba4fed55c99ec5f371',
    'url': 'https://apilayer.net/api/check',
    'rootId': 'EmailChecker',
    'successMsg': 'The email you provided seems to be valid :) See the details below:',
    'failureMsg': 'The email you provided seems to be invalid :( See the details below:',
    'missingEmailMsg': 'You should enter an email to check!',
    'serviceErrMsg': 'Something went wrong and the API is not available now! Try later.'
};
