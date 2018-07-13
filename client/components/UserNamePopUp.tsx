
import * as React from "react";
import { HashRouter, Route, Switch, Redirect} from "react-router-dom";
import * as Modal from 'react-modal';
import "../resources/styles/components/UserNamePopUp.scss";
interface IProps {
    dispatch?
}

interface IState {
    modalIsOpen: boolean;
}

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
  

export class UserNamePopUp extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            modalIsOpen: false
          };
    }
    openModal() {
        this.setState({modalIsOpen: true});
      }
    
      afterOpenModal() {
        // references are now sync'd and can be accessed.
       // this.subtitle.style.color = '#f00';
      }
    
      closeModal() {
        this.setState({modalIsOpen: false});
      }
    
      render() {
        return (
          <div>
            
            <button onClick={this.openModal.bind(this)}>Open Modal</button>
            <div className="login.page">
      <div className="form">
        <h3 className="title">What's your nickname?</h3>
        <input className="usernameInput" type="text" />
      </div>
    </div>
            {/* <Modal
              isOpen={true}
              onAfterOpen={this.afterOpenModal.bind(this)}
              onRequestClose={this.closeModal.bind(this)}
              style={customStyles}
              contentLabel="Example Modal"
            >
    
              <h2 >Hello</h2>
              <button onClick={this.closeModal.bind(this)}>close</button>
              <div>Enter your user name</div>
              <form>
                <input type="text" placeholder="Enter your user name"/>
            
              </form>
            </Modal> */}
          </div>
        );
      }
}
