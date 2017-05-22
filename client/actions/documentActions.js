import axios from '../utils/index';

/**
 * 
 * 
 * @export
 * @param {any} event 
 * @returns 
 */
export function createDocument(event) {
  return (dispatch) => {
    axios.post('/api/documents', event)
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
 * @export
 * @param {number} [offset=0] 
 * @returns 
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
 * @export
 * @param {any} id 
 * @returns 
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
 * @export
 * @param {any} id 
 * @returns 
 */
export function deleteDocument(id) {
  return (dispatch) => {
    axios.delete(`/api/documents/${id}`)
      .then((req) => {
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
 * @export
 * @param {any} document 
 * @returns 
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
 * @export
 * @param {any} id 
 * @returns 
 */
export function getSingleDocument(id) {
  return (dispatch) => {
    axios.get(`api/documents/${id}`)
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
