import React, { useState } from 'react';
import {
  BrowserRouter, Switch, Route, Link, Redirect,
} from 'react-router-dom';
import Home from './views/Home';
import ColorDistance from './views/color-distance/ColorDistance';
import './App.scss';

export default () => {
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  return (
    <BrowserRouter>
      <div className="App">
        <div className="content">
          <div className="content-header">
            <div className="title">
              <Switch>
                <Route exact path="/">Nino Filiu</Route>
                <Route path="/color-distance">Color Distance</Route>
              </Switch>
            </div>
            <button
              type="button"
              className="menu-toggle"
              onClick={() => setMenuOpened(!menuOpened)}
            >
              &#x2630;
            </button>
          </div>
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route path="/color-distance"><ColorDistance /></Route>
            <Route path="/*"><Redirect to="/" /></Route>
          </Switch>
        </div>
        <div className={`menu ${menuOpened ? '--opened' : '--hidden'}`}>
          <Link to="/" onClick={() => setMenuOpened(false)}>Home</Link>
          <Link to="/color-distance" onClick={() => setMenuOpened(false)}>Color Distance</Link>
        </div>
      </div>
    </BrowserRouter>
  );
};
