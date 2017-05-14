import { browserHistory } from 'react-router';

const initialState = {
  documents: [],
  message: '',
  pagination: {}
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'LOAD_DOCUMENTS':
      return action.payload;
    case 'CREATE_DOCUMENT':
      browserHistory.push('/loadDocuments');
      return Object.assign({}, state, { document: [...state.document, action.payload] });
    case 'UPDATE_DOCUMENT':
      return Object.assign({}, state, { document: [...state.document, action.payload] });
    case 'GET_SINGLE_DOCUMENT':
      return action.payload;
    case 'DELETE_DOCUMENT':
      return Object.assign({}, state, { document: state.document.filter(document => document.id !== action.id) });
    default: return state;
  }
};
