import * as React from "react";
import { sendMessageToAgent } from "../actions/messageActions";
import { getStore } from '../store';
import "../resources/styles/components/Test.scss";
import { Footer } from "./common/Footer";
import { Header } from "./common/Header";
import { connect } from 'react-redux';
interface IProps {
    user: any;
    chatBoard: any;
    chats: any;
    agent: any;
    dispatch?
}

interface IState {
    message: string;
}

class MainClass extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            message: "",
        };
    }

    private handleMessageChange = (e) => {
        this.setState({
            message: e.target.value
        })
    }
    public renderChatHistory(chats, agent, user) {
        if (!chats) {
            return "";
        }
        const renderChats = chats.map((message, index) => {
            const messageTime = (index === chats.length - 1) ? (
                <div className="last-msg-time"> 
                        Just now
                    </div>
            ) : ""
            if (message.senderId === user.id)
                return (
                    <div key={index}>
                        <div className="msg-left">
                            <p>{message.message}</p>
                        </div>
                        {
                            (index === chats.length - 1) ? (
                                <div className="last-msg-time-left last-msg-time"> 
                                        Just now
                                    </div>
                            ) : ""
                        }
                        </div>
                );
            else
                return (
                    <div key={index}>
                        <div className="msg-right">
                            <p>{message.message}</p>
                        </div>
                        {
                            (index === chats.length - 1) ? (
                                <div className="last-msg-time-right last-msg-time"> 
                                        Just now
                                    </div>
                            ) : ""
                        }
                    </div>
                );
        });
        return (
            <div className="chat-history">
                {renderChats}
            </div>
        )
    }

    public render() {
        const { agent, user, chatBoard, chats } = this.props;
        if (!agent.id) {
            return (
                <div>
                    Waiting for agent.....
                </div>
            )
        }

        return (
            <div>
                <Header />
                
                <div className="msg_box" >
                    <div className="msg_head">

                        <div className="chat-timer">
                            <span className="chat-timer-text"> 5.4s</span>
                        </div>
                        <h4>{agent.userName} {agent.isOnline}</h4>
                    </div>
                    <div className="msg_wrap">
                        <div className="msg_body">
                            <div className="msg_push">
                                {this.renderChatHistory(chats[agent.id], agent, user)}
                            </div>
                        </div><div className="msg_footer">
                            <textarea className="msg_input" value={this.state.message}
                                onKeyPress={this.handleKeyPress.bind(this)}
                                onChange={this.handleMessageChange.bind(this)}
                                rows={4} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentWillReceiveProps(newProps) {

    }

    handleKeyPress(ev) {
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

export const Main = connect(
    mapStateToProps,
)(MainClass);

