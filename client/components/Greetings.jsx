import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import DashBoardPage from './DashBoardPage.jsx';
import Picture from './picture/as.png';

/**
 *
 * React component for
 * @class Greetings
 * @extends {React.Component}
 */
class Greetings extends React.Component {

  /**
   * Creates an instance of Greetings.
   * Constructor
   * @param {object} props - props of the component
   *
   * @memberOf Greetings
   */
  constructor(props) {
    super(props);
    this.state = { imageStatus: 'loading' };
    this.handleImageLoaded = this.handleImageLoaded.bind(this);
    this.handleImageErrored = this.handleImageErrored.bind(this);
  }

  /**
   *
   * handleImageLoaded
   *
   *  @returns {void}
   *
   * @memberOf Greetings
   */
  handleImageLoaded() {
    this.setState({ imageStatus: '' });
  }

  /**
   * handleImageErrored
   * @returns {void}
   *
   * @memberOf Greetings
   */
  handleImageErrored() {
    this.setState({ imageStatus: 'failed to load' });
  }

  /**
   *
   *
   * @returns {object} react components to render
   *
   * @memberOf Greetings
   */
  render() {
    const authenticated = this.props.login.isAuthenticated;
    return (
      <div>
        {authenticated ? <DashBoardPage /> :
        <div className="col horizontal">
          <div className="card  horizontal">
            <div className="card-image">
              <img
                src={Picture} height="600"
                alt="dashboard pciture"
                onLoad={this.handleImageLoaded}
                onError={this.handleImageErrored}
              />
            </div>
            <div className="card-content">
              <h1 className="card-title black-text">
                Managing And Organizing Of Documents Just Got Better</h1>
            </div>
            {this.state.imageStatus}
          </div>
        </div>}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  login: state.login
});

Greetings.propTypes = {
  login: propTypes.object.isRequired,
};


export default connect(mapStateToProps, null)(Greetings);
