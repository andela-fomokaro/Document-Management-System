// import axios from 'axios';
import axios from '../utils/index';

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
      .then((req) => {
        dispatch({
          type: 'DELETE_DOCUMENT',
          id
        });
      });
  };
}

export function updateDocument(document) {
  console.log(document);
  return (dispatch) => {
    axios.put(`/api/documents/${document.id}`, document)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: 'UPDATE_DOCUMENT',
        payload: res.data.updatedDocument,
        id: document.id
      });
    });
  };
}

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
