import React from 'react';



class Field extends React.PureComponent{


  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.deleteField(this.props.f.id);
  }


  render(){
    return(

          <tr>
            <th scope="row">{this.props.id}</th>
            <td>{this.props.f.name} </td>
            <td>{this.props.f.placeholder}</td>
            {console.log(this.props.f.regularExp)}
            <td>{this.props.f.regularExp}</td>
            <td>{this.props.f.ref.type}</td>
            <td><i style={{cursor:"pointer"}} onClick={this.handleClick}  className="fa fa-trash-o fa-lg mt-1" /><br /></td>
            <td> </td>
          </tr>

    );

  }

}


export default Field;
