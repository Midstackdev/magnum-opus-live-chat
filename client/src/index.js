import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react'
import keys from './config/keys'

const domain = keys.REACT_APP_AUTH0_DOMAIN
const clientId = keys.REACT_APP_AUTH0_CLIENT_ID
// console.log(keys)

const onRedirectCallback = () => {
  // window.location.reload('/')
}

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    audience="https://live-chatty.com"
    redirectUri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);

