import * as React from "react";
import { sendMessageToAgent } from "../actions/messageActions";
import { changeLastMessageReceivedCounter, setActiveUser } from "../actions/userActions";
import { getStore } from '../store';
import "../resources/styles/components/chat/ChatBox.scss";
import { Header } from "./common/Header";
import { connect } from 'react-redux';
import Suggestions from './common/AISuggestions';
import { Chats } from './Chats';
import {user_types, chatBoard_types, chats_types, connected_users_types} from '../types/types';
import {getSuggestions} from '../apis/AiSuggestionApi';
const backgroundColors = ["#CB6080", "#0AA693", "#966AB8", "#3D9CC4"]

interface IProps {
    user: user_types;
    chatBoard: chatBoard_types;
    connectedUsers: Array<user_types>;
    chats: chats_types;
    dispatch?
}

interface IState {
    activeChats: any;
    inputMessages: any;
    value: string;
    currentlyChattingUser: string
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
            currentlyChattingUser: "",
            suggestions: []
        }
    }

    public render() {
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
        if (inactiveChats.length === 0)
            return "";
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
                        if (inactiveChat.lastMessageTimer > 60) {
                            boxAnimation = `blink-alert .5s step-end infinite alternate`;
                        }
                        return (
                            <span onClick={(ev) => this.setActiveUser.call(this, inactiveChat.id)} key={index} style={{ background: backgroundColor, animation: boxAnimation }}><div>
                                {inactiveChat.name.substring(0, 1)}</div>
                            </span>

                        )
                    })}
                </div>
            </div>
        )
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

                            <Suggestions userId={activeChat.id} results={this.state.suggestions} onSuggestionClick={this.onSuggestionClick.bind(this)} />
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

    private getSuggestions(newValue) {
        getSuggestions(newValue)
            .then(({ data }) => {
                this.setState({
                    suggestions: data
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

    private onSuggestionClick(suggestion, userId) {
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

    private setActiveUser(userId) {
        this.props.dispatch(setActiveUser(userId));
    }

    private handleMessageChange = (e, userId) => {
        const inputMessages = this.state.inputMessages;
        inputMessages[userId] = e.target.value;

        if (e.target.value.length >= 1)
            this.getSuggestions.call(this, e.target.value);
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


