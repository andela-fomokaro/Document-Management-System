import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import propTypes from 'prop-types';
import DashBoardPage from './DashBoardPage.jsx';
import Picture from './picture/best-online-document-collaboration-tools-electronic-document-management.-Business-World.jpg';

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
                src={Picture} height="400"
                alt="dashboard picture"
                onLoad={this.handleImageLoaded}
                onError={this.handleImageErrored}
              />
            </div>
            <div className="card-content">
              <h1 id="greetings"className="card-title greeting-text">
                Managing And Organizing Of Documents Just Got Better</h1>
            </div>
            {this.state.imageStatus}
          </div>
          <div className="container">
          <div className="card-action">
           <h1 className="card-title greetings-header">Docstar Document Management System</h1>
           <p className="greetings-paragraph"> With docstar management system, authorized users can : </p>
           <div className="greeting-paragraph">
             <ol>
               <li> View other users public documents, </li>
               <li> Create Documents with access rights, </li>
               <li> Update documents, </li>
               <li> Search through documents, </li>
               <li> Delete un-wanted documents,</li>
               <li> Also users signed up on the platform can view exsiting users profile </li>
               <li> Users have equal access rights.</li>
            </ol>
           </div>
          <p> What are you waiting for ? <Link className="red-text" to="/signup">Sign Up today </Link></p>
          </div>
          </div>
        </div>}
      </div>
    );
  }
}
/**
 * This method map state to props
 * 
 * @returns {function} dispatch
 */
const mapStateToProps = state => ({
  login: state.login
});

Greetings.propTypes = {
  login: propTypes.object.isRequired,
};


export default connect(mapStateToProps, null)(Greetings);
