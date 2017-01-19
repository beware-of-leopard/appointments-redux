import { combineReducers } from 'redux';


let apptTimes = [9,10,11,12,1,2,3,4,5];

//allows easy updates to data requested for each time slot
let apptObjects = apptTimes.map( n => ({time: n, name: "", phoneNumber: ""}))

//using es6 default args to set initial state
function makeAppointmentReducer(state = {appointments: apptObjects, apptToEdit: {name: "", phoneNumber: "", time: "", index: ""}}, action) {


  switch (action.type) {

  case 'ADD_APPOINTMENT':
  	let {appointments} = state;
  	let {indexToUpdate, name, phoneNumber, time} = action.payload;

  	//don't mutate state object
  	let updatedappointments = appointments.slice(0, indexToUpdate)
  										  .concat({name, phoneNumber, time})
  										  .concat(appointments.slice(indexToUpdate +1))
    return {...state, appointments: updatedappointments}

  case 'UPDATE_APPOINTMENT':
  	let {name_to_edit, phoneNumber_to_edit, time_to_edit, index} = action.payload;
    return {...state, apptToEdit: {name: name_to_edit, phoneNumber: phoneNumber_to_edit, time: time_to_edit, index: index}}
  
  default:
    return state
  }
}

//toggle modal reducer
function modalReducer(state = {showModal: false}, action){

  switch (action.type){
    case 'TOGGLE_MODAL':
      return {
        showModal: !state.showModal
      }
    default:
      return state
  }

}


//to enable easy addition of future reducers
export const rootReducer = combineReducers({
   makeAppointmentReducer, modalReducer
});
