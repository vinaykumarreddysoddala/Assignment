import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
    classNames,
    handleOnClick,
    isDisabled,
    btnText,
    type
}) => (
        <button
            className={`btn ${classNames}`}
            onClick={handleOnClick}
            disabled={isDisabled}
            type={type}
        >
            {btnText}
        </button>
    );

Button.defaultProps = {
    classNames: '',
    handleOnClick: () => { },
    isDisabled: false,
    btnText: '',
    type: 'button'
};

Button.propTypes = {
    classNames: PropTypes.string,
    handleOnClick: PropTypes.func,
    isDisabled: PropTypes.bool,
    btnText: PropTypes.string,
    type: PropTypes.string
};

export default Button;