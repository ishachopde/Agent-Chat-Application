import * as React from "react";
import { sendMessageToAgent } from "../actions/messageActions";
import {getStore} from '../store';
import "../resources/styles/components/Main.scss";
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
        const renderChats = chats.map((message, index)=> {
            console.log(message);
            if(chats.userId === user.id)
                return (
                    <div key={index} className="chat-left">
                        <div className="chat-message-left clearfix">

                            <div className="chat-message-content clearfix">

                                <p>{message.message}</p>

                            </div>

                        </div>
                    </div>
                );
            else
                return (
                    <div key={index} className="chat-right">
                        <div className="chat-message-right clearfix">

                            <div className="chat-message-content clearfix">


                                <p>{message.message}</p>

                            </div>

                        </div>
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
        const { agent, user, chatBoard, chats} = this.props;

        if(!agent.id) {
            return (
                <div>
                    Waiting for agent.....
                </div>
            )
        }

        return (
            <div>
                <Header />
                <div id="live-chat-1" className={"live-chat"}>
                    <header>
                        <div className="chat-timer">
                            <span className="chat-timer-text"> 5.4s</span>

                        </div>
                        <h4>{agent.userName}</h4>


                    </header>
                    <div className="chat">

                        {this.renderChatHistory(chats, agent, user)}

                        <p className="chat-feedback">Your partner is typing…</p>

                        <div className="chat-text-area">
                            <textarea value={this.state.message}
                                onKeyPress={this.handleKeyPress.bind(this)}
                                      onChange={this.handleMessageChange.bind(this)}
                                      rows={4} cols={50}/>
                        </div>


                    </div>
                </div>
            </div>
        );
    }

    handleChange(ev) {
        //this.props.onChange(ev.target.value);
    }

    handleKeyPress(ev) {
        const { agent, user, chatBoard} = this.props;
        const { message } = this.state;
        if (ev.which === 13) {
            //const trimmedMessage = this.props.value.trim();

            // if (trimmedMessage) {
            const store = getStore();
            store.dispatch(sendMessageToAgent({
                userId: user.id,
                agentId: agent.id,
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

