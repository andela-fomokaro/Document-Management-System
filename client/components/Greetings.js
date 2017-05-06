import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import DashBoardPage from './DashBoardPage';
import Picture from './picture/box.jpg';

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
    return (
      <div>
        {this.props.login.isAuthenticated ? <DashBoardPage /> :
        <div className="card">
          <div className="card-image">
            <img
              className="materialboxed"
              src={Picture} height="600"
              onLoad={this.handleImageLoaded.bind(this)}
              onError={this.handleImageErrored.bind(this)}
            />
            <h1 className="card-title purple-text bold">Managing And Organizing Of Documents Just Got Better</h1>
          </div>
          <div className="card-content">
            <p className="black-text"> I carefully evaluated every single document I disclosed to ensure that each was legitimately in the public interest.
               There are all sorts of documents that would have made a big impact that I didnt turn over,
                because harming people isnt my goal. Transparency is.</p>
          </div>
          {this.state.imageStatus}
        </div>}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  login: state.login
});

Greetings.propTypes = {
  login: propTypes.func.isRequired,
};


export default connect(mapStateToProps, null)(Greetings);
