import axios from 'axios';
import Cookie from 'js-cookie';
import { GoogleLogin } from 'react-google-login';
export const axiosApiCall = (url, method, body = {}) => axios({
    method,
    url: `${process.env.REACT_APP_API_BASE_URL}${url}`,
    data: body,
  });
export default function Gauth() {
  const onGoogleSuccess = (response) => {
    const access_token = response.accessToken;
    axiosApiCall(
      '/auth/google',
      'post',
      { access_token }
    ).then((res) => {
      const { user, token } = res.data;
      Cookie.set('token', token);
    }).catch((err) => {
      throw new Error(err);
    })
  }
  const onGoogleFailure = () => {console.log("boomer")}
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#151a30',
      color: 'white'
    }}>
      <h1>Google Oauth Sign In</h1>
      <GoogleLogin 
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Sign in with Google"
        onSuccess={onGoogleSuccess}
        onFailure={onGoogleFailure}
        className="google-login-button" />
    </div>
  );
}