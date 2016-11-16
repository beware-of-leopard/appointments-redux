import React, { Component } from 'react';

class Modal extends Component {

  constructor(props){
    super(props);

    this.state = {
      name: "",
      phoneNumber: ""
    }
  }

  componentWillMount(){
    let {name} = this.props.apptInfo;
    let {phoneNumber} = this.props.apptInfo;

    if(name !== ""){
      this.setState({name});
    }
    if(phoneNumber !== ""){
      this.setState({phoneNumber});
    }
  }

  onSubmit(e){
    e.preventDefault()
    let {name} = this.state;
    let {phoneNumber} = this.state;
    let {index} = this.props.apptInfo;
    let {time} = this.props.apptInfo; 

    this.props.updateInfo(index, name, phoneNumber, time);
  }

  handleNameChange(e){
    this.setState({name: e.target.value});
  }

  handleNumberChange(e){
    this.setState({phoneNumber: e.target.value});
  }

  handleInnerClick(e){
    e.stopPropagation();
  }
  
  render() {
    return (
      <div className="modal" onClick={this.props.closeModal}>
        <div className="modal-actions" onClick={this.handleInnerClick}>
          <div onClick={this.props.closeModal} className="modal-close">X</div>
          <div>Make {this.props.apptInfo.time} o'clock Appointment</div>
          <form>
            <div>
              <label>
                Name: 
                <input name="name" value={this.state.name} onChange={this.handleNameChange.bind(this)} autoFocus="true"/>
              </label>
            </div>
            <div>
              <label>
                Phone Number: 
                <input name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleNumberChange.bind(this)}/>
              </label>
            </div>
            <button onClick={this.onSubmit.bind(this)}>Update</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Modal;
