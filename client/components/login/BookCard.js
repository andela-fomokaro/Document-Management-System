import React from 'react';
import { connect } from 'react-redux';


/**
 * 
 * 
 * @class BookCard
 * @extends {React.Component}
 */
class BookCard extends React.Component {

  /**
   * 
   * 
   * @returns 
   * 
   * @memberOf BookCard
   */
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
          </div>
        </div>
      </div>
    );
  }
}


export default connect(null)(BookCard);
