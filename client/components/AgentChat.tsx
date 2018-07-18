import * as React from "react";
import {sendMessageToAgent } from "../actions/messageActions";
import { changeLastMessageReceivedCounter } from "../actions/userActions";
import {getStore} from '../store';
import "../resources/styles/components/Main.scss";
import { Footer } from "./common/Footer";
import { Header } from "./common/Header";
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
const maxActiveChats = 3;


const languages = [
    {
      name: 'C',
      year: 1972
    },
    {
      name: 'Elm',
      year: 2012
    }
  ];

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


   // value: string
   // suggestions?
}

class AgentChatClass extends React.Component<IProps, IState> {
    private onChange;
    private onSuggestionsUpdateRequested;
    private lastMessageTimers = {};
    constructor(props: IProps) {
        super(props);
        const { connectedUsers } = this.props;
        this.state = {
            activeChats: [],
            inputMessages: {

            },

            // value: '',
            // suggestions: this.getSuggestions('')
        }
        
       
      //  this.onChange = this.onChange.bind(this);
      //  this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
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

    private startMessageReceivedTimer (id) {
        if(!this.lastMessageTimers.hasOwnProperty(id)) {
            console.log(id);
            this.lastMessageTimers[id] = setInterval(() => {
                this.props.dispatch(changeLastMessageReceivedCounter(id));
            }, 1000);
        }
    }

    renderActiveChats() {
        const { chats, user } = this.props;
        const  { inputMessages } = this.state;
        return this.state.activeChats.map((activeChat, index) => {
            const inputMessage = (inputMessages[activeChat.id] ? inputMessages[activeChat.id] : "");
            if(activeChat.isNewMessage) {
                this.startMessageReceivedTimer(activeChat.id);
            } else {
                if(this.lastMessageTimers.hasOwnProperty(activeChat.id)) {
                    console.log(activeChat.id);
                    console.log("Cleared");
                    clearInterval(this.lastMessageTimers[activeChat.id]);
                    delete this.lastMessageTimers[activeChat.id];
                }
            }
            return (
                <div key={index} id={`live-chat-${index + 1}`} className={"live-chat"}>
                <header>
                    <div className="chat-timer">
                        <span className="chat-timer-text"> {activeChat.lastMessageTimer}s</span>
                    </div>
                    <h4>{activeChat.name}</h4>
    
    
                </header>
                <div className="chat">
    
                    {this.renderChatHistory(chats[activeChat.id], user)}
    
                    <p className="chat-feedback">Your partner is typing…</p>
    
                    <div className="chat-text-area">
                    {/* <Autosuggest suggestions={languages}
                   onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                   getSuggestionValue={this.getSuggestionValue}
                   renderSuggestion={renderSuggestion}
                   inputProps={inputProps} /> */}

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

    componentWillUnmount() {
        Object.keys(this.lastMessageTimers).forEach((key) => {
            clearInterval(this.lastMessageTimers[key]);
        })
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



    // getSuggestions(value) {
    //     const inputValue = value.trim().toLowerCase();
    //     const inputLength = inputValue.length;
        
    //     return inputLength === 0 ? [] : languages.filter(lang =>
    //       lang.name.toLowerCase().slice(0, inputLength) === inputValue
    //     );
    //   }
       
    //  getSuggestionValue(suggestion) { // when suggestion selected, this function tells
    //     return suggestion.name;                 // what should be the value of the input
    //   }
       
    // renderSuggestion(suggestion) {
    //     return (
    //       <span>{suggestion.name}</span>
    //     );
    //   }
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

