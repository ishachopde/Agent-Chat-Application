import * as React from "react";
import { Link } from "react-router-dom";
import "../resources/styles/components/Test.scss";
export class Test1 extends React.Component<{}, {}> {
    public render() {
        return (
            <div className="msg_box" >
                <div className="msg_head">
             
                    <div className="chat-timer">
                                <span className="chat-timer-text"> 5.4s</span>
                    </div>
                    <h4>Swapnil</h4>
            </div>
                <div className="msg_wrap">
                    <div className="msg_body">
                        <div className="msg_push">
                        <div className="msg-left">
                                left
                            </div>   
                            <div className="msg-right">
                                right
                            </div>  
                            <div className="msg-left">
                                left
                            </div>   
                            <div className="msg-right">
                                right
                            </div>  
                            <div className="msg-left">
                                left
                            </div>   
                            <div className="msg-right">
                                right
                            </div>  
                            <div className="msg-right">
                                right
                            </div>  
                            <div className="msg-left">
                                left
                            </div>   
                            <div className="msg-right">
                                right
                            </div>     
                        </div>
                    </div><div className="msg_footer">
                        <textarea className="msg_input" rows={4}></textarea></div> 	</div> 	</div>
        );
    }
}
