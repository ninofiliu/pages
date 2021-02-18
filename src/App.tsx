import React, { useState } from 'react';
import './App.css';

export default () => {
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  return (
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
      </div>
      <div className={`menu ${menuOpened ? '--opened' : '--hidden'}`} />
    </div>
  );
};
