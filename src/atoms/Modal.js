import React from 'react';
import Button from './Button';

export const Modal = ({
    show,
    handleClose,
    children,
    style
}) => {
    const display = show ? 'block' : 'none';
    return (
        <div style={{ display: display }}>
            <div className="modal-container">
            </div>
            <div
                className="modal"
                style={style}>
                {children}
                <Button
                    classNames="modal-close"
                    handleOnClick={handleClose}
                    btnText="&times;"
                />
            </div>
        </div>
    );
};
