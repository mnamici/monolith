export const predicateTypes = {
    c: "class",
    op: "objectProperty",
    dp: "dataProperty",
    i: "individuals"
}


export const renders = ["entityIRI", "entityID", "entityPrefixIRI", "entityRemainder", "entityLabels"]

const lang = ''

export function renderEntity(entity) {
    const render = localStorage.getItem('renderEntity') || renders[0]
    var rendering = entity[render]
    //if labels
    if (rendering instanceof Array) {
        rendering = renderLabel(rendering)
    }

    // default rendering when not found
    if (rendering instanceof Array || rendering === null || rendering === undefined) {
        rendering = entity[renders[0]]
    }

    return rendering;
}

export function renderLabel(rendering) {
    for (let label of rendering)
            if (label.lang === lang) {
                return label.content
            }
}

export function saveFileInfo(body, fileName) {
    const text = atob(body.content)
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', fileName || body.fileName);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);

}

export function getBase64(file, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        let index = reader.result.indexOf('base64,')
        let base64 = reader.result.substr(index + 'base64,'.length)
        callback(base64)
    });
    reader.readAsDataURL(file);
}

export const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

export const dateFormat = 'LLL';

export const regexIri = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
