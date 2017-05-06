import React from 'react';
import NavigationBar from './NavigationBar';
import FlashMessagesList from './flash/FlashMessagesList';

const appStyle = {
  width: '100%',
};

class App extends React.Component {
  render() {
    return (
      <div className="container" style={appStyle}>
        <NavigationBar />
        <FlashMessagesList />
        {this.props.children}
      </div>
    );
  }
}

export default App;
