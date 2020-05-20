import React from 'react';
import ListPage from './pages/ListPage';
import TeamPage from './pages/TeamPage';
import LayoutComp from './components/LayoutComp';
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost';

function App() {
  return (
    <Router>
        <LayoutComp>
            <Switch>
              <Route path="/team/list" component={ListPage} />
              <Route path="/team/create" component={TeamPage} />
              <Route path="/team/:teamId/edit" component={TeamPage} />
              <Route path="*" render={() => <Redirect to='/team/list'/>} />
            </Switch>
        </LayoutComp>
    </Router>
  );
}

export default App;
