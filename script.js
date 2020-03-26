/**
 * Button handler
 *
 * @param {string} url
 * @param {string} type
 *
 * @returns {Function<void>}
 */
const handler = (url, type) => {
    return () => {
        const newPage = {
            json: `${url}.json`,
            metafields: `${url}/metafields.json`,
        }[type];

        // We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
        chrome.tabs.executeScript({
            code: `window.open("${newPage}");` //argument here is a string but function.toString() returns function's code
        });
    }
};

chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, (tabs) => {
    const currentUrl = tabs[0].url || null;

    if (!currentUrl) {
        return;
    }

    const message = document.getElementById('message');
    const valid = document.getElementById('valid');

    if (currentUrl.match(/myshopify\.com\/admin\/products\/\d+/) !== null) {
        message.style.display = 'none';
        valid.style.display = 'block';
    }

    const json = document.getElementById('json-button');
    const metafields = document.getElementById('metafields-button');

    if (json) {
        json.addEventListener('click', handler(currentUrl, 'json'));
    }

    if (metafields) {
        metafields.addEventListener('click', handler(currentUrl, 'metafields'));
    }
});
