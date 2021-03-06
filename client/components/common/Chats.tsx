
/**
 * Component to display user chat messages.
 * @author  Isha CHopde
 */

import * as React from "react";
import {user_types, chats_types} from '../../types/types';
interface IProps {
    chats: chats_types | any
    user: user_types
    backgroundColor: string
}

export class Chats extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }
    public render() {
    const { chats, user, backgroundColor } = this.props;
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
                    <div className="msg-right" style={{ background: backgroundColor}}>
                        <p>{message.message}</p>
                    </div>
                    {messageTime}
                </div>
                
            );
        else
            return (
                <div key={index}>
                    <div className="msg-left">
                        <p>{message.message}</p>
                    </div>
                    {messageTime}
                </div>
            );
    });
    return (
        <div className="chat-history">
            {renderChats}
        </div>
    );
    }
}
