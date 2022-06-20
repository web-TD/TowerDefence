export function stackElements(parentNode, count, tag, clsPrefix, text, isReversed) {
    let elements = []
    let indexes = Array.from(Array(count).keys());
    if (isReversed)
        indexes.reverse();
    for (let i of indexes) {
        let el = getElement(parentNode, tag, `${clsPrefix}${i}`);
        if (text !== undefined) {
            addText(el, text);
        }
        elements.push(el);
    }
    elements.reverse()
    return elements;
}

export function addText(parentNode, text) {
    let h = document.createElement("h1");
    let node = document.createTextNode(text);
    h.appendChild(node);
    parentNode.appendChild(h);
}

export function getButton(parentNode, onClick, cls, id) {
    let btn = getElement(parentNode, 'button', cls, id);
    btn.addEventListener('click', onClick);
    return btn;
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

export function getImage(src) {
    let img = new Image();
    img.src = src
    return img;
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

export function deleteDivByClassName(classname){
    let div = document.getElementsByClassName(classname)[0];
    div.parentNode.removeChild(div);
}

export function deleteDivByID(id){
    let div = document.getElementById(id);
    div.parentNode.removeChild(div);
}