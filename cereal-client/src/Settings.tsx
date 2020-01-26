import React from 'react';
import { useState, ChangeEventHandler, Dispatch, SetStateAction } from 'react';
import { DataBits, FlowControl, Parity, StopBits, PortSettings } from './PortSettings';

const CUSTOM = "Custom";

const baudRateOptions = [
  1200,
  2400,
  4800,
  9600,
  19200,
  38400,
  57600,
  115200,
  CUSTOM,
];

const dataBitOptions = [
  DataBits.Five,
  DataBits.Six,
  DataBits.Seven,
  DataBits.Eight,
];

const flowControlOptions = [
  FlowControl.None,
  FlowControl.Software,
  FlowControl.Hardware,
];

const parityOptions = [
  Parity.None,
  Parity.Odd,
  Parity.Even,
];

const stopBitOptions = [
  StopBits.One,
  StopBits.Two,
];

const Settings: React.FC<{
  portSettings: PortSettings,
  setPortSettings: Dispatch<SetStateAction<PortSettings>>,
}> = ({portSettings, setPortSettings}) => {
  const [baudRateOption, setBaudRateOption] = useState<number | string>(portSettings.baudRate);
  const [customBaudRate, setCustomBaudRate] = useState(0);

  const handleBaudRateOptionChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = event.target.value;
    setBaudRateOption(value);

    if (value === CUSTOM) {
      setPortSettings(prev => ({ ...prev, baudRate: customBaudRate }));
    } else {
      const baudRate = parseInt(value, 10);
      if (isNaN(baudRate)) {
        throw Error(`Baud could not be converted to number: ${value}`);
      }
      setPortSettings(prev => ({ ...prev, baudRate }));
    }
  };

  const handleCustomBaudRateChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    let baudRate = parseInt(value, 10);
    if (isNaN(baudRate)) {
      baudRate = 0;
    }

    setCustomBaudRate(baudRate);

    if (baudRateOption === CUSTOM) {
      setPortSettings(prev => ({ ...prev, baudRate }));
    }
  };

  const handleDataBitsChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const dataBits = parseInt(event.target.value, 10);
    setPortSettings(prev => ({ ...prev, dataBits }));
  };

  const handleFlowControlChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const flowControl = parseInt(event.target.value, 10);
    setPortSettings(prev => ({ ...prev, flowControl }));
  };

  const handleParityOptions: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const parity = parseInt(event.target.value, 10);
    setPortSettings(prev => ({ ...prev, parity }));
  };

  const handleStopBits: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const stopBits = parseInt(event.target.value, 10);
    setPortSettings(prev => ({ ...prev, stopBits }));
  };

  return (
    <form>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">
            Baud Rate
          </label>
        </div>
        <div className="field-body">
          <div className="field is-grouped">
            <div className="control">
              <div className="select">
                <select
                  value={baudRateOption}
                  onChange={handleBaudRateOptionChange}
                >
                  {baudRateOptions.map(opt => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {baudRateOption === CUSTOM &&
             <div className="control">
               <input
                 className="input"
                 type="text"
                 value={customBaudRate}
                 onChange={handleCustomBaudRateChange}
               />
             </div>
            }
          </div>
        </div>
      </div>
      
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">
            Data Bits
          </label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <div className="select">
                <select
                  value={portSettings.dataBits}
                  onChange={handleDataBitsChange}
                >
                  {dataBitOptions.map(opt => (
                    <option key={opt} value={opt}>
                      {DataBits[opt]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">
            Flow Control
          </label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <div className="select">
                <select
                  value={portSettings.flowControl}
                  onChange={handleFlowControlChange}
                >
                  {flowControlOptions.map(opt => (
                    <option key={opt} value={opt}>
                      {FlowControl[opt]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">
            Parity
          </label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <div className="select">
                <select
                  value={portSettings.parity}
                  onChange={handleParityOptions}
                >
                  {parityOptions.map(opt => (
                    <option key={opt} value={opt}>
                      {Parity[opt]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">
            Stop Bits
          </label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <div className="select">
                <select
                  value={portSettings.stopBits}
                  onChange={handleStopBits}
                >
                  {stopBitOptions.map(opt => (
                    <option key={opt} value={opt}>
                      {StopBits[opt]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Settings;
