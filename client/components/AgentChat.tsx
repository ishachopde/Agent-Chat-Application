import * as React from "react";
import {sendMessageToAgent } from "../actions/messageActions";
import { changeLastMessageReceivedCounter, setActiveUser } from "../actions/userActions";
import {getStore} from '../store';
import "../resources/styles/components/chat/ChatBox.scss";
import { Footer } from "./common/Footer";
import { Header } from "./common/Header";
import { connect } from 'react-redux';
import * as Autosuggest from 'react-autosuggest';
import Suggestions from './common/AISuggestions';
import axios from 'axios';
const backgroundColors = ["#CB6080", "#0AA693", "#966AB8", "#3D9CC4"]

const languages = [
    {
      name: 'C',
      year: 1972
    },
    {
      name: 'C#',
      year: 2000
    },
    {
      name: 'C++',
      year: 1983
    },
    {
      name: 'Clojure',
      year: 2007
    },
    {
      name: 'Elm',
      year: 2012
    },
    {
      name: 'Go',
      year: 2009
    },
    {
      name: 'Haskell',
      year: 1990
    },
    {
      name: 'Java',
      year: 1995
    },
    {
      name: 'Javascript',
      year: 1995
    },
    {
      name: 'Perl',
      year: 1987
    },
    {
      name: 'PHP',
      year: 1995
    },
    {
      name: 'Python',
      year: 1991
    },
    {
      name: 'Ruby',
      year: 1995
    },
    {
      name: 'Scala',
      year: 2003
    }
  ];
  
  // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
  const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  const getSuggestions = value => {
    const escapedValue = escapeRegexCharacters(value.trim());
    
    if (escapedValue === '') {
      return [];
    }
  
    const regex = new RegExp('^' + escapedValue, 'i');
    const suggestions = languages.filter(language => regex.test(language.name));

    return suggestions;
  }

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
   value: string
   suggestions?
}

class AgentChatClass extends React.Component<IProps, IState> {
    private onSuggestionsUpdateRequested;
    private lastMessageTimers = {};
    private chatWindowWidth = 448;
    private marginBetweenTwoChatWindows = 12;
    constructor(props: IProps) {
        super(props);
        const { connectedUsers } = this.props;
        this.state = {
                activeChats: [],
                inputMessages: {},
                value: '',
                suggestions: []
        }

    
    }

    private getInfo (newValue) {
        axios.get(`https://dev.cresta.ai/api/front_end_challenge`)
          .then(({ data }) => {
              console.log(data);
            this.setState({
                suggestions: data
            })
          })
    }

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

    onChange = (event, { newValue, method }) => {
        this.setState({
          value: newValue
        });
      };
    
      getSuggestionValue(suggestion) {
        if (suggestion.isAddNew) {
          return this.state.value;
        }
        
        return suggestion.name;
      };
    
      renderSuggestion(suggestion) {
        if (suggestion.isAddNew) {
          return (
            <span>
              [+] Add new: <strong>{this.state.value}</strong>
            </span>
          );
        }
    
        return suggestion.name;
      };
      
      onSuggestionsFetchRequested ({ value }) {
        this.setState({
          suggestions: getSuggestions(value)
        });
      };
    
      onSuggestionsClearRequested () {
        this.setState({
          suggestions: []
        });
      };
    
      onSuggestionSelected (event, { suggestion }) {
        console.log(suggestion);
      };

    renderActiveChats(maxActiveChats, activeChats) {
        const { value, suggestions } = this.state;
        const inputProps = {
          placeholder: "",
          value,
          onChange: this.onChange
        };



        const { chats, user } = this.props;
        const  { inputMessages } = this.state;   
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

                    {/* <Autosuggest 
                    onKeyPress={(ev) => this.handleKeyPress(ev, user.id, activeChat.id)}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
        getSuggestionValue={this.getSuggestionValue.bind(this)}
        renderSuggestion={this.renderSuggestion.bind(this)}
        onSuggestionSelected={this.onSuggestionSelected.bind(this)}
        inputProps={inputProps} 
      />
      <button value="send" /> */}


      <Suggestions userId={activeChat.id} results={this.state.suggestions} onSuggestionClick={this.onSuggestionClick.bind(this)}/>
                    <textarea 
                        value={inputMessage} className="msg_input" disabled={!activeChat.isOnline}
                                onKeyPress={(ev) => this.handleKeyPress(ev, user.id, activeChat.id)}
                                    onChange={(ev) => this.handleMessageChange.call(this,ev, activeChat.id)}  
                    rows={4}/>
                     <div className="msg_footer_info_box">
                        {
                            (!activeChat.isOnline) ? "User disconnected" : ""
                        }
                    </div>
                    </div>
                </div>
            </div>
        )});
        
    }


    onSuggestionClick (suggestion, userId) {
        console.log("clicked" + suggestion);
        const inputMessages = this.state.inputMessages;
        inputMessages[userId] = suggestion;
        this.setState({
            inputMessages,
            suggestions: []
        })
    }

    componentWillUnmount() {
        Object.keys(this.lastMessageTimers).forEach((key) => {
            clearInterval(this.lastMessageTimers[key]);
        })
    }

    render() {
        const maxActiveChats = this.calculateNumberOfChats(window.innerWidth);
        const activeChats = this.props.connectedUsers.slice(0, maxActiveChats);
        const inactiveChats = this.props.connectedUsers.slice(maxActiveChats, this.props.connectedUsers.length);
        return (
            <div>
                <Header /> 
                {this.renderHorizontalOnlineUsers.call(this, maxActiveChats, inactiveChats)}
                {this.renderActiveChats.call(this, maxActiveChats, activeChats)}
            </div>
        );
    }

    private renderHorizontalOnlineUsers(maxActiveChats, inactiveChats) {
        return (
            <div>   
                <div className="scrollview-header">
                    Online Users
                    </div> 
                    <div className="scrollmenu">  
                        {inactiveChats.map((inactiveChat, index) => {
                            const backgroundColor = backgroundColors[index % maxActiveChats];
                            let boxAnimation = "none";
                            // Remind Agent to reply, if haven't replied in one minute.
                            if(inactiveChat.lastMessageTimer > 60) {
                                boxAnimation = `blink-alert .5s step-end infinite alternate`;     
                            }
                            return (
                                <span onClick={(ev) => this.setActiveUser.call(this, inactiveChat.id) } key={index} style={{background: backgroundColor, animation: boxAnimation}}><div>
                                {inactiveChat.name.substring(0,1)}</div>
                                </span>
                                
                            )
                        })}
                    </div>
            </div>
        )
    }

    private setActiveUser(userId) {
        this.props.dispatch(setActiveUser(userId));
    }

    private handleMessageChange = (e, userId) => {
        const inputMessages = this.state.inputMessages;
        inputMessages[userId] = e.target.value;
        
        if(e.target.value.length >= 5)
            this.getInfo.call(this, e.target.value);
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


