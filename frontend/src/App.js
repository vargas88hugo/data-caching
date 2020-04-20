import React, { Fragment, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './components/Header';
import Landing from './components/Landing';
import BlogNew from './components/blogs/BlogNew';
import Dashboard from './components/Dashboard';
import { fetchUser } from './actions/auth';

const App = ({ fetchUser }) => {
  useEffect(() => {
    fetchUser();
  });

  return (
    <Fragment>
      <Header />
      <section className="container">
        <Switch>
          <Route exact path="/blogs/new" component={BlogNew} />
          <Route exact path="/blogs" component={Dashboard} />
          <Route exact path="/" component={Landing} />
        </Switch>
      </section>
    </Fragment>
  );
};

export default connect(null, { fetchUser })(App);
