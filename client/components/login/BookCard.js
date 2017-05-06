import React from 'react';
import { connect } from 'react-redux';


class BookCard extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col s6 m7">
          <div className="card">
            <div className="card-image">
              <img src="../picture/dms.jpg" alt="document pictures" />
              <span className="card-title">DocStar Document Management System</span>
            </div>
            <div className="card-content">
              <p> We help you manage your documents, set your documents free!</p>
            </div>
            <div className="card-action">
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default connect(null)(BookCard);
