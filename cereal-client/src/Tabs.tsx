import React from 'react';
import { Dispatch, SetStateAction } from 'react';
import Tab from './Tab';
import classNames from 'classnames';

const Tabs: React.FC<{
  tab: Tab,
  setTab: Dispatch<SetStateAction<Tab>>,
}> = ({tab, setTab}) => {
  const terminalClasses = classNames({'is-active': tab === Tab.Terminal});
  const portSettingsClasses = classNames({'is-active': tab === Tab.Settings});

  const switchToTerminal = () => {
    setTab(Tab.Terminal);
  };

  const switchToPortSettings = () => {
    setTab(Tab.Settings);
  };

  return (
    <nav className="tabs">
      <ul>
        <li className={terminalClasses}>
          <a onClick={switchToTerminal}>
            Terminal
          </a>
        </li>

        <li className={portSettingsClasses}>
          <a onClick={switchToPortSettings}>
            Port Settings
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Tabs;
