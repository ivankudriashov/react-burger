import { AppDispatch, AppThunk, BASE_URL, checkResponse } from "./state";

export const GET_USER: 'GET_USER' = 'GET_USER';
export const CLEAN_USER: 'CLEAN_USER' = 'CLEAN_USER';

export function setCookie(name: string, value: string | boolean , props?: any) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
} 

export function getCookie(name: string ) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
} 

export function deleteCookie(name: string) {
  setCookie(name, false, { expires: -1 });
}

export const createUser: AppThunk = (form) => 
  (dispatch: AppDispatch) => {
    return fetch(`${BASE_URL}/auth/register`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form)
                  })
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        const authToken = res.accessToken.split('Bearer ')[1];

        setCookie('token', authToken);
        setCookie('refreshToken', res.refreshToken);

        dispatch({
          type: GET_USER,
          email: res.user.email,
          name: res.user.name
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
  };

  export const logIn: AppThunk = (data: {email: string, password: string }) => 
  (dispatch: AppDispatch) => {
    fetch(`${BASE_URL}/auth/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            })
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        const authToken = res.accessToken.split('Bearer ')[1];

        setCookie('token', authToken);
        setCookie('refreshToken', res.refreshToken);

        dispatch({
          type: GET_USER,
          email: res.user.email,
          name: res.user.name
        })
      } 
    })
    .catch((err) => {
      console.log(err)
    })
  }

  export const logOut: AppThunk = (refreshToken: string) =>
  (dispatch: AppDispatch) => {
    fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "token": `${refreshToken}`
    } )
    })
    .then(checkResponse)
    .then(res => {
      dispatch({
        type: CLEAN_USER,
        user: null
      })
      deleteCookie('token');
      deleteCookie('refreshToken');
    })
    .catch((err) => {
      console.log(err)
    })
  }

  export const getUserInfo: AppThunk = (accessToken: string, refreshToken: string) => 
  (dispatch: AppDispatch) => {
    fetch(`${BASE_URL}/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken ? accessToken : ''
      },
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.json());
      })
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_USER,
          email: res.user.email,
          name: res.user.name
        })
      } 
    })
    .catch((err) => {
      return err
    })
    .then((err) => {
      if (err && err.message === 'jwt expired') {
        fetch(`${BASE_URL}/auth/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "token": `${refreshToken}`
        } )
        })
        .then(checkResponse)
        .then((res) => {
          const authToken = res.accessToken.split('Bearer ')[1];
          const refToken = res.refreshToken;

          setCookie('token', authToken);
          setCookie('refreshToken', res.refreshToken);
          return getUserInfo(authToken, refToken)
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }


  export const changeUserData: AppThunk = (accessToken: string, data: {email: string, password: string,  name: string}) => 
  (dispatch: AppDispatch) => {
    fetch(`${BASE_URL}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken ? accessToken : ''
      },
      body: JSON.stringify(data)
    })
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_USER,
          email: res.user.email,
          name: res.user.name
        })
      } 
    })
    .catch((err) => {
      console.log(err)
    })
  }

  export const getResetPasswordCode: AppThunk = (email: {email: string;}, setSuccess) => 
  (dispatch: AppDispatch) => {
    fetch(`${BASE_URL}/password-reset`, {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json'
                          },
                      body: JSON.stringify(email)
                  })
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        setSuccess(true);
      } 
    })
    .catch((err) => {
      console.log(err)
    })
  };

  export const resetPassword: AppThunk = (data: {password: string, token: string }) => 
  (dispatch: AppDispatch) => {
    fetch(`${BASE_URL}/password-reset/reset`, {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json'
                          },
                      body: JSON.stringify(data)
                  })
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {  
        console.log(res)
      } 
    })
    .catch((err) => {
      console.log(err)
    })
  };
