/* eslint-disable react/prefer-stateless-function*/
import React from 'react';
import PropTypes from 'prop-types';
import NavigationBar from './NavigationBar.jsx';
import Footer from '../../client/components/Footer.jsx';



/**
 * React component for
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {
  /**
   *
   *
   * @returns {object} react componenents to render
   *
   * @memberOf App
   */
  render() {
    return (
      <div>
        <div className="body-wrapper">
          <NavigationBar />
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}


export default App;
