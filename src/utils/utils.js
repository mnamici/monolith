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
        for (let label of rendering)
            if (label.lang === lang)
                return label.content
        // default rendering when label not found
        return entity[renders[3]]
    }

    return rendering;
}

export function saveFileInfo(body) {
    console.log(body)
    const text = atob(body.content)
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', body.fileName);

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
