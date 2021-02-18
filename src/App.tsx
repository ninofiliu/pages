import React, { useState } from 'react';
import {
  BrowserRouter, Switch, Route, Link, Redirect,
} from 'react-router-dom';
import './App.scss';

const Home = () => <div>Home</div>;
const About = () => <div>About</div>;

export default () => {
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  return (
    <BrowserRouter>
      <div className="App">
        <div className="content">
          <div className="content-header">
            <div className="title">
              Nino Filiu
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
            <Route path="/about"><About /></Route>
            <Route path="/*"><Redirect to="/" /></Route>
          </Switch>
        </div>
        <div className={`menu ${menuOpened ? '--opened' : '--hidden'}`}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
    </BrowserRouter>
  );
};
