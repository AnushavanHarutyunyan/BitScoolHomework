import React from 'react';
import Todo from './componets/Todo/Todo';
// import NavBar from './componets/NavBar/NavBar';
import '../src/App.css';

class App extends React.Component {
    render() {
        return (
            <>
                {/* <NavBar /> */}
                <Todo />
            </>
        );
    }
}

export default App;
