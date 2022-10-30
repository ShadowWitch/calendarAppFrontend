import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store"

export const useCalendarStore = () => {
    const dispatch = useDispatch()

    const {events, activeEvent} = useSelector(state => state.calendar)

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent) => {
        // TODO: llegar al backend

        // Todo bien
        if(calendarEvent._id){ //* Si tiene el "_id" estoy actualizando
            dispatch(onUpdateEvent({...calendarEvent}))

        }else{ //* De lo contrario estoy "creando"
            dispatch(onAddNewEvent({
                ...calendarEvent, 
                _id: new Date().getTime()
            }))
        }

    }

    const startDeletingEvent = async () => {
        // TODO Llegar al backend

        dispatch(onDeleteEvent())
    }

    return {
        //* Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent, // Si no tiene nada dara false, y si tiene dara true

        //* Metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
    }
}