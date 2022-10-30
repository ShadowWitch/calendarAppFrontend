import { addHours } from "date-fns"
import { useCalendarStore, useUiStore } from "../../hooks"

export const FabAddNew = () => {

    const {openDateModal} = useUiStore()
    const {setActiveEvent} = useCalendarStore()

    const handleClickNew = () =>{

        setActiveEvent({ // Limpiar nota anterior activa
            title: 'Hola',
            notes: 'Mundo',
            start: new Date(),
            end: addHours(new Date(), 2), // Le estoy sumando "2" horas a la fecha actual,
            bgColor: '#fafafa',
            user:{
              _id: '123',
              name: 'Fernando'
            }
        })

        openDateModal()
    }

  return (
    <button
        className="btn btn-primary fab"
        onClick={handleClickNew}
    >
        <i className="fas fa-plus"></i>
    </button>
  )
}
