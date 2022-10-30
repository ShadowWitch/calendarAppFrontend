import { addHours, differenceInSeconds } from "date-fns";
import { useEffect, useState } from "react";
import Modal from "react-modal"

import Swal from 'sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css'

import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import { useMemo } from "react";
import { useCalendarStore, useUiStore } from "../../hooks";
registerLocale('es', es)


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

    const [formSubmitted, setFormSubmitted] = useState(false)
    const {isDateModalOpen, closeDateModal} = useUiStore()
    const {events, activeEvent, startSavingEvent} = useCalendarStore()

    const [formValue, setFormValue] = useState({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 2)
    })

    const onCloseModal = () => {
        // console.log('Cerrando modal')
        closeDateModal()
    }

    const onInputChange = ({target}) => {
      setFormValue({
        ...formValue,
        [target.name]: target.value
      })
    }

    const onDateChange = (event, changing) => {
      setFormValue({
        ...formValue,
        [changing]: event
      })
    }

    const onSubmit = async (e) => {
      e.preventDefault()

      setFormSubmitted(true); // Para "activar" que ya le dieron click al submit del form

      const {start, end} = formValue;
      // Primero le mandemos como parametro la "Fecha Mayor" y luego la menor
      // "differenceInSeconds" lo que hace que saca la diferencia en "segundos" entre 2 fechas
      // Si le mandamos la menor de primero y la mayor de segundo dara resultado negativo. Y si no le mandamos una de las dos dara como resultado "NaN"
      const difference = differenceInSeconds(end, start)

      // console.log(start)
      // console.log(end)

      // Si da true entonces NO es un numero
      if(isNaN(difference) || difference <= 0){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error en las fechas',
          timer: 1500
        })
        return;
      }

      if(formValue.title.trim().length <= 0) return;

      // TODO:
      await startSavingEvent(formValue)
      closeDateModal()
      setFormSubmitted(false)
    } 

    const titleClass = useMemo(() => {
      console.log('Me dispare del memo')
      if(!formSubmitted) return '';

      return (formValue.title.trim().length > 0) ? 'is-valid' : 'is-invalid' 

    }, [formValue.title, formSubmitted])

    useEffect(() => {
      if(activeEvent !== null){
        setFormValue({...activeEvent})
      }
    }, [activeEvent])
    
   

  return (
    <Modal
        isOpen={isDateModalOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
    >
        <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>

          <div className="form-group mb-2">
              <label>Fecha y hora inicio</label>
              <DatePicker 
                selected={formValue.start}
                className='form-control'
                onChange={(event) => onDateChange(event, 'start')}
                dateFormat='Pp'
                locale='es'
                showTimeSelect
                timeCaption='Hora'
              />
          </div>

          <div className="form-group mb-2">
              <label>Fecha y hora fin</label>
              {/* <input className="form-control" placeholder="Fecha inicio" /> */}
              <DatePicker 
                minDate={formValue.start} // Para que NO me seleccione una fecha MENOR a la fecha de INICIO
                selected={formValue.end}
                className='form-control'
                onChange={(event) => onDateChange(event, 'end')}
                dateFormat='Pp'
                locale='es'
                showTimeSelect
                timeCaption='Pedro'
              />
          </div>

          <hr />
          <div className="form-group mb-2">
              <label>Titulo y notas</label>
              <input 
                  type="text" 
                  className={`form-control ${titleClass}`}
                  placeholder="Título del evento"
                  name="title"
                  autoComplete="off"
                  value={formValue.title}
                  onChange={onInputChange}
              />
              <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
          </div>

          <div className="form-group mb-2">
              <textarea 
                  type="text" 
                  className="form-control"
                  placeholder="Notas"
                  rows="5"
                  name="notes"
                  value={formValue.notes}
                  onChange={onInputChange}
              ></textarea>
              <small id="emailHelp" className="form-text text-muted">Información adicional</small>
          </div>

          <button
              type="submit"
              className="btn btn-outline-primary btn-block"
          >
              <i className="far fa-save"></i>
              <span> Guardar</span>
          </button>

      </form>
    </Modal>
  )
}
