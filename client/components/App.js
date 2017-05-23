import React from 'react';
import NavigationBar from './NavigationBar';
import Footer from '../../client/components/Footer';

const appStyle = {
  width: '100%',
};

/**
 * 
 * 
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {
  render() {
    return (
      <div>
        <div className="container body-wrapper" style={appStyle}>
          <NavigationBar />
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
