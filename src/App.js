import React, { Component, PureComponent } from 'react';
import ReactDOM from 'react-dom';

import logo from './logo.svg';
import './App.css';

class MyWindowPortal extends Component{
  constructor(props){
    super(props);

    this.containerEl = document.createElement('div');
    this.externalWindow = null;
  }

  render(){
    return ReactDOM.createPortal(this.props.children, this.containerEl)
  }

  componentDidMount(){
    this.externalWindow = window.open('', '', 'width=600,height=400,left=200,top=200')

    this.externalWindow.document.body.appendChild(this.containerEl);
  }

  componentWillUnmount(){
    this.externalWindow.close();
  }
}


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      counter: 0,
      showWindowPortal: false
    }

    this.toggleWindowPortal = this.toggleWindowPortal.bind(this);
  }

  componentDidMount(){
    window.setInterval(() => {
      this.setState(state => ({
        ...state,
        counter: state.counter + 1,
      }));
    }, 1000);
  }

  toggleWindowPortal(){
    this.setState(state => ({
      ...state,
      showWindowPortal: !state.showWindowPortal
    }))
  }

  render() {
    return (
      <div className="App">
        <h1>Counter: {this.state.counter}</h1>
        <button onClick={this.toggleWindowPortal}>
          {this.state.showWindowPortal ? 'Close the': 'Open a'} Portal
        </button>

        {this.state.showWindowPortal && (
          <MyWindowPortal>
            <h1>Counter in a portal: {this.state.counter}</h1>
            <p>Even though I render in a different window, I share state!</p>
            
            <button onClick={() => this.setState({ showWindowPortal: false })} >
              Close me!
            </button>
          </MyWindowPortal>
        )}
      </div>
    );
  }
}

export default App;
