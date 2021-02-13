import { createElement, render, Component } from './toy-react';

class MyComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      a: 1,
      b: 2
    }
  }
  render () {
    return <div>
      my-component
      {this.state.a}
      <button onClick={() => {this.setState({a: this.state.a + 1})}}>add</button>
      {this.state.b}
    </div>
  }
}

const a = <MyComponent className="div">
  <p id="p">
    ptext
  </p>
</MyComponent>

render(a, document.body)