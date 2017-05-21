import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSingleUser } from '../../actions/usersAction';


/**
 * 
 * 
 * @class DashboardOnboarding
 * @extends {React.Component}
 */
class DashboardOnboarding extends React.Component {

  /**
   * 
   * 
   * 
   * @memberOf DashboardOnboarding
   */
  componentDidMount() {
    this.props.getSingleUser();
  }

  /**
   * 
   * 
   * @returns 
   * 
   * @memberOf DashboardOnboarding
   */
  render() {
    const { fullNames } = this.props.userInfo;
    return (
      <div className="container">
        <div className="z-depth-5 card onboardingCard">
          <div className="card-content cardContent">
            <span className="card-title header">Welcome {fullNames}</span>
            <p className="card-title cardTitle">Quick Tips On How To Onboard Quickly</p>
            <ol>
              <li className="onboardingList listPadding left">Click On The Black
                Round Button On The Left To View Navigation Links</li>
              <li className="onboardingList listPadding left">To View Your Profile,
                Click On  My Profile Link Located On The Navigation Pane</li>
              <li className="onboardingList listPadding left">To Create And Manage Your Document,
                Click On  Manage Document Link Located
                On The Navigation Pane To Manage Documents</li>
              <li className="onboardingList listPadding left">To Get Information
                About DocStar, Click On About DocStar
                Link Located On The Navigation Pane To Get Information</li>
              <li className="onboardingList listPadding left">T
                o Log Out Click The Logout Link On The Navigation Link</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

DashboardOnboarding.propTypes = {
  userInfo: PropTypes.any.isRequired,
  getSingleUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  getSingleUser: bindActionCreators(getSingleUser, dispatch),
});

/**
 * 
 * 
 * @param {any} state 
 * @returns 
 */
function mapStateToProps(state) {
  return {
    userInfo: state.users
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(DashboardOnboarding);
