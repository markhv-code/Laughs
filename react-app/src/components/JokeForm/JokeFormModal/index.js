import { useState } from 'react';
import { Modal } from '../../../context/ModalAndAuth';
import JokeFormForModal from './JokeFormForModal';

export default function JokeFormModal({receiver}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button  className="w-1/12 rounded-lg bg-blue-joker hover:bg-opacity-50" onClick={() => setShowModal(true)}>
        <div> Edit</div>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <JokeFormForModal
            receiver={receiver}
            setShowModal={setShowModal}
          />
        </Modal>
      )}
    </>
  );
}
