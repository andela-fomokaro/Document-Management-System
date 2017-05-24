import axios from '../utils/index';

/**
 *
 *
 * @export createDocument
 * @param {object} data document content
 * @returns {Function} returns dispatch
 */
export function createDocument(data) {
  return (dispatch) => {
    axios.post('/api/documents', data)
      .then((res) => {
        dispatch({
          type: 'CREATE_DOCUMENT',
          payload: res.data.newDocument
        });
      });
  };
}

/**
 *
 *
 * @export loadDocuments
 * @param {number} [offset=0] document page difference
 * @returns {Function} returns dispatch
 */
export function loadDocuments(offset = 0) {
  return (dispatch) => {
    axios.get(`/api/documents?offset=${offset}`)
      .then((res) => {
        dispatch({
          type: 'LOAD_DOCUMENTS',
          payload: res.data
        });
      });
  };
}


/**
 *
 *
 * @export getDocument
 * @param {number} id document id
 * @returns {Function} returns dispatch
 */
export function getDocument(id) {
  return (dispatch) => {
    axios.get(`/api/documents/${id}`)
      .then((res) => {
        dispatch({
          type: 'GET_SINGLE_DOCUMENT',
          payload: res.data
        });
      });
  };
}


/**
 *
 *
 * @export deleteDocumen
 * @param {number} id document id
 * @returns {Function} returns dispatch
 */
export function deleteDocument(id) {
  return (dispatch) => {
    axios.delete(`/api/documents/${id}`)
      .then(() => {
        dispatch({
          type: 'DELETE_DOCUMENT',
          id
        });
      });
  };
}

/**
 *
 *
 * @export  updateDocument
 * @param {object} document document content
 * @returns {Function} returns dispatch
 */
export function updateDocument(document) {
  return (dispatch) => {
    axios.put(`/api/documents/${document.id}`, document)
    .then((res) => {
      dispatch({
        type: 'UPDATE_DOCUMENT',
        payload: res.data.updatedDocument,
        id: document.id
      });
    });
  };
}

/**
 *
 *
 * @export getSingleDocument
 * @param {number} id document id
 * @returns {Function} returns dispatch
 */
export function getSingleDocument(id) {
  return (dispatch) => {
    axios.get(`/api/documents/${id}`)
    .then((res) => {
      dispatch(
        {
          type: 'SET_SINGLE_DOCUMENT',
          payload: res.data.document,
        }
      );
    });
  };
}

/**
 *
 *
 * @export searchDocument
 * @param {string} term search term
 * @param {number} [offset=0] document page difference
 * @returns {Function} returns dispatch
 */
export function searchDocument(term, offset = 0) {
  return (dispatch) => {
    axios.get(`/api/search/documents?search=${term}&offset=${offset}`)
      .then((res) => {
        dispatch({
          type: 'SEARCH_DOCUMENT',
          payload: res.data
        });
      }).catch((error) => {
        Materialize.toast(error.data.message, 1000);
      });
  };
}
