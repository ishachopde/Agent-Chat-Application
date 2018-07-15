import * as React from "react";
import {sendMessageToAgent} from "../actions/messageActions";
import {getStore} from '../store';
import "../resources/styles/components/Main.scss";
import { Footer } from "./common/Footer";
import { Header } from "./common/Header";
import { connect } from 'react-redux';
const maxActiveChats = 3;
interface IProps {
    user: any,
    chatBoard: any,
    connectedUsers: any,
    chats: any,
    dispatch?
}

interface IState {
    activeChats: any;
    inputMessages: any;
}

class AgentChatClass extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        const { connectedUsers } = this.props;
        this.state = {
            activeChats: [],
            inputMessages: {

            }
        }
    }


    static getDerivedStateFromProps(newProps, state){
        const { connectedUsers } = newProps;
        if(state.activeChats.length < maxActiveChats) {
            state = {
                activeChats: connectedUsers.slice(0, maxActiveChats)
            };
        }
        return state;
    }

    public renderChatHistory(chats, user) {
        console.log(chats);
        if(!chats) {
            return "";
        }
        const renderChats = chats.map((message, index)=> {
            if(message.senderId === user.id)
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

    renderActiveChats() {
        const { chats, user } = this.props;
        const  { inputMessages } = this.state;
        return this.state.activeChats.map((activeChat, index) => {
            const inputMessage = (inputMessages[activeChat.id] ? inputMessages[activeChat.id] : "");
            return (
                <div key={index} id={`live-chat-${index + 1}`} className={"live-chat"}>
                <header>
                    <div className="chat-timer">
                        <span className="chat-timer-text"> 5.4s</span>
    
                    </div>
                    <h4>{activeChat.name}</h4>
    
    
                </header>
                <div className="chat">
    
                    {this.renderChatHistory(chats[activeChat.id], user)}
    
                    <p className="chat-feedback">Your partner is typing…</p>
    
                    <div className="chat-text-area">
                        <textarea 
                         value={inputMessage}
                                 onKeyPress={(ev) => this.handleKeyPress(ev, user.id, activeChat.id)}
                                      onChange={(ev) => this.handleMessageChange.call(this,ev, activeChat.id)}  
                        rows={4} cols={50}/>
                    </div>
    
                </div>
            </div>
        )});
        
    }

    render() {
        return (
            <div>
                <Header /> 
                {this.renderActiveChats.call(this)}
            </div>
        );
    }

    private handleMessageChange = (e, userId) => {
        const inputMessages = this.state.inputMessages;
        inputMessages[userId] = e.target.value;
        this.setState({
            inputMessages
        })
    }

    handleKeyPress(ev, senderId, receiverId) {
        const  { inputMessages } = this.state;
        const message = (inputMessages[receiverId] ? inputMessages[receiverId] : "");
        if (ev.which === 13) {
            const store = getStore();
            store.dispatch(sendMessageToAgent({
                senderId,
                receiverId,
                message
            }));

            const inputMessages = this.state.inputMessages;
            inputMessages[receiverId] = "";
            this.setState({
                inputMessages
            })

            ev.preventDefault();
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        chatBoard: state.chatBoard,
        connectedUsers: state.connectedUsers,
        chats: state.chats,
    }
};

export const AgentChat = connect(
    mapStateToProps,
)(AgentChatClass);

