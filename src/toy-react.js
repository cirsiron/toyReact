const RENDER_TO_DOM = Symbol('render to dom')
class ElementWrapper {
  constructor (type) {
    this.root = document.createElement(type);
  }
  setAttribute (key, val) {
    if (key.match(/^on([\S\s]+)$/)) {
      this.root.addEventListener(RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase()), val)
    } else {
      this.root.setAttribute(key, val);
    }
  }
  appendChild (component) {
    let range = document.createRange()
    range.setStart(this.root, this.root.childNodes.length)
    range.setEnd(this.root, this.root.childNodes.length)
    component[RENDER_TO_DOM](range)
  }
  [RENDER_TO_DOM](range) {
    range.deleteContents()
    range.insertNode(this.root)
  }
}

class TextWrapper {
  constructor (content) {
    this.root = document.createTextNode(content);
  }
  [RENDER_TO_DOM](range) {
    range.deleteContents()
    range.insertNode(this.root)
  }
}

export class Component {
  constructor () {
    this.props = Object.create(null);
    this.children = [];
    this._root = null;
    this._range = null;
  }
  setAttribute (key, val) {
    this.props[key] = val;
  }
  appendChild (component) {
    this.children.push(component)
  }
  [RENDER_TO_DOM](range) {
    this._range = range
    this.render()[RENDER_TO_DOM](range)
  }
  rerender () {
    this._range.deleteContents()
    this[RENDER_TO_DOM](this._range)
  }
  setState (newState) {
    if (this.state === null || typeof this.state !== 'object') {
      this.state = newState
      this.rerender()
      return
    }
    let merge = (oldState, newState) => {
      for (let p in newState) {
        if (oldState[p] === null || typeof oldState[p] !== 'object') {
          oldState[p] = newState[p]
        } else {
          merge(oldState[p], newState[p])
        }
      }
    }
    merge(this.state, newState)
    this.rerender()
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
      if (typeof child === 'string' || typeof child === 'number') {
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
  let range = document.createRange()
  range.setStart(parentEle, 0)
  range.setEnd(parentEle, parentEle.childNodes.length)
  range.deleteContents() // 清空数据
  // 重新渲染
  component[RENDER_TO_DOM](range)
}