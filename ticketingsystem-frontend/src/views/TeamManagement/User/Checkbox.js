import React, { Component, PropTypes } from 'react';

class Checkbox extends Component {
  state = {
    isChecked: false,
  }

  toggleCheckboxChange = () => {
    const { handleCheckboxCheck, handleCheckboxChange, data } = this.props;

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));

    handleCheckboxChange(data);
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
            onChange={this.toggleCheckboxChange}
          />

          {label}
      </div>    

    );
  }
//TODO improve the timeout with a check on the Set about the checkbox. (Just add a dummy, but known,  item  and check that it is in the Set every some ms, like 250)
	  componentDidMount() {
		      const { handleCheckboxCheck, handleCheckboxChange, data } = this.props;
	setTimeout(()=>{ 

	    this.setState(({ isChecked }) => (
      {
        isChecked: handleCheckboxCheck(data),
      }
    ));    
	
	
	}, 500);
		         // console.log(data);

        //console.log(handleCheckboxCheck(data));
	  }
}
Checkbox.propTypes = {
  //label: PropTypes.string.isRequired,
  //handleCheckboxChange: PropTypes.func.isRequired,
};
   /*   <div className="checkbox">
        <label>
          <input*/

export default Checkbox;
