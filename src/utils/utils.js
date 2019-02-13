export const predicateTypes = {
    c: "class",
    op: "objectProperty",
    dp: "dataProperty",
    i: "individuals"
}


const renders = ["entityIRI", "entityID", "entityPrefixIRI", "entityRemainder", "entityLabels"]
const render = renders[3]

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
