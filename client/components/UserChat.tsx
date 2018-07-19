import * as React from "react";
import { sendMessageToAgent } from "../actions/messageActions";
import { getStore } from '../store';
import "../resources/styles/components/chat/ChatBox.scss";
import { Header } from "./common/Header";
import { connect } from 'react-redux';
import { Chats } from './common/Chats';
import {user_types, chatBoard_types, chats_types, agent_types} from '../types/types';
interface IProps {
    user: user_types;
    chatBoard: chatBoard_types;
    chats: chats_types;
    agent: agent_types;
    dispatch?
    history?
}

interface IState {
    message: string;
}

class UserChatClass extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        const { user } = this.props;
        if(!user.id) {
            this.props.history.push("/");
        }
        this.state = {
            message: "",
        };
    }

    private handleMessageChange = (e) => {
        this.setState({
            message: e.target.value
        })
    }
   
    public render() {
        const { agent, user, chatBoard, chats } = this.props;
        if (!agent.id) {
            return (
                <div>
                    No Agent Assign to the user, please run the Agent first and run the app "/"
                </div>
            )
        }

        return (
            <div>
                <Header />
                
                <div className="msg_box" style={{left: "10px"}}>
                    <div className="msg_head">

                        <div className="chat-timer" style={{ background: "#CB6080"}}>
                            <span className="chat-timer-text"> 0s</span>
                        </div>
                        <h4>{agent.userName}</h4>
                    </div>
                    <div className="msg_wrap">
                        <div className="msg_body">
                            <div className="msg_push">
                                {/* {this.renderChatHistory(chats[agent.id], user)} */}
                                <Chats chats={chats[agent.id]} user={user} backgroundColor={"#CB6080"} />
                            </div>
                        </div><div className="msg_footer">
                            <div className="msg_footer_info_box">
                                {
                                    (!agent.isOnline) ? "Agent disconnected" : ""
                                }
                        </div>
                            <textarea className="msg_input" placeholder="Type a message.." disabled={!agent.isOnline} value={this.state.message}
                                onKeyPress={this.handleKeyPress.bind(this)}
                                onChange={this.handleMessageChange.bind(this)}
                                rows={4} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private handleKeyPress(ev) {
        const { agent, user, chatBoard } = this.props;
        const { message } = this.state;
        if (ev.which === 13) {
            //const trimmedMessage = this.props.value.trim();

            // if (trimmedMessage) {
            const store = getStore();
            store.dispatch(sendMessageToAgent({
                senderId: user.id,
                receiverId: agent.id,
                message: message
            }));

            this.setState({
                message: ""
            })
            //  }

            ev.preventDefault();
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        chatBoard: state.chatBoard,
        chats: state.chats,
        agent: state.agent
    }
};

export const UserChat = connect(
    mapStateToProps,
)(UserChatClass);