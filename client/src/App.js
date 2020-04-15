import React, { Fragment } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Header from './components/Header';
import Landing from './components/Landing';
import store from './store';

const App = () => {
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

export default App;
