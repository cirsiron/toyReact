class ElementWrapper {
  constructor (type) {
    this.root = document.createElement(type);
  }
  setAttribute (key, val) {
    this.root.setAttribute(key, val);
  }
  appendChild (component) {
    this.root.appendChild(component.root)
  }
}

class TextWrapper {
  constructor (content) {
    this.root = document.createTextNode(content);
  }
}

export class Component {
  constructor () {
    this.props = Object.create(null);
    this.children = [];
    this._root = null;
  }
  setAttribute (key, val) {
    this.props[key] = val;
  }
  appendChild (component) {
    this.children.push(component)
  }
  get root () {
    if (!this._root) {
      // 递归
      this._root = this.render().root;
    }
    return this._root;
  }
}

export function createElement (tag, attrs, ...children) {
  let e;
  if (typeof tag === 'string') {
    e = new ElementWrapper(tag);
  } else {
    e = new tag()
  }
  for (let p in attrs) {
    e.setAttribute(p, attrs[p])
  }
  let insertChildren = (children) => {
    for (let child of children) {
      if (typeof child === 'string') {
        child = new TextWrapper(child)
      }
      if (Array.isArray(child)) {
        insertChildren(child)
      } else {
        e.appendChild(child);
      }
    }
  }
  insertChildren(children)
  return e;
}

export function render (component, parentEle) {
  parentEle.appendChild(component.root)
}