export const predicateTypes = {
    c: "class",
    op: "objectProperty",
    dp: "dataProperty",
    i: "individuals"
}


const renders = ["entityIRI", "entityID", "entityPrefixIRI", "entityRemainder", "entityLabels"]
const render = renders[0]

const lang = ''

export function renderEntity(entity) {
    var rendering = entity[render]
    //if labels
    if (rendering instanceof Array) {
        for (let label of rendering)
            if (label.lang === lang)
                return label.content
        // default rendering when label not found
        return entity[renders[3]]
    }

    return rendering;
}

export function saveFileInfo(body) {
    const text = atob(body.content)
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', body.fileName);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);

}

export const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
