import React from 'react';
import { Modal } from '../../atoms/Modal';
import Button from '../../atoms/Button';

const DeleteFriend = ({ handleClose, handleDelete, show }) => {
    const deleteModalStyle = {
        top: '20%',
        left: '50%',
        padding: '20px'
    }
    return (
        <Modal style={deleteModalStyle} show={show} handleClose={handleClose}>
            <h3>Delete</h3>
            <p>Are you sure you want to delete?</p>
            <div className="btn-container">
                <Button btnText="Cancel" classNames="btn-cancel" handleOnClick={handleClose} />
                <Button btnText="Yes" classNames="btn-primary" handleOnClick={handleDelete} />
            </div>
        </Modal>
    );
};

export default DeleteFriend;
