import { useState } from 'react';
import { Modal } from '../../../context/ModalAndAuth';
import MessageFormForModal from './MessageFormForModal';

export default function MessageFormModal({receiver}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button  className="bg-green-joker rounded-lg p-1 m-2 hover:bg-opacity-50" onClick={() => setShowModal(true)}>
        <i className='fas fa-paw'> Message!</i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <MessageFormForModal
            receiver={receiver}
            setShowModal={setShowModal}
          />
        </Modal>
      )}
    </>
  );
}
