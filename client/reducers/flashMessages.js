import shortid from 'shortid';
import { Add_FLASH_MESSAGE } from '../actions/types';

export default(state = [], action = {}) => {
  switch (action.type) {
    case Add_FLASH_MESSAGE:
      return [
        ...state,
        {
          type: action.message.type,
          text: action.message.text,
          id: shortid.generate()
        }
      ];
    default: return state;
  }
};
