import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import Topbar from './components/Topbar';
import Messenger from './components/Messenger';
import Landing from './components/Landing';
import './App.css';

function App() {
  const { isAuthenticated } = useAuth0()
  
  return (
    <Router>
      <Topbar />
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/chat" exact component={() => (isAuthenticated ? <Messenger/> : <Redirect to="/" />)} />
      </Switch>
    </Router>
  );
}

export default App;
