////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Using context, implement the Form, SubmitButton, and TextInput components
// such that:
//
// - clicking the SubmitButton submits the form
// - hitting "Enter" while in a TextInput submits the form
// - Don't use a <form/> element, we're intentionally recreating the
//   browser's built in behavior
//
// Got extra time?
//
// - send the values of all the TextInput's to the Form `onChange` handler
//   without using DOM traversal APIs.
// - Implement a ResetButton that resets the TextInputs in the Form
//
////////////////////////////////////////////////////////////////////////////////
import React from 'react';
import { render } from 'react-dom';

var Form = React.createClass({
  childContextTypes: {
    onFormSubmit: React.PropTypes.func
  },

  getChildContext() {
    return {
      onFormSubmit: this.props.onSubmit
    };
  },

  render () {
    return <div>{this.props.children}</div>
  }
});

var SubmitButton = React.createClass({
  contextTypes: {
    onFormSubmit: React.PropTypes.func
  },

  handleClick () {
    this.context.onFormSubmit();
  },

  render () {
    return <button onClick={this.handleClick}>{this.props.children}</button>
  }
});

var TextInput = React.createClass({
  contextTypes: {
    onFormSubmit: React.PropTypes.func
  },

  handleKeyDown (event) {
    if (event.key === 'Enter' || event.key === 'Space')
      this.context.onFormSubmit();
  },

  render () {
    return <input
      type="text"
      name={this.props.name}
      placeholder={this.props.placeholder}
      onKeyDown={this.handleKeyDown}
    />;
  }
});

var App = React.createClass({

  handleSubmit () {
    alert('YOU WIN!')
  },

  render () {
    return (
      <div>
        <h1>This isn’t even my final <code>&lt;Form/&gt;</code>!</h1>

        <Form onSubmit={this.handleSubmit}>
          <p>
            <TextInput name="firstName" placeholder="First Name"/> {' '}
            <TextInput name="lastName" placeholder="Last Name"/>
          </p>
          <p>
            <SubmitButton>Submit</SubmitButton>
          </p>
        </Form>
      </div>
    );
  }
});

render(<App/>, document.getElementById('app'))

