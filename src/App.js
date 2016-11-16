import React, { Component } from 'react'
import './App.css'
import Modal from './Modal.js'
import { connect } from "react-redux"

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      apptInfo: null,
      apptEditNumber: null,
      showModal: false
    }
  }
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

    this.props.dispatch({type: "UPDATE_APPOINTMENT", payload: {"name_to_edit": apptInfo.name, "phoneNumber_to_edit": apptInfo.phoneNumber, "time_to_edit":apptInfo.time, "index":index}})
    
    this.setState({ showModal:true})
  }

  handleUpdate(indexToUpdate, name, phoneNumber, time){

    this.props.dispatch({type: "ADD_APPOINTMENT", payload: {"name": name, "phoneNumber": phoneNumber, "time":time, "indexToUpdate":indexToUpdate}})

    this.setState({showModal: false})

  }

  closeModal(){
    this.setState({showModal:false})
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
    return (
      <div className="App">
        <h1>Make Appointment Below:</h1>
        {this.getApptTimes()}
        {this.state.showModal ? this.getModal() : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
   return { stateAsProp: state };
}

export default connect(mapStateToProps)(App);
