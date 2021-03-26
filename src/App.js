import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Todo from './componets/pages/Todo/Todo';
import NavBar from './componets/NavBar/NavBar';
import Contact from './componets/pages/Contact/Contact';
import About from './componets/pages/About/About';
import NotFound from './componets/pages/NotFound/NotFound';
import '../src/App.css';
import SingleTask from './componets/SingleTask/SingleTask';

const pages = [
    {
        path: '/',
        component: Todo,
        exact: true,
    },
    {
        path: '/contact',
        component: Contact,
        exact: true,
    },
    {
        path: '/about',
        component: About,
        exact: true,
    },
    {
        path: '/task/:id',
        component: SingleTask,
        exact: true,
    },
    {
        path: '/404',
        component: NotFound,
        exact: true,
    },
];

class App extends React.Component {
    render() {
        const pagesJSX = pages.map((item, indx) => {
            return (
                <Route
                    key={indx}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                />
            );
        });
        return (
            <>
                <NavBar />
                <Switch>
                    {pagesJSX}
                    <Redirect to="/404" />
                </Switch>
            </>
        );
    }
}

export default App;
