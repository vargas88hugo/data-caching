import React, { Fragment, useEffect } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Provider, connect } from 'react-redux';

import Header from './components/Header';
import Landing from './components/Landing';
import store from './store';
import { fetchUser } from './actions/auth';

const App = ({ fetchUser }) => {
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Header />
          <Route exact path="/" component={Landing} />
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default connect(null, { fetchUser })(App);
