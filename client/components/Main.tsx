import * as React from "react";
import {addMessage} from "../actions/messageActions";
import {getStore} from '../store';
import "../resources/styles/components/Main.scss";

interface IProps {
    dispatch?
}

export class Main extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <div id="live-chat-1" className={"live-chat"}>
                    <header>
                        <div className="chat-timer">
                            <span className="chat-timer-text"> 5.4s</span>

                        </div>
                        <h4>John Doe</h4>


                    </header>
                    <div className="chat">

                        <div className="chat-history">
                            <div className="chat-left">
                                <div className="chat-message-left clearfix">

                                    <div className="chat-message-content clearfix">

                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, explicabo
                                            quasi ratione odio dolorum harum.</p>

                                    </div>

                                </div>
                            </div>
                            <hr/>

                            <div className="chat-right">
                                <div className="chat-message-right clearfix">

                                    <div className="chat-message-content clearfix">


                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, nulla
                                            accusamus magni vel debitis numquam qui tempora rem voluptatem delectus!</p>

                                    </div>

                                </div>
                            </div>
                            <hr/>

                            <div className="chat-left">
                                <div className="chat-message-left clearfix">

                                    <div className="chat-message-content clearfix">


                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>

                                    </div>

                                </div>
                            </div>
                            <div className="chat-right">
                                <div className="chat-message-right clearfix">

                                    <div className="chat-message-content clearfix">


                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, nulla
                                            accusamus magni vel debitis numquam qui tempora rem voluptatem delectus!</p>

                                    </div>

                                </div>
                            </div>

                            <hr/>

                            <div className="chat-left">
                                <div className="chat-message-left clearfix">

                                    <div className="chat-message-content clearfix">


                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>

                                    </div>

                                </div>
                            </div>
                            <div className="chat-right">
                                <div className="chat-message-right clearfix">

                                    <div className="chat-message-content clearfix">


                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, nulla
                                            accusamus magni vel debitis numquam qui tempora rem voluptatem delectus!</p>

                                    </div>

                                </div>
                            </div>

                            <hr/>

                            <div className="chat-left">
                                <div className="chat-message-left clearfix">

                                    <div className="chat-message-content clearfix">


                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>

                                    </div>

                                </div>
                            </div>
                            <div className="chat-right">
                                <div className="chat-message-right clearfix">

                                    <div className="chat-message-content clearfix">


                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, nulla
                                            accusamus magni vel debitis numquam qui tempora rem voluptatem delectus!</p>

                                    </div>

                                </div>
                            </div>

                            <hr/>

                            <div className="chat-left">
                                <div className="chat-message-left">

                                    <div className="chat-message-content">

                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
                                    </div>
                                    <div className="chat-time-left">
                                        13.45
                                    </div>

                                </div>
                            </div>

                            <hr/>

                        </div>

                        <p className="chat-feedback">Your partner is typing…</p>

                        <div className="chat-text-area">
                            <textarea rows={4} cols={50}/>
                        </div>


                    </div>
                </div>

                <div id="live-chat-2" className={"live-chat"}>
                    <header>
                        <div className="chat-timer">
                            <span className="chat-timer-text"> 5.4s</span>

                        </div>
                        <h4>John Doe</h4>


                    </header>
                    <div className="chat">

                        <div className="chat-history">
                            <div className="chat-left">
                                <div className="chat-message-left clearfix">

                                    <div className="chat-message-content clearfix">

                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, explicabo
                                            quasi ratione odio dolorum harum.</p>

                                    </div>

                                </div>
                            </div>
                            <hr/>

                            <div className="chat-right">
                                <div className="chat-message-right clearfix">

                                    <div className="chat-message-content clearfix">


                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, nulla
                                            accusamus magni vel debitis numquam qui tempora rem voluptatem delectus!</p>

                                    </div>

                                </div>
                            </div>
                            <hr/>

                            <div className="chat-left">
                                <div className="chat-message-left clearfix">

                                    <div className="chat-message-content clearfix">


                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>

                                    </div>

                                </div>
                            </div>
                            <div className="chat-right">
                                <div className="chat-message-right clearfix">

                                    <div className="chat-message-content clearfix">


                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, nulla
                                            accusamus magni vel debitis numquam qui tempora rem voluptatem delectus!</p>

                                    </div>

                                </div>
                            </div>

                            <hr/>

                            <div className="chat-left">
                                <div className="chat-message-left clearfix">

                                    <div className="chat-message-content clearfix">


                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>

                                    </div>

                                </div>
                            </div>
                            <div className="chat-right">
                                <div className="chat-message-right clearfix">

                                    <div className="chat-message-content clearfix">


                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, nulla
                                            accusamus magni vel debitis numquam qui tempora rem voluptatem delectus!</p>

                                    </div>

                                </div>
                            </div>

                            <hr/>

                            <div className="chat-left">
                                <div className="chat-message-left clearfix">

                                    <div className="chat-message-content clearfix">


                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>

                                    </div>

                                </div>
                            </div>
                            <div className="chat-right">
                                <div className="chat-message-right clearfix">

                                    <div className="chat-message-content clearfix">


                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, nulla
                                            accusamus magni vel debitis numquam qui tempora rem voluptatem delectus!</p>

                                    </div>

                                </div>
                            </div>

                            <hr/>

                            <div className="chat-left">
                                <div className="chat-message-left">

                                    <div className="chat-message-content">

                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
                                    </div>
                                    <div className="chat-time-left">
                                        13.45
                                    </div>

                                </div>
                            </div>

                            <hr/>

                        </div>

                        <p className="chat-feedback">Your partner is typing…</p>

                        <div className="chat-text-area">
                            <textarea rows={4} cols={50}/>
                        </div>


                    </div>
                </div>
                <div id="live-chat-3" className={"live-chat"}>
                    <header>
                        <div className="chat-timer">
                            <span className="chat-timer-text"> 5.4s</span>

                        </div>
                        <h4>John Doe</h4>


                    </header>
                    <div className="chat">

                        <div className="chat-history">
                            <div className="chat-left">
                                <div className="chat-message-left clearfix">

                                    <div className="chat-message-content clearfix">

                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, explicabo
                                            quasi ratione odio dolorum harum.</p>

                                    </div>

                                </div>
                            </div>
                            <hr/>

                            <div className="chat-right">
                                <div className="chat-message-right clearfix">

                                    <div className="chat-message-content clearfix">


                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, nulla
                                            accusamus magni vel debitis numquam qui tempora rem voluptatem delectus!</p>

                                    </div>

                                </div>
                            </div>
                            <hr/>

                            <div className="chat-left">
                                <div className="chat-message-left clearfix">

                                    <div className="chat-message-content clearfix">


                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>

                                    </div>

                                </div>
                            </div>
                            <div className="chat-right">
                                <div className="chat-message-right clearfix">

                                    <div className="chat-message-content clearfix">


                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, nulla
                                            accusamus magni vel debitis numquam qui tempora rem voluptatem delectus!</p>

                                    </div>

                                </div>
                            </div>

                            <hr/>

                            <div className="chat-left">
                                <div className="chat-message-left clearfix">

                                    <div className="chat-message-content clearfix">


                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>

                                    </div>

                                </div>
                            </div>
                            <div className="chat-right">
                                <div className="chat-message-right clearfix">

                                    <div className="chat-message-content clearfix">


                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, nulla
                                            accusamus magni vel debitis numquam qui tempora rem voluptatem delectus!</p>

                                    </div>

                                </div>
                            </div>

                            <hr/>

                            <div className="chat-left">
                                <div className="chat-message-left clearfix">

                                    <div className="chat-message-content clearfix">


                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>

                                    </div>

                                </div>
                            </div>
                            <div className="chat-right">
                                <div className="chat-message-right clearfix">

                                    <div className="chat-message-content clearfix">


                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, nulla
                                            accusamus magni vel debitis numquam qui tempora rem voluptatem delectus!</p>

                                    </div>

                                </div>
                            </div>

                            <hr/>

                            <div className="chat-left">
                                <div className="chat-message-left">

                                    <div className="chat-message-content">

                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
                                    </div>
                                    <div className="chat-time-left">
                                        13.45
                                    </div>

                                </div>
                            </div>

                            <hr/>

                        </div>

                        <p className="chat-feedback">Your partner is typing…</p>

                        <div className="chat-text-area">
                            <textarea rows={4} cols={50}/>
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

        if (ev.which === 13) {
            //const trimmedMessage = this.props.value.trim();

            // if (trimmedMessage) {
            console.log("Key presed");
            const store = getStore();
            store.dispatch(addMessage("demo"));
            //  }

            ev.preventDefault();
        }
    }
}
