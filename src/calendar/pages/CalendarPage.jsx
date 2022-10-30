import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'


import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '../'
import { localizer, getMessagesEs } from '../../helpers'
import { useState } from 'react'
import { useUiStore, useCalendarStore } from '../../hooks'

// En los events, lo UNICO que SI ES OBLIGATORIO ES EL "title, start y end", ya la demas metadata es opcional (osea me la invite yo mismo)
// const events = [{
//   title: 'Cumple del jefe',
//   notes: 'Hay que comprar el paste',
//   start: new Date(),
//   end: addHours(new Date(), 2), // Le estoy sumando "2" horas a la fecha actual,
//   bgColor: '#fafafa',
//   user:{
//     _id: '123',
//     name: 'Fernando'
//   }
// }]

export const CalendarPage = () => {
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const {openDateModal} = useUiStore()

  const {events, setActiveEvent} = useCalendarStore()

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    // console.log({event, start, end, isSelected })

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }
  }

  const onDoubleClick = (event) => {
    // console.log({doubleClick: event})
    openDateModal()
  }

  const onSelect = (event) => {
    setActiveEvent(event)
    console.log({click: event})
  }

  const onViewChange = (event) => {
    // console.log({viewChange: event})
    localStorage.setItem('lastView', event)
    // setLastView(lastView)
    // console.log('>> ', lastView)
    console.log('Cambiaste de vista')
  }

  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />

      <CalendarModal />

      <FabAddNew />

      <FabDelete />

    </>
  )
}
