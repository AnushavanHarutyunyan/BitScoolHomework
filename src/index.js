import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Example from './componets/example';

ReactDOM.render(
    <React.StrictMode>
        <App />
        {/* <Example data={new Date()} /> */}
    </React.StrictMode>,
    document.getElementById('root')
);
