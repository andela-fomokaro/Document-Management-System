import expect from 'expect';
import documents from '../../reducers/documents';

import {
   LOAD_DOCUMENTS,
   USER_DOCUMENT,
   CREATE_DOCUMENT,
   UPDATE_DOCUMENT,
   SET_SINGLE_DOCUMENT,
   DELETE_DOCUMENT,
   SEARCH_DOCUMENT
} from '../../actions/types';

describe('Document Reducers', () => {
  it('should load all documents when passed LOAD_DOCUMENTS', () => {
    // arrange
    const state = [];
    const allDocuments = {
      pagination: {
        page_count: 1,
        page: 1,
        page_size: 1,
        total_count: 2
      },
      documents: [
        {
          id: 1,
          title: 'Title',
          content: 'Cumque dolorum laborum sint id. Error cumque ipsa\n      culpa est delectus dolores consequatur et laudantium.\n      Est enim facilis ad occaecati iusto qui. Et rerum tempora eius et\n      quae eveniet. Ut adipisci ut occaecati id assumenda nihil.\n      Eos repudiandae est sed qui est sapiente temporibus dolorem.',
          access: 'public',
          createdAt: '2017-05-23T09:24:47.454Z',
          updatedAt: '2017-05-29T15:05:16.096Z'
        },
        {
          id: 2,
          title: 'Hi',
          content: 'Voluptatem id sed odio possimus nobis modi nihil ea corporis. Eligendi ea est in voluptatum et omnis voluptas. Earum aut accusamus sed. Eum ea eos non asperiores. Iste hic non animi verit',
          access: 'private',
          createdAt: '2017-05-23T09:24:47.455Z',
          updatedAt: '2017-06-06T17:42:01.284Z'
        },
      ]
    };

    const expectedState =
      {
        pagination: {
          page_count: 1,
          page: 1,
          page_size: 1,
          total_count: 2
        },
        documents: [
          {
            id: 1,
            title: 'Title',
            content: 'Cumque dolorum laborum sint id. Error cumque ipsa\n      culpa est delectus dolores consequatur et laudantium.\n      Est enim facilis ad occaecati iusto qui. Et rerum tempora eius et\n      quae eveniet. Ut adipisci ut occaecati id assumenda nihil.\n      Eos repudiandae est sed qui est sapiente temporibus dolorem.',
            access: 'public',
            createdAt: '2017-05-23T09:24:47.454Z',
            updatedAt: '2017-05-29T15:05:16.096Z'
          },
          {
            id: 2,
            title: 'Hi',
            content: 'Voluptatem id sed odio possimus nobis modi nihil ea corporis. Eligendi ea est in voluptatum et omnis voluptas. Earum aut accusamus sed. Eum ea eos non asperiores. Iste hic non animi verit',
            access: 'private',
            createdAt: '2017-05-23T09:24:47.455Z',
            updatedAt: '2017-06-06T17:42:01.284Z'
          },
        ]
      };
    const action = { type: LOAD_DOCUMENTS, payload: allDocuments };

    // act
    const newState = documents(state, action);

    expect(newState).toEqual(expectedState);
  });

  it('should add document when passed CREATE_DOCUMENT', () => {
    // arrange
    const initialState = {
      pagination: {
        page_count: 1,
        page: 1,
        page_size: 1,
        total_count: 2
      },
      documents: [
        {
          id: 1,
          title: 'Title',
          content: 'Cumque dolorum laborum sint id. Error cumque ipsa\n      culpa est delectus dolores consequatur et laudantium.\n      Est enim facilis ad occaecati iusto qui. Et rerum tempora eius et\n      quae eveniet. Ut adipisci ut occaecati id assumenda nihil.\n      Eos repudiandae est sed qui est sapiente temporibus dolorem.',
          access: 'public',
          createdAt: '2017-05-23T09:24:47.454Z',
          updatedAt: '2017-05-29T15:05:16.096Z'
        },
        {
          id: 2,
          title: 'Hi',
          content: 'Voluptatem id sed odio possimus nobis modi nihil ea corporis. Eligendi ea est in voluptatum et omnis voluptas. Earum aut accusamus sed. Eum ea eos non asperiores. Iste hic non animi verit',
          access: 'private',
          createdAt: '2017-05-23T09:24:47.455Z',
          updatedAt: '2017-06-06T17:42:01.284Z'
        },
      ]
    };
    const newDocument = { title: 'My Diary', access: 'public', content: 'yaay this created me' };

    const expectedState = {
      pagination: {
        page_count: 1,
        page: 1,
        page_size: 1,
        total_count: 2
      },
      documents: [
        {
          id: 1,
          title: 'Title',
          content: 'Cumque dolorum laborum sint id. Error cumque ipsa\n      culpa est delectus dolores consequatur et laudantium.\n      Est enim facilis ad occaecati iusto qui. Et rerum tempora eius et\n      quae eveniet. Ut adipisci ut occaecati id assumenda nihil.\n      Eos repudiandae est sed qui est sapiente temporibus dolorem.',
          access: 'public',
          createdAt: '2017-05-23T09:24:47.454Z',
          updatedAt: '2017-05-29T15:05:16.096Z'
        },
        {
          id: 2,
          title: 'Hi',
          content: 'Voluptatem id sed odio possimus nobis modi nihil ea corporis. Eligendi ea est in voluptatum et omnis voluptas. Earum aut accusamus sed. Eum ea eos non asperiores. Iste hic non animi verit',
          access: 'private',
          createdAt: '2017-05-23T09:24:47.455Z',
          updatedAt: '2017-06-06T17:42:01.284Z'
        },
        {
          title: 'My Diary',
          content: 'yaay this created me',
          access: 'public'
        },
      ]
    };
    const action = { type: CREATE_DOCUMENT, payload: newDocument };

    // act
    const newState = documents(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it('should load single document when passed SET_SINGLE_DOCUMENT', () => {
// arrange
    const state = [];
    const allDocuments = {
      documents: [
        {
          id: 1,
          title: 'Title',
          content: 'Cumque dolorum laborum sint id. Error cumque ipsa\n      culpa est delectus dolores consequatur et laudantium.\n      Est enim facilis ad occaecati iusto qui. Et rerum tempora eius et\n      quae eveniet. Ut adipisci ut occaecati id assumenda nihil.\n      Eos repudiandae est sed qui est sapiente temporibus dolorem.',
          access: 'public',
          createdAt: '2017-05-23T09:24:47.454Z',
          updatedAt: '2017-05-29T15:05:16.096Z'
        },
      ]
    };
    const expectedState =
      {
        documents: [
          {
            id: 1,
            title: 'Title',
            content: 'Cumque dolorum laborum sint id. Error cumque ipsa\n      culpa est delectus dolores consequatur et laudantium.\n      Est enim facilis ad occaecati iusto qui. Et rerum tempora eius et\n      quae eveniet. Ut adipisci ut occaecati id assumenda nihil.\n      Eos repudiandae est sed qui est sapiente temporibus dolorem.',
            access: 'public',
            createdAt: '2017-05-23T09:24:47.454Z',
            updatedAt: '2017-05-29T15:05:16.096Z'
          },
        ]
      };
    const action = { type: SET_SINGLE_DOCUMENT, payload: allDocuments };
    // act
    const newState = documents(state, action);
    expect(newState).toEqual(expectedState);
  });

  it('should delete document when passed DELETE_DOCUMENT', () => {
    // arrange
    const initialState = {
      documents: [
        {
          id: 1,
          title: 'Title',
          content: 'Cumque dolorum laborum sint id. Error cumque ipsa\n      culpa est delectus dolores consequatur et laudantium.\n      Est enim facilis ad occaecati iusto qui. Et rerum tempora eius et\n      quae eveniet. Ut adipisci ut occaecati id assumenda nihil.\n      Eos repudiandae est sed qui est sapiente temporibus dolorem.',
          access: 'public',
          createdAt: '2017-05-23T09:24:47.454Z',
          updatedAt: '2017-05-29T15:05:16.096Z'
        },
        {
          id: 2,
          title: 'Hi',
          content: 'Voluptatem id sed odio possimus nobis modi nihil ea corporis. Eligendi ea est in voluptatum et omnis voluptas. Earum aut accusamus sed. Eum ea eos non asperiores. Iste hic non animi verit',
          access: 'private',
          createdAt: '2017-05-23T09:24:47.455Z',
          updatedAt: '2017-06-06T17:42:01.284Z'
        },
      ]
    };
    const id = 2;
    const action = { type: DELETE_DOCUMENT, id };

    const expectedState = {
      documents: [
        {
          id: 1,
          title: 'Title',
          content: 'Cumque dolorum laborum sint id. Error cumque ipsa\n      culpa est delectus dolores consequatur et laudantium.\n      Est enim facilis ad occaecati iusto qui. Et rerum tempora eius et\n      quae eveniet. Ut adipisci ut occaecati id assumenda nihil.\n      Eos repudiandae est sed qui est sapiente temporibus dolorem.',
          access: 'public',
          createdAt: '2017-05-23T09:24:47.454Z',
          updatedAt: '2017-05-29T15:05:16.096Z'
        }
      ]
    };

    // act
    const newState = documents(initialState, action);

    expect(newState).toEqual(expectedState);
  });


  it('should search through document document when passed SEARCH_DOCUMENT', () => {
    // arrange
    const initialState = {
      pagination: {
        page_count: 1,
        page: 1,
        page_size: 1,
        total_count: 2
      },
      documents: [
        {
          id: 1,
          title: 'Title',
          content: 'Cumque dolorum laborum sint id. Error cumque ipsa\n      culpa est delectus dolores consequatur et laudantium.\n      Est enim facilis ad occaecati iusto qui. Et rerum tempora eius et\n      quae eveniet. Ut adipisci ut occaecati id assumenda nihil.\n      Eos repudiandae est sed qui est sapiente temporibus dolorem.',
          access: 'public',
          createdAt: '2017-05-23T09:24:47.454Z',
          updatedAt: '2017-05-29T15:05:16.096Z'
        },
        {
          id: 2,
          title: 'Hi',
          content: 'Voluptatem id sed odio possimus nobis modi nihil ea corporis. Eligendi ea est in voluptatum et omnis voluptas. Earum aut accusamus sed. Eum ea eos non asperiores. Iste hic non animi verit',
          access: 'private',
          createdAt: '2017-05-23T09:24:47.455Z',
          updatedAt: '2017-06-06T17:42:01.284Z'
        },
      ]
    };
    const searchTerm = {
      pagination: {
        page_count: 1,
        page: 1,
        page_size: 1,
        total_count: 1
      },
      documents: [
        {
          id: 1,
          title: 'Title',
          content: 'Cumque dolorum laborum sint id. Error cumque ipsa\n      culpa est delectus dolores consequatur et laudantium.\n      Est enim facilis ad occaecati iusto qui. Et rerum tempora eius et\n      quae eveniet. Ut adipisci ut occaecati id assumenda nihil.\n      Eos repudiandae est sed qui est sapiente temporibus dolorem.',
          access: 'public',
          createdAt: '2017-05-23T09:24:47.454Z',
          updatedAt: '2017-05-29T15:05:16.096Z'
        }
      ]
    };
    const action = { type: SEARCH_DOCUMENT, payload: searchTerm };

    const expectedState = {
      pagination: {
        page_count: 1,
        page: 1,
        page_size: 1,
        total_count: 1
      },
      documents: [
        {
          id: 1,
          title: 'Title',
          content: 'Cumque dolorum laborum sint id. Error cumque ipsa\n      culpa est delectus dolores consequatur et laudantium.\n      Est enim facilis ad occaecati iusto qui. Et rerum tempora eius et\n      quae eveniet. Ut adipisci ut occaecati id assumenda nihil.\n      Eos repudiandae est sed qui est sapiente temporibus dolorem.',
          access: 'public',
          createdAt: '2017-05-23T09:24:47.454Z',
          updatedAt: '2017-05-29T15:05:16.096Z'
        }
      ]
    };
    // act
    const newState = documents(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it('should update documents when passed UPDATE_DOCUMENT', () => {
    // arrange
    const allDocuments = {
      pagination: {
        page_count: 1,
        page: 1,
        page_size: 1,
        total_count: 2
      },
      documents: [
        {
          id: 1,
          title: 'Title',
          content: 'Cumque dolorum laborum sint id. Error cumque ipsa\n      culpa est delectus dolores consequatur et laudantium.\n      Est enim facilis ad occaecati iusto qui. Et rerum tempora eius et\n      quae eveniet. Ut adipisci ut occaecati id assumenda nihil.\n      Eos repudiandae est sed qui est sapiente temporibus dolorem.',
          access: 'public',
          createdAt: '2017-05-23T09:24:47.454Z',
          updatedAt: '2017-05-29T15:05:16.096Z'
        },
        {
          id: 2,
          title: 'Hi',
          content: 'Voluptatem id sed odio possimus nobis modi nihil ea corporis. Eligendi ea est in voluptatum et omnis voluptas. Earum aut accusamus sed. Eum ea eos non asperiores. Iste hic non animi verit',
          access: 'private',
          createdAt: '2017-05-23T09:24:47.455Z',
          updatedAt: '2017-06-06T17:42:01.284Z'
        },
      ]
    };

    const updateDocument = { id: '2', title: 'Did I Update' };
    const action = { type: UPDATE_DOCUMENT, payload: updateDocument };

    const expectedState =
      {
        pagination: {
          page_count: 1,
          page: 1,
          page_size: 1,
          total_count: 2
        },
        documents: [
          {
            id: 1,
            title: 'Title',
            content: 'Cumque dolorum laborum sint id. Error cumque ipsa\n      culpa est delectus dolores consequatur et laudantium.\n      Est enim facilis ad occaecati iusto qui. Et rerum tempora eius et\n      quae eveniet. Ut adipisci ut occaecati id assumenda nihil.\n      Eos repudiandae est sed qui est sapiente temporibus dolorem.',
            access: 'public',
            createdAt: '2017-05-23T09:24:47.454Z',
            updatedAt: '2017-05-29T15:05:16.096Z'
          },
          {
            id: 2,
            title: 'Hi',
            content: 'Voluptatem id sed odio possimus nobis modi nihil ea corporis. Eligendi ea est in voluptatum et omnis voluptas. Earum aut accusamus sed. Eum ea eos non asperiores. Iste hic non animi verit',
            access: 'private',
            createdAt: '2017-05-23T09:24:47.455Z',
            updatedAt: '2017-06-06T17:42:01.284Z'
          },
          {
            id: '2',
            title: 'Did I Update'
          }
        ]
      };
    // act
    const newState = documents(allDocuments, action);

    expect(newState).toEqual(expectedState);
  });

  it('should load all roles when passed USER_DOCUMENTS', () => {
    const state = [];
    const allDocuments = {
      pagination: {
        page_count: 1,
        page: 1,
        page_size: 1,
        total_count: 2
      },
      documents: [
        {
          id: 1,
          title: 'Title',
          content: 'Cumque dolorum laborum sint id. Error cumque ipsa\n      culpa est delectus dolores consequatur et laudantium.\n      Est enim facilis ad occaecati iusto qui. Et rerum tempora eius et\n      quae eveniet. Ut adipisci ut occaecati id assumenda nihil.\n      Eos repudiandae est sed qui est sapiente temporibus dolorem.',
          access: 'public',
          createdAt: '2017-05-23T09:24:47.454Z',
          updatedAt: '2017-05-29T15:05:16.096Z'
        },
        {
          id: 2,
          title: 'Hi',
          content: 'Voluptatem id sed odio possimus nobis modi nihil ea corporis. Eligendi ea est in voluptatum et omnis voluptas. Earum aut accusamus sed. Eum ea eos non asperiores. Iste hic non animi verit',
          access: 'private',
          createdAt: '2017-05-23T09:24:47.455Z',
          updatedAt: '2017-06-06T17:42:01.284Z'
        },
      ]
    };

    const expectedState =
      {
        pagination: {
          page_count: 1,
          page: 1,
          page_size: 1,
          total_count: 2
        },
        documents: [
          {
            id: 1,
            title: 'Title',
            content: 'Cumque dolorum laborum sint id. Error cumque ipsa\n      culpa est delectus dolores consequatur et laudantium.\n      Est enim facilis ad occaecati iusto qui. Et rerum tempora eius et\n      quae eveniet. Ut adipisci ut occaecati id assumenda nihil.\n      Eos repudiandae est sed qui est sapiente temporibus dolorem.',
            access: 'public',
            createdAt: '2017-05-23T09:24:47.454Z',
            updatedAt: '2017-05-29T15:05:16.096Z'
          },
          {
            id: 2,
            title: 'Hi',
            content: 'Voluptatem id sed odio possimus nobis modi nihil ea corporis. Eligendi ea est in voluptatum et omnis voluptas. Earum aut accusamus sed. Eum ea eos non asperiores. Iste hic non animi verit',
            access: 'private',
            createdAt: '2017-05-23T09:24:47.455Z',
            updatedAt: '2017-06-06T17:42:01.284Z'
          },
        ]
      };
    const action = { type: USER_DOCUMENT, payload: allDocuments };

    // act
    const newState = documents(state, action);

    expect(newState).toEqual(expectedState);
  });
});
