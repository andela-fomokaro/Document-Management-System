import React, { PropTypes } from 'react';
import DocumentRow from './DocumentRow';

let serial;

const DocumentList = ({ documents }) => {
  serial = 0;
  return (
    <table className="striped">
      <thead>
        <tr>
          <th> S/NO </th>
          <th> Title </th>
          <th> OwnerId </th>
          <th> Last Updated </th>
        </tr>
      </thead>
      <tbody>
        {documents.map(document => {
          serial += 1;
          return <DocumentRow key={document.id} document={document} serial={serial} />;
        })}
      </tbody>
    </table>
  );
};

DocumentList.propTypes = {
  documents: PropTypes.array.isRequired
};

export default DocumentList;