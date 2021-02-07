import { createElement, render, Component } from './toy-react';

class MyComponent extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return <div>
      'my-component'
      { this.children }
    </div>
  }
}

const a = <MyComponent className="div">
  <p id="p">
    ptext
  </p>
</MyComponent>

render(a, document.body)