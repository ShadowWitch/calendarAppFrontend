import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvens = {
    _id: new Date().getTime(),
    title: 'Cumple del jefe',
    notes: 'Hay que comprar el paste',
    start: new Date(),
    end: addHours(new Date(), 2), // Le estoy sumando "2" horas a la fecha actual,
    bgColor: '#fafafa',
    user:{
      _id: '123',
      name: 'Fernando'
    }
};

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            tempEvens
        ],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, action) => {
            state.activeEvent = action.payload;
        },
        onAddNewEvent: (state, action) => {
            state.events.push(action.payload)
            state.activeEvent = null; //Limpiar evento
        },
        onUpdateEvent: (state, action) => {
            state.events = state.events.map(event => {
                if(event._id === action.payload._id){
                    return action.payload;
                }

                return event;
            })
        },
        onDeleteEvent: (state) =>{
            if(state.activeEvent){ // Para no disparar el "delete" en caso de que el "activeEvent" sea "null" o no exista
                state.events = state.events.filter(event => event._id !== state.activeEvent._id)
                state.activeEvent = null
            }
        }
    }
});
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;