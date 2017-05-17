import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import DashBoardPage from './DashBoardPage';
import Picture from './picture/as.png';

class Greetings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageStatus: 'loading' };
  }
  handleImageLoaded() {
    this.setState({ imageStatus: '' });
  }
  handleImageErrored() {
    this.setState({ imageStatus: 'failed to load' });
  }
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
                onLoad={this.handleImageLoaded.bind(this)}
                onError={this.handleImageErrored.bind(this)}
              />
            </div>
            <div className="card-content">
              <h1 className="card-title black-text">Managing And Organizing Of Documents Just Got Better</h1>
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
  login: propTypes.any.isRequired,
};


export default connect(mapStateToProps, null)(Greetings);
