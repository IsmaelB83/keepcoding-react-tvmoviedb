import React from 'react';
import ReactDOM from 'react-dom';
// React-Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Own imports
import MovieDetail from './components/MovieDetail/MovieDetail';
import Form from './components/Form/Form';
import App from './components/App/App';
import Error404 from './components/Error404/Error404';
// CSS Style
import './index.css';


let reactComp = <Router>
                    <Switch>
                        <Route path='/movie/:id(\d+)' exact component={MovieDetail}/>
                        <Route path='/form' exact component={Form} />
                        <Route path={['/', '/index']} exact component={App} />
                        <Route component={Error404} />
                    </Switch>
                </Router>;
            

ReactDOM.render(reactComp, document.getElementById('root'));
