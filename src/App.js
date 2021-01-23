import React from 'react';
import { Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import FilmPage from './pages/FilmPage';

const App = () => {
  return (
    <div>
      <Header />
      <Route path='/' component={Home} exact />
      <Route path='/filmPage' component={FilmPage} exact />
    </div>
  );
}

export default App;
