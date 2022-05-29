export let CONFIG = await fetch('controllers/cfg.json').then(res => res.json());

export function stackElements(parentNode, count, tag, clsPrefix, text) {
    let elements = []
    for (let i = count - 1; i >= 0; i--) {
        let el = getElement(parentNode, tag, `${clsPrefix}${i}`);
        if (text !== undefined) {
            let h = document.createElement("h1");
            let node = document.createTextNode(text);
            h.appendChild(node);
            el.appendChild(h);
        }
        elements.push(el);
    }
    elements.reverse()
    return elements;
}

export function getElement(parentNode, tag, cls, id) {
    let el = document.createElement(tag);
    if (cls !== undefined)
        el.setAttribute('class', cls);
    if (id !== undefined)
        el.setAttribute('id', id);
    parentNode.appendChild(el);
    return el;
}

export function getTextSize(ctx, text) {
    let metrics = ctx.measureText(text);
    let height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    return {w: metrics.width, h: height};
}

export function clearDiv(div) {
    while(div.firstChild) {
        div.removeChild(div.firstChild);
    }
}