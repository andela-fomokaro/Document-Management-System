import React from 'react';
import { connect } from 'react-redux';


class Footer extends React.Component {
  render() {
    return (
      <footer className="page-footer blue-grey darken-4 footer">
        <div className="footer-copyright">
            <div className="container">
            © 2017 DocStar | All Rights Reserved | Document Management System
            <a className="grey-text text-lighten-4 right" href="#!">Help Line (+234-672391083, +299-031452)</a>
            </div>
          </div>
      </footer>

    );
  }
}


export default connect(null)(Footer);
