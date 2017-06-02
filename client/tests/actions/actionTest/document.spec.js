// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import { expect } from 'chai';
// import nock from 'nock';
// import * as actions from '../../../actions/documentActions';
// import { CREATE_DOCUMENT, LOAD_DOCUMENTS,
//    USER_DOCUMENT, GET_SINGLE_DOCUMENT, DELETE_DOCUMENT,
//     UPDATE_DOCUMENT, SEARCH_DOCUMENT } from '../../../actions/types';


// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);
// const sampleDocument = {
//   title: 'Document test',
//   content: 'This is the documement action test',
//   access: 'public'
// };

// describe('DOCUMENT ACTIONS', () => {
//   after(() => {
//     nock.cleanAll();
//   });
//   describe('create document', () => {
//     const response = {
//       title: sampleDocument.title,
//       content: sampleDocument.content,
//       access: sampleDocument.access
//     };
//     after(() => {
//       nock.cleanAll();
//     });
//     it('should create document', () => {
//       nock('/api')
//         .post('/documents', sampleDocument)
//         .reply(201, response);

//       const expectedActions = [
//         { type: CREATE_DOCUMENT },
//       ];
//       const store = mockStore({
//         sampleDocument: {},
//       });
//       store.dispatch(actions.createDocument(sampleDocument));
//       console.log(store.getActions(), 'dfghjkl;');
//       expect(store.getActions()[0].type)
//         .to.eql(expectedActions[0].type);
//     });
//   });
// });
