import React from 'react';
import PropTypes from 'prop-types';
// import DocumentBody from './DocumentBody';

let serial;

const DocumentList = ({ documents }) => {
  serial = 0;
  return (
    <table className="table-responsive">
      <thead>
        <tr>
          <th> S/NO </th>
          <th> Title </th>
          <th> OwnerId </th>
          <th> Last Updated </th>
        </tr>
      </thead>

    </table>
  );
};


export default DocumentList;
