import axios from 'axios';

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

export function loadDocuments() {
  return (dispatch) => {
    axios.get('/api/documents')
      .then((res) => {
        dispatch({
          type: 'LOAD_DOCUMENTS',
          payload: res.data
        });
      });
  };
}


export function getDocument(id) {
  return (dispatch) => {
    axios.get(`/api/documents/${id}`)
      .then((res) => {
         console.log(res.data);
        dispatch({
          type: 'GET_SINGLE_DOCUMENT',
          payload: res.data
        });
      });
  };
}


export function deleteDocument(id) {
  return (dispatch) => {
    axios.delete(`/api/documents/${id}`)
      .then((req, res) => {
        console.log(req.decoded, 'tifannnyjjjjjj we are here');
        dispatch({
          type: 'DELETE_DOCUMENT',
          id
        });
      });
  };
}

export function updateDocument(id) {
  return (dispatch) => {
    axios.put(`/api/documents/${id}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: 'UPDATE_DOCUMENT',
        payload: res.data.newDocument,
        id
      });
    });
  };
}
