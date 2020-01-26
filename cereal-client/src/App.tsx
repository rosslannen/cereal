import React from 'react';
import {useState} from 'react';
import './App.scss';
import Header from './Header';
import PortSelection from './PortSelection';
import Main from './Main';
import PortInfo from './PortInfo';
import { PortSettings } from './PortSettings';

const App: React.FC = () => {
  const [ports, setPorts] = useState<PortInfo[]>([]);
  const [selectedPortName, setSelectedPortName] = useState<string | undefined>();
  const [portSettings, setPortSettings] = useState<PortSettings>(new PortSettings());

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid-container">
      <Header />
      <PortSelection
        ports={ports}
        setPorts={setPorts}
        selectedPortName={selectedPortName}
        setSelectedPortName={setSelectedPortName}
      />
      <Main
        selectedPortName={selectedPortName}
        portSettings={portSettings}
        setPortSettings={setPortSettings}
      />
    </div>
  );
}

export default App;
