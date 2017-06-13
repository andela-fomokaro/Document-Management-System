import axios from '../utils/index';
/**
 * Create Document Action
 *
 * @export createDocument
 * @param {object} data document content
 * @returns {function} returns dispatch
 */
export function createDocument(data) {
  return dispatch => axios.post('/api/documents', data)
      .then((res) => {
        dispatch({
          type: 'CREATE_DOCUMENT',
          payload: res.data.document,
        });
      });
}

/**
 * Load Documents Action
 *
 * @export loadDocuments
 * @param {number} [offset=0] document page difference
 * @returns {function} returns dispatch
 */
export function loadDocuments(offset = 0) {
  return dispatch => axios.get(`/api/documents?offset=${offset}`)
      .then((res) => {
        dispatch({
          type: 'LOAD_DOCUMENTS',
          payload: res.data,
        });
      });
}


/**
 * User Document Action
 *
 * @export usersDocument
 * @param {number} [offset=0] document page difference
 * @param {number} id - document id
 * @returns {function} returns dispatch
 */
export function usersDocument(offset = 0, id) {
  return dispatch => axios.get(`/api/users/${id}/documents?offset=${offset}`)
      .then((res) => {
        dispatch({
          type: 'USER_DOCUMENT',
          payload: res.data,
        });
      });
}

/**
 * Get Document Action
 *
 * @export getDocument
 * @param {number} id document id
 * @returns {function} returns dispatch
 */
export function getDocument(id) {
  return dispatch => axios.get(`/api/documents/${id}`)
      .then((res) => {
        dispatch({
          type: 'GET_SINGLE_DOCUMENT',
          payload: res.data,
        });
      });
}


/**
 * Delete Document Action
 *
 * @export deleteDocument
 * @param {number} id document id
 * @returns {function} returns dispatch
 */
export function deleteDocument(id) {
  return dispatch => axios.delete(`/api/documents/${id}`)
      .then(() => {
        dispatch({
          type: 'DELETE_DOCUMENT',
          id,
        });
      });
}


/**
 * Update Document Action
 *
 * @export  updateDocument
 * @param {object} document document content
 * @returns {function} returns dispatch
 */
export function updateDocument(document) {
  return dispatch => axios.put(`/api/documents/${document.id}`, document)
    .then((res) => {
      dispatch({
        type: 'UPDATE_DOCUMENT',
        payload: res.data.documentUpdate,
        id: document.id,
      });
    });
}

/**
 * Get Single Document Action
 *
 * @export getSingleDocument
 * @param {number} id document id
 * @returns {function} returns dispatch
 */
export function getSingleDocument(id) {
  return (dispatch) => {
    axios.get(`/api/documents/${id}`)
    .then((res) => {
      dispatch(
        {
          type: 'SET_SINGLE_DOCUMENT',
          payload: res.data.document,
        },
      );
    });
  };
}

/**
 *
 * Search Document Action
 * @export searchDocument
 * @param {string} term search term
 * @param {number} [offset=0] document page difference
 * @returns {Function} returns dispatch
 */
export function searchDocument(term, offset = 0) {
  return dispatch => axios.get(`/api/search/documents?search=${term}&offset=${offset}`)
      .then((res) => {
        dispatch({
          type: 'SEARCH_DOCUMENT',
          payload: res.data,
        });
      })
      .catch(() => {
        dispatch({
          type: 'SEARCH_DOCUMENT',
          payload: {
            pagination: 0,
            documents: [],
          },
        });
      });
}
/**
 * Search Document Action
 *
 * @export searchDocument
 * @param {string} term search term
 * @param {number} [offset=0] document page difference
 * @returns {function} returns dispatch
 */
export function searchUsersDocument(term, offset = 0) {
  return dispatch => axios.get(`/api/documentsearch/documents?search=${term}&offset=${offset}`)
      .then((res) => {
        dispatch({
          type: 'SEARCH_MY_DOCUMENT',
          payload: res.data,
        });
      })
      .catch(() => {
        dispatch({
          type: 'SEARCH_MY_DOCUMENT',
          payload: {
            pagination: 0,
            documents: [],
          },
        });
      });
}
