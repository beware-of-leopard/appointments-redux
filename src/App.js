import React, { Component } from 'react'
import './App.css'
import Modal from './Modal.js'
import { connect } from "react-redux"
import {bindActionCreators} from 'redux'
import {updateAppointment} from './actions/action_creators'
import {toggleModal} from './actions/action_creators'
import {addAppointment} from './actions/action_creators'

class App extends Component {

  getApptTimes(){
    
    let {appointments} = this.props.stateAsProp.makeAppointmentReducer;

    return appointments.map( (n,i) => 
      <div key={i} 
      onClick={this.handleEdit.bind(this,n,i)} 
      style={{"background": n.name !== "" || n.phoneNumber !== "" ? "rgba(184, 161, 161, .9)" : ""}} 
      className="appointment" 
      title="Click to make appointment">
        <div className="appt-time">Time: {n.time}</div>
        <div className="name">Name: {n.name}</div>
        <div className="number">Phone Number: {n.phoneNumber}</div>
      </div>)
  }
  handleEdit(apptInfo, index){

    this.props.updateAppointment(apptInfo, index)
    this.props.toggleModal({type: "TOGGLE_MODAL"})
  }

  handleUpdate(indexToUpdate, name, phoneNumber, time){

    this.props.addAppointment(indexToUpdate, name, phoneNumber, time)
    this.props.toggleModal({type: "TOGGLE_MODAL"})
  }

  closeModal(){
    this.props.toggleModal({type: "TOGGLE_MODAL"})
  }

  getModal(){
    return (
      <Modal 
          apptInfo={this.props.stateAsProp.makeAppointmentReducer.apptToEdit}
          updateInfo={this.handleUpdate.bind(this)}
          closeModal={this.closeModal.bind(this)}
      />
      )
  }

  render() {
    let {showModal} = this.props.stateAsProp.modalReducer

    return (
      <div className="App">
        <h1>Make Appointment Below:</h1>
        {this.getApptTimes()}
        {showModal ? this.getModal() : null}
      </div>
    );
  }
}

//the way this is currently setup, simply gives the entirety of the state to this container component.
//you could also return something like state.property to only pass in a specific piece of the state.
function mapStateToProps(state) {
   return { stateAsProp: state };
}


function mapDispatchToProps(dispatch){
  return bindActionCreators({updateAppointment, toggleModal, addAppointment}, dispatch)
}

//this is what allows us to access the disptch function via props.
//All connected components have access to dispatch in this way.
export default connect(mapStateToProps, mapDispatchToProps)(App);
