// Node impots
import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
// Own imports
import App from './components/App/App';
// CSS Style
import './index.css';

const aux = <SnackbarProvider maxSnack={3}>
                <App/>
            </SnackbarProvider>;

ReactDOM.render(aux, document.getElementById('root'));
