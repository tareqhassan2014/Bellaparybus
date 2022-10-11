import {
  ADD_SAVE_LOCATION,
  DELETE_SAVE_LOCATION,
  EDIT_SAVE_LOCATION,
  UPDATE_MY_ACCOUNT_USER_PROFILE
} from "../actionTypes";

const initialState = {
  loginInfo: {
      email: 'test.email@gmail.com'
  },
  userProfile: {
      firstName: '',
      lastName: '',
      company: '',
      phoneMobile: '',
      phoneWork: '',
      phoneHome: ''
  },
  savedLocations: []
}

const accountInfo = (state = initialState, action) => {
  switch (action.type) {
      case ADD_SAVE_LOCATION:
          return {
              ...state,
              savedLocations: [...state.savedLocations, action.payload]
          }

      case DELETE_SAVE_LOCATION:
          return {
              ...state,
              savedLocations: state.savedLocations.filter(({id}) => id !== action.payload.id)
          }

      case EDIT_SAVE_LOCATION:
          const savedLocations = [...state.savedLocations];
          const targetIndex = savedLocations.findIndex(({id}) => (id === action.payload.id));
          if (targetIndex > -1 ) {
              savedLocations[targetIndex] = action.payload
          }

          return {
              ...state,
              savedLocations
          }

      case UPDATE_MY_ACCOUNT_USER_PROFILE:
          return {
              ...state,
              userProfile: action.payload
          }
      default:
          return state;
  }
}

export default accountInfo;