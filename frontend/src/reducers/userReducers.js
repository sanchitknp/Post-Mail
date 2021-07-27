export const userLoginReducer = function (state = { userInfo: {} }, action) {
  switch (action.type) {
    case "USER_LOGIN_REQUEST": {
      return { loading: true };
    }
    case "USER_LOGIN_SUCCESS": {
      return {
        loading: false,
        userInfo: action.payload,
      };
    }
    case "USER_LOGIN_FAIL": {
      return { loading: false, error: action.payload };
    }
    case "USER_LOGOUT": {
      return { userInfo: action.payload };
    }
    default:
      return state;
  }
};

export const userUpdaterReducer = function (state = {}, action) {
  switch (action.type) {
    case "USER_UPDATE_REQUEST": {
      return { loading: true };
    }
    case "USER_UPDATE_SUCCESS": {
      return {
        success: true,
        loading: false,
        userInfo: action.payload,
      };
    }
    case "USER_UPDATE_FAIL": {
      return { loading: false, error: action.payload };
    }

    default:
      return state;
  }
};
