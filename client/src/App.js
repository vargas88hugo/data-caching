import React, { Fragment } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Header from './components/Header';
import Landing from './components/Landing';

const App = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Header />
        <Route exact path="/" component={Landing} />
      </Fragment>
    </BrowserRouter>
  );
};

export default App;
