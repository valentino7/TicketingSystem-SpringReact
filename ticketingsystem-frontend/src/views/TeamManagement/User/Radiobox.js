import React, { Component, PropTypes } from 'react';

class Radiobox extends Component {
  state = {
    isChecked: false,
  }

  toggleRadioboxChange = () => {
    const {  callbackToHandler, handleRadioboxCheck, handleRadioboxChange, data } = this.props;
	if(!this.state.isChecked)
    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));

    handleRadioboxChange(data);
	if(callbackToHandler instanceof Function)
    		callbackToHandler(this.handlerRadio);
	else
	console.log("unexpected error, callbackToHandler is not a function");
  }

  handlerRadio  = () => {
    const { callbackToHandler,  handleRadioboxCheck, handleRadioboxChange, data } = this.props;
        
	if(this.state.isChecked)
    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));
  }


  render() {
    const { label } = this.props;
    const { isChecked } = this.state;

    return ( 
	   
            
      <div className="checkbox">
          <input
            type="checkbox"
            value={label}
            checked={isChecked}
            onChange={this.toggleRadioboxChange}
          />

          {label}
      </div>    

    );
  }
//TODO improve the timeout with a check on the Set about the checkbox. (Just add a dummy, but known,  item  and check that it is in the Set every some ms, like 250)
	  componentDidMount() {
		      const { callbackToHandler, handleRadioboxCheck, handleRadioboxChange, data } = this.props;
	setTimeout(()=>{ 
		if(handleRadioboxCheck(data)){
	    this.setState(({ isChecked }) => (
      {
        isChecked: true,
      }
    ));    
	if(callbackToHandler instanceof Function)		
	    callbackToHandler(this.handlerRadio);
		}	
	
	}, 500);
		         // console.log(data);

        //console.log(handleCheckboxCheck(data));
	  }
}
Radiobox.propTypes = {
  //label: PropTypes.string.isRequired,
  //handleCheckboxChange: PropTypes.func.isRequired,
};
   /*   <div className="checkbox">
        <label>
          <input*/

export default Radiobox;
