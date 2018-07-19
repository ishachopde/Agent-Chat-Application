import * as React from "react";
import { sendMessageToAgent } from "../actions/messageActions";
import { changeLastMessageReceivedCounter, setActiveUser } from "../actions/userActions";
import { getStore } from '../store';
import "../resources/styles/components/chat/ChatBox.scss";
import { Header } from "./common/Header";
import { connect } from 'react-redux';
import Suggestions from './common/AISuggestions';
import { Chats } from './common/Chats';
import { HorizontalUserList } from './common/HorizontalUserLIst';
import {user_types, chatBoard_types, chats_types, connected_users_types} from '../types/types';
import {getSuggestions} from '../apis/AiSuggestionApi';
import { Colors as backgroundColors} from "../utils/Colors";

interface IProps {
    user: user_types;
    chatBoard: chatBoard_types;
    connectedUsers: Array<user_types>;
    chats: chats_types;
    dispatch?
    history?
}

interface IState {
    activeChats: any;
    inputMessages: any;
    value: string;
    currentlyChattingUser: string
    suggestions?
}

class AgentChatClass extends React.Component<IProps, IState> {
    private lastMessageTimers = {};
    private chatWindowWidth = 448;
    private marginBetweenTwoChatWindows = 12;
    constructor(props: IProps) {
        super(props);
        const { connectedUsers, user } = this.props;
        // If user does not exists, take him to the home screen.
        if(!user.id) {
            this.props.history.push("/");
        }
        this.state = {
            activeChats: [],
            inputMessages: {},
            value: '',
            currentlyChattingUser: "",
            suggestions: {}
        }
    }

    public render() {
        /* This calculations can be done in constructor for faster perfomance, but for the demo 
        with different screen Sizes calculating every time. */
        const maxActiveChats = this.calculateNumberOfChats(window.innerWidth);
        const activeChats = this.props.connectedUsers.slice(0, maxActiveChats);
        const inactiveChats = this.props.connectedUsers.slice(maxActiveChats, this.props.connectedUsers.length);
        return (
            <div>
                <Header />
                <HorizontalUserList maxActiveChats={maxActiveChats} inactiveChats={inactiveChats} setActiveUser={this.setActiveUser.bind(this)} />
                
                {this.renderActiveChats.call(this, maxActiveChats, activeChats)}
            </div>
        );
    }

    renderActiveChats(maxActiveChats, activeChats) {
        const { chats, user } = this.props;
        const { inputMessages, currentlyChattingUser } = this.state;
        return activeChats.map((activeChat, index) => {
            const inputMessage = (inputMessages[activeChat.id] ? inputMessages[activeChat.id] : "");
            if (activeChat.isNewMessage) {
                this.startMessageReceivedTimer(activeChat.id);
            } else {
                if (this.lastMessageTimers.hasOwnProperty(activeChat.id)) {
                    clearInterval(this.lastMessageTimers[activeChat.id]);
                    delete this.lastMessageTimers[activeChat.id];
                }
            }

            const left = (index * this.chatWindowWidth) + (index + 1) * this.marginBetweenTwoChatWindows;
            const backgroundColor = backgroundColors[index % maxActiveChats];
            let boxAnimation = "none";
            // Remind Agent to reply, if haven't replied in one minute.
            if (activeChat.lastMessageTimer > 60) {
                boxAnimation = `blink-${backgroundColor.replace("#", "")} .5s step-end infinite alternate`;
            }

            const activeChatBorder = (currentlyChattingUser === activeChat.id) ? `4px solid ${backgroundColor}` : "";

            const suggestions = (this.state.suggestions[activeChat.id]) ? this.state.suggestions[activeChat.id] : [];
            return (
                <div key={index}  className="msg_box" style={{ left: left, animation: boxAnimation, border: activeChatBorder }}>
                    <div className="msg_head">
                        <div className="chat-timer" style={{ background: backgroundColor }}>
                            <span className="chat-timer-text"> {this.formatSeconds(activeChat.lastMessageTimer)}</span>
                        </div>
                        <h4>{activeChat.name}</h4>
                    </div>

                    <div className="msg_wrap">
                        <div className="msg_body">
                            <div className="msg_push">
                                <Chats chats={chats[activeChat.id]} user={user} backgroundColor={backgroundColor} />
                            </div>
                        </div><div className="msg_footer">

                            <Suggestions userId={activeChat.id} results={suggestions} onSuggestionClick={this.onSuggestionClick.bind(this)} />
                            <div className="msg_footer_info_box">
                                {
                                    (!activeChat.isOnline) ? "User disconnected" : ""
                                }
                            </div>
                            <textarea
                                value={inputMessage} placeholder="Type a message.." className="msg_input" disabled={!activeChat.isOnline}
                                onKeyPress={(ev) => this.handleKeyPress(ev, user.id, activeChat.id)}
                                onFocus={() => this.onInputFocused(activeChat.id)}
                                onChange={(ev) => this.handleMessageChange.call(this, ev, activeChat.id)}
                                onBlur={this.inInputBlurred.bind(this)}
                                rows={4} />
                        </div>
                    </div>
                </div>
            )
        });

    }

    private onInputFocused(userId) {
        this.setState({
            currentlyChattingUser: userId
        });
    }

    private inInputBlurred() {
        this.setState({
            currentlyChattingUser: ""
        });
    }

    private handleMessageChange = (e, userId) => {
        const inputMessages = this.state.inputMessages;
        inputMessages[userId] = e.target.value;

        if (e.target.value.length >= 1)
            this.getSuggestions.call(this, e.target.value, userId);
        this.setState({
            inputMessages
        })
    }

    private handleKeyPress(ev, senderId, receiverId) {
        const { inputMessages } = this.state;
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

    private getSuggestions(newValue, userId) {
        getSuggestions(newValue)
            .then(({ data }) => {
                const suggestions = this.state.suggestions;
                suggestions[userId] = data;
                this.setState({
                    suggestions: suggestions
                })
            });
    }

    private calculateNumberOfChats(screenWidth) {
        const noChatWindows = Math.floor(screenWidth / (this.chatWindowWidth + this.marginBetweenTwoChatWindows));
        return noChatWindows;
    }

    private startMessageReceivedTimer(id) {
        if (!this.lastMessageTimers.hasOwnProperty(id)) {
            this.lastMessageTimers[id] = setInterval(() => {
                this.props.dispatch(changeLastMessageReceivedCounter(id));
            }, 1000);
        }
    }

    private onSuggestionClick(userId, suggestion) {
        const { inputMessages, suggestions } = this.state;
        inputMessages[userId] = suggestion;
        delete suggestions[userId];
        this.setState({
            inputMessages,
            suggestions: suggestions
        });
    }

    componentWillUnmount() {
        Object.keys(this.lastMessageTimers).forEach((key) => {
            clearInterval(this.lastMessageTimers[key]);
        })
    }

    private setActiveUser(userId) {
        this.props.dispatch(setActiveUser(userId));
    }

    private formatSeconds(totalSeconds) {
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


