import { useState } from "react";
import Modal from "react-modal"

// Configuraciones del Modal
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root'); // Ese "root" es el "id=root" del "index.html" de React

export const CalendarModal = () => {
    const [isOpen, setisOpen] = useState(true)

    const onCloseModal = () => {
        // console.log('Cerrando modal')
        setisOpen(false)
    }

  return (
    <Modal
        isOpen={isOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
    >
        <h1>Hola mundo</h1>
        <hr />
        <p>Lorem ipmsun aliqua sint cio ipmsun aliqua sint cioipmsun aliqua sint cioipmsun aliqua sint cio</p>
    </Modal>
  )
}
