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
      return Object.assign({}, state, { document: [...state.documents, action.payload] });

    case 'UPDATE_DOCUMENT':
      {
        const u = [];
        state.documents.forEach((document) => {
          if (document.id === action.payload.id) {
            document = action.payload;
          }
          u.push(document);
        });
        return Object.assign({}, state, { documents: u });
      }

    case 'SET_SINGLE_DOCUMENT':
      return action.payload;

    case 'DELETE_DOCUMENT':
      return Object.assign({}, state,
      { documents: state.documents.filter(document => document.id !== action.id) });

    case 'SEARCH_DOCUMENT':
      return action.payload;
    default: return state;
  }
};
