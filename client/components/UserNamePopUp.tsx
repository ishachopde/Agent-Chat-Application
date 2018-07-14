
import * as React from "react";
import { HashRouter, Route, Switch, Redirect} from "react-router-dom";
import * as Modal from 'react-modal';
import "../resources/styles/components/UserNamePopUp.scss";
import {getStore} from '../store';
import { setUserInfo, createChatBoard } from "../actions/userActions";
const uuidv4 = require('uuid/v4');
interface IProps {
    dispatch?
    history?
}

interface IState {
    userName: string;
    isAgent: boolean;
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
            userName: "",
            isAgent: false
          };
    }

    handleFullNameChange = (e) => {
        this.setState({
            userName: e.target.value
        })
    }

    handleAgentChange = (e) => {
        this.setState({
            isAgent: e.target.checked
        })
    }

    handleKeyPress(ev) {
        if (ev.which === 13) {
            console.log(this.props);
            if (this.state.userName) {
                const store = getStore();
                console.log(this.state.isAgent);
                const userId = uuidv4();
                store.dispatch(setUserInfo(this.state.userName, this.state.isAgent, userId));
                store.dispatch(createChatBoard(userId));
                if(this.state.isAgent) {
                    this.props.history.push("/agent/" + userId);
                } else {
                    this.props.history.push("/" + userId);
                }
            }

            ev.preventDefault();
        }
    }

  render() {
    return (

        <ul className="pages">

            <li className="login page">
                <div className="form">
                    <h3 className="title">What's your nickname?</h3>
                    <input onKeyPress={this.handleKeyPress.bind(this)} onChange={this.handleFullNameChange.bind(this)} className="usernameInput" type="text"  />
                    <div className="agent-checkbox">
                        <input type="checkbox" id="agent" name="agent"
                               onChange={this.handleAgentChange}
                               value="agent" />

                        <label>Agent</label>
                    </div>
                </div>
            </li>

        </ul>
    );
  }
}
