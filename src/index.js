import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Tarefa from './pages/tarefas';

import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/login';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

const rotas = (
  <Router>
    <div>
      <Switch>
      <Route exact path= '/' component={Login}/>
      <Route path= '/tarefa' component={Tarefa}/>
      </Switch>
    </div>
  </Router>
)


ReactDOM.render(
  rotas,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
