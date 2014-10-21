/**
 * @jsx React.DOM
 */

var TestReact = React.createClass({
  render: function() {
    return (
      <h1 className="welcome">Welcome to your react.js code playground!</h1>
    )
  }
});

React.renderComponent(
  <TestReact/>,
  document.getElementById('app')
);
