import React from 'react';
import { Dispatch, SetStateAction } from 'react';
import {useState} from 'react';
import Terminal from './Terminal';
import Tabs from './Tabs';
import Tab from './Tab';
import Settings from './Settings';
import { PortSettings } from './PortSettings';

const Main: React.FC<{
  selectedPortName: string | undefined,
  portSettings: PortSettings,
  setPortSettings: Dispatch<SetStateAction<PortSettings>>,
}>= ({selectedPortName, portSettings, setPortSettings}) => {
  const [tab, setTab] = useState(Tab.Terminal);

  return (
    <main>
      <Tabs tab={tab} setTab={setTab} />
      
      {tab === Tab.Terminal && <Terminal selectedPortName={selectedPortName} />}
      {tab === Tab.Settings &&
       <Settings portSettings={portSettings} setPortSettings={setPortSettings} />
      }
    </main>
  );
};

export default Main;
