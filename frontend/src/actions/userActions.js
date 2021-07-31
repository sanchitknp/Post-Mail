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
  (from, emails, subject, content, date, month, hours, minutes) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: "SEND_EMAIL_REQUEST",
      });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/send",
        {
          from,
          emails,
          subject,
          content,
          date,
          month,
          hours,
          minutes,
        },
        config
      );
      userInfo.mailhistory = data;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      dispatch({
        type: "SEND_EMAIL_SUCCESS",
        payload: data,
      });
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
