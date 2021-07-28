import axios from "axios";

export const login = (code) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_LOGIN_REQUEST",
    });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://localhost:5000/auth/google",
      {
        code,
      },
      config
    );

    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const logout = () => (dispatch) => {
  dispatch({
    type: "USER_LOGOUT",
    payload: {},
  });
  localStorage.removeItem("userInfo");
};

export const sendMail =
  (googleId, email, subject, content) => async (dispatch) => {
    try {
      dispatch({
        type: "SEND_EMAIL_REQUEST",
      });
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.put(
        "http://localhost:5000/send",
        {
          googleId,
          email,
          subject,
          content,
        },
        config
      );

      dispatch({
        type: "SEND_EMAIL_SUCCESS",
        payload: data,
      });
      const userInfoStorage = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;
      if (userInfoStorage) {
        userInfoStorage.mailhistory.push(data);
        localStorage.setItem("userInfo", JSON.stringify(userInfoStorage));
      } else {
        dispatch({ type: "SEND_EMAIL_FAIL", payload: "User not logged in" });
      }
    } catch (error) {
      dispatch({
        type: "SEND_EMAIL_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateUserDetails = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_UPDATE_REQUEST",
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",

        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/user/profile`, user, config);
    dispatch({
      type: "USER_UPDATE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "USER_UPDATE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
