import {UPDATE_APPOINTMENT, TOGGLE_MODAL, ADD_APPOINTMENT} from './action_types'

export function updateAppointment(apptInfo, index){

	console.log(apptInfo, index)

	return (
		{
			type: UPDATE_APPOINTMENT, 
			payload: {
				"name_to_edit": apptInfo.name, 
				"phoneNumber_to_edit": apptInfo.phoneNumber, 
				"time_to_edit":apptInfo.time, 
				"index":index
			}
	})

}

export function toggleModal (){
	return {type: TOGGLE_MODAL}
}

export function addAppointment(indexToUpdate, name, phoneNumber, time){

	console.log(indexToUpdate, name, phoneNumber, time)
	return {
		type: ADD_APPOINTMENT, 
		payload: {
			"name": name, 
			"phoneNumber": phoneNumber, 
			"time":time, 
			"indexToUpdate":indexToUpdate
		}}
}