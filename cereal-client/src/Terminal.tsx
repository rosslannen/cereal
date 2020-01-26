import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Terminal: React.FC<{
  selectedPortName: string | undefined,
}> = ({selectedPortName}) => {
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const disabled = selectedPortName === undefined;

  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <div className="control">
          <button className="button is-success is-outlined" disabled={disabled}>
            Open
          </button>
        </div>
      </div>
      
      <div className="field">
        <div className="control">
          <textarea
            rows={12}
            className="terminal textarea"
            readOnly
            value="Serial stuff"
            disabled={disabled}
          />
        </div>
      </div>
      
      <div className="field has-addons">
        <div className="control is-expanded">
          <input className="input" type="text" disabled={disabled} />
        </div>
        
        <div className="control">
          <button className="button is-primary" disabled={disabled}>
            <span className="icon">
              <FontAwesomeIcon icon={faPaperPlane} />
            </span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Terminal;
