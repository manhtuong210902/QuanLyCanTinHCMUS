import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

function CustomModal({ show, setShow, title, body, textPrimary, textSecondary }) {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/sign');
    };

    const handleClose = () => {
        setShow(false);
    };

    return (
        <Modal show={show}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} variant="secondary">
                    {textSecondary}
                </Button>
                <Button onClick={handleLogin} variant="primary">
                    {textPrimary}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CustomModal;
