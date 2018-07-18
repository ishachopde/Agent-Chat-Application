import * as React from "react";
import {sendMessageToAgent } from "../actions/messageActions";
import { changeLastMessageReceivedCounter } from "../actions/userActions";
import {getStore} from '../store';
import "../resources/styles/components/chat/ChatBox.scss";
import { Footer } from "./common/Footer";
import { Header } from "./common/Header";
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';

const backgroundColors = ["#CB6080", "#0AA693", "#966AB8", "#3D9CC4"]

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
    private chatWindowWidth = 448;
    private marginBetweenTwoChatWindows = 10;
    constructor(props: IProps) {
        super(props);
        const { connectedUsers } = this.props;
        this.state = {
                activeChats: [],
                inputMessages: {},
            // value: '',
            // suggestions: this.getSuggestions('')
        }

      //  this.onChange = this.onChange.bind(this);
      //  this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
    }

   

    // static getDerivedStateFromProps(newProps, state){
       
    //     const maxActiveChats = AgentChatClass.calculateNumberOfChats(window.innerWidth);
    //     if(state.activeChats.length < maxActiveChats) {
    //         state = {
    //             width: window.innerWidth + 'px',
    //         };
    //     }

    //     return state;
    // }

    private calculateNumberOfChats(screenWidth) {
        const noChatWindows = Math.floor(screenWidth / (this.chatWindowWidth + this.marginBetweenTwoChatWindows));
        return noChatWindows;
    }

    public renderChatHistory(chats, user, backgroundColor) {
        if(!chats) {
            return "";
        }

        const renderChats = chats.map((message, index)=> {
            const messageTime = (index === chats.length - 1) ? (
                <div className="last-msg-time"> 
                        Just now
                    </div>
            ) : ""; 

        
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
                        <div className="msg-right" style={{background: backgroundColor}}>
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

    private startMessageReceivedTimer (id) {
        if(!this.lastMessageTimers.hasOwnProperty(id)) {
            this.lastMessageTimers[id] = setInterval(() => {
                this.props.dispatch(changeLastMessageReceivedCounter(id));
            }, 1000);
        }
    }

    renderActiveChats() {
        const { chats, user } = this.props;
        const  { inputMessages } = this.state;

        const maxActiveChats = this.calculateNumberOfChats(window.innerWidth);
        const activeChats = this.props.connectedUsers.slice(0, maxActiveChats);
        
        return activeChats.map((activeChat, index) => {
            const inputMessage = (inputMessages[activeChat.id] ? inputMessages[activeChat.id] : "");
            if(activeChat.isNewMessage) {
                this.startMessageReceivedTimer(activeChat.id);
            } else {
                if(this.lastMessageTimers.hasOwnProperty(activeChat.id)) {
                    clearInterval(this.lastMessageTimers[activeChat.id]);
                    delete this.lastMessageTimers[activeChat.id];
                }
            }

            const left = (index * this.chatWindowWidth) + (index + 1)  * this.marginBetweenTwoChatWindows;
            const backgroundColor = backgroundColors[index % maxActiveChats];
            let boxAnimation = "none";
            console.log(activeChat.isOnline);
            // Remind Agent to reply, if haven't replied in one minute.
            if(activeChat.lastMessageTimer > 60) {
                boxAnimation = `blink-${backgroundColor.replace("#", "")} .5s step-end infinite alternate`;     
            }
            return (
            <div key={index} className="msg_box" style={{left: left, animation: boxAnimation}}>
            <div className="msg_head">
                    <div className="chat-timer" style={{background: backgroundColor}}>
                        <span className="chat-timer-text"> {this.formatSeconds(activeChat.lastMessageTimer)}</span>
                    </div>
                    <h4>{activeChat.name}</h4>
</div>
                
                <div className="msg_wrap">
                    <div className="msg_body">
                        <div className="msg_push">
                            {this.renderChatHistory(chats[activeChat.id], user, backgroundColor)}

                        </div>
                    </div><div className="msg_footer">
                    <div className="msg_footer_info_box">
                        {
                            (!activeChat.isOnline) ? "User disconnected" : ""
                        }
                    </div>
                    <textarea 
                        value={inputMessage} className="msg_input" disabled={!activeChat.isOnline}
                                onKeyPress={(ev) => this.handleKeyPress(ev, user.id, activeChat.id)}
                                    onChange={(ev) => this.handleMessageChange.call(this,ev, activeChat.id)}  
                    rows={4}/>
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

    private formatSeconds (totalSeconds) {
        const seconds: number = totalSeconds % 60;
        const minutes: number = Math.floor(totalSeconds / 60);
        const hours = Math.floor(totalSeconds / 3600);
    
        if (hours !== 0) {
            return `${hours}h`
        }

        if (minutes !== 0) {
            return `${minutes}m`
        } 

        return `${seconds}s`
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


