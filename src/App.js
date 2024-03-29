import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import Todo from './componets/pages/Todo/Todo';
import NavBar from './componets/NavBar/NavBar';
import Contact from './componets/pages/Contact/Contact';
import About from './componets/pages/About/About';
import NotFound from './componets/pages/NotFound/NotFound';
import { ToastContainer, toast } from 'react-toastify';
import '../src/App.css';
import SingleTask from './componets/SingleTask/SingleTask';
// import ProviderSingleTask from './componets/Context/ContactProvider/SingleTaskProvider';
// import SingleTaskWithReduce from './componets/SingleTask/SingleTaskWithReducer';

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
        path: '/error/:status',
        component: NotFound,
        exact: true,
    },
];

const App = (props) => {
    const { errorMessage, successMessage } = props;
    useEffect(() => {
        errorMessage &&
            toast.error(`${errorMessage} `, {
                position: 'bottom-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
    }, [errorMessage]);
    useEffect(() => {
        successMessage &&
            toast.success(`${successMessage}`, {
                position: 'bottom-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
    }, [successMessage]);

    const pagesJSX = pages.map((item, indx) => {
        if (item.path === '/task/:id') {
            return (
                <Route
                    key={indx}
                    path={item.path}
                    render={(props) => (
                        <item.component {...props} />
                        // <SingleTaskWithReduce {...props} />
                        // <ProviderSingleTask {...props}>
                        //     <item.component {...props} />
                        // </ProviderSingleTask>
                    )}
                    exact={item.exact}
                />
            );
        }
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
                <Redirect to="/error/404" />
            </Switch>
            <ToastContainer />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        errorMessage: state.globalState.errorMessage,
        successMessage: state.globalState.successMessage,
    };
};

export default connect(mapStateToProps, null)(App);
