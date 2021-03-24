import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Todo from './componets/pages/Todo/Todo';
import NavBar from './componets/NavBar/NavBar';
import Contact from './componets/pages/Contact/Contact';
import About from './componets/pages/About/About';
import '../src/App.css';

class App extends React.Component {
    render() {
        return (
            <>
                <NavBar />
                <Switch>
                    <Route path="/" component={Todo} exact />
                    <Route path="/contact" component={Contact} exact />
                    <Route path="/about" component={About} exact />
                    <Redirect to="/" />
                </Switch>
                {/* <Todo />
                <Contact />
                <About /> */}
            </>
        );
    }
}

export default App;
