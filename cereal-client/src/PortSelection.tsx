import React from 'react';
import { SetStateAction, Dispatch } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { faUsb } from '@fortawesome/free-brands-svg-icons';
import PortInfo from './PortInfo';

const PortSelection: React.FC<{
  ports: PortInfo[],
  setPorts: Dispatch<SetStateAction<PortInfo[]>>,
  selectedPortName: string | undefined,
  setSelectedPortName: Dispatch<SetStateAction<string | undefined>>,
}> = ({ports, setPorts, selectedPortName, setSelectedPortName}) => {
  const refresh = () => {
    setPorts([
      new PortInfo("n1", 1, 2, "sn", "man", "pro"),
      new PortInfo("n2", 2, 3, "sn", "man", "pro"),
    ]);
  };

  return (
    <aside className="menu">
      <p className="menu-label">
        Available Ports
        {' '}
        <a onClick={refresh}>
          <span className="icon has-text-primary">
            <FontAwesomeIcon icon={faSync} />
          </span>
        </a>
      </p>
      
      <ul className="menu-list">
        {ports.map(port => {
          const isSelected = port.name === selectedPortName;
          const linkClasses = classNames({'is-active': isSelected});
          const iconClasses = classNames(
            'icon',
            isSelected ? 'has-text-white' : 'has-text-primary',
          );

          const selectPort = () => {
            setSelectedPortName(port.name);
          }
          
          return (
          <li>
            <a className={linkClasses} onClick={selectPort}>
              <span className={iconClasses}>
                <FontAwesomeIcon icon={faUsb} />
              </span>
              {' '}
              {port.name} - {port.product}
            </a>

            <ul>
              <li>PID/VID: {port.vid}/{port.pid}</li>
              <li>SN: {port.serialNumber}</li>
              <li>Man: {port.manufacturer}</li>
            </ul>
          </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default PortSelection;
