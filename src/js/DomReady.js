/**
  * Creates and returns a promise that will resolve
  * once the DOM is ready. Based on document readyState property.
  * @function DomReady
  * @returns {Promise} Promise object
  */

export default function DomReady() {
    return new Promise((resolve, reject) => {
        if(document.readyState === 'interactive' || document.readyState === 'complete') {
            resolve(document.readyState);
        }

        document.onreadystatechange = function() {
          if (~['interactive', 'complete'].indexOf(document.readyState)) {
            resolve(document.readyState);
            document.onreadystatechange = null;
          }
        }
    });
}
