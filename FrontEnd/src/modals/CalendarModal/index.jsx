import React from 'react';
import Modal from 'react-modal';
import Calendar from 'components/Calendar';

Modal.setAppElement('#root'); // Specify the root element for accessibility

const CustomModal = ({ isOpen, onRequestClose, availability }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Availability Calendar"
  >
    <h2>Availability Calendar</h2>
    <Calendar availability={availability} />
    <button onClick={onRequestClose}>Close</button>
  </Modal>
);

export default CustomModal;
