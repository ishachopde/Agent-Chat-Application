
import * as React from "react";
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

export class UserNamePopUp extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            userName: "",
            isAgent: false
          };
    }

    private handleFullNameChange = (e) => {
        this.setState({
            userName: e.target.value
        })
    }

    // Set IsAgent Status
    private handleAgentChange = (e) => {
        this.setState({
            isAgent: e.target.checked
        })
    }

    // Handles key press event on username text box.
    private handleKeyPress(ev) {
        if (ev.which === 13) {
            if (this.state.userName) {
                const store = getStore();
                const userId = uuidv4();

                // Store User Information.
                store.dispatch(setUserInfo(this.state.userName, this.state.isAgent, userId));

                // Send User Information to Server.
                store.dispatch(createChatBoard(userId));

                // If User redirect him to User Chat Page, else redirect to Agent page.
                if(this.state.isAgent) {
                    this.props.history.push("/agent/" + userId);
                } else {
                    this.props.history.push("/" + userId);
                }
            }

            ev.preventDefault();
        }
    }

  public render() {
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
