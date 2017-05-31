import { LOAD_DOCUMENTS, USER_DOCUMENT, CREATE_DOCUMENT, UPDATE_DOCUMENT, SET_SINGLE_DOCUMENT, DELETE_DOCUMENT, SEARCH_DOCUMENT } from '../actions/types';

const initialState = {
  documents: [],
  pagination: {}
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_DOCUMENTS:
      return Object.assign({}, state, {
        documents: action.payload.documents, pagination: action.payload.pagination });

    case USER_DOCUMENT:
      return Object.assign({}, state, {
        documents: action.payload.documents,
        pagination: action.payload.pagination
      });

    case CREATE_DOCUMENT: {
      return Object.assign({}, state, {
        documents: [...state.documents, action.payload]
      });
    }

    case UPDATE_DOCUMENT:
      return Object.assign({}, state, {
        documents: [...state.documents.filter(document =>
          document.id !== action.payload.id),
          action.payload]
      });

    case SET_SINGLE_DOCUMENT:
      return Object.assign({}, state, action.payload
      );

    case DELETE_DOCUMENT:
      return Object.assign({}, state,
        { documents: state.documents
        .filter(document => document.id !== action.id) });

    case SEARCH_DOCUMENT:
      return Object.assign({}, state, {
        documents: action.payload.documents,
        pagination: action.payload.pagination
      });
    default:
      return state;
  }
};
