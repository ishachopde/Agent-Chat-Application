
import * as React from "react";
import { HashRouter, Route, Switch, Redirect} from "react-router-dom";
import { Main } from "./Main";
import { UserNamePopUp } from "./UserNamePopUp";
import { AgentChat } from "./AgentChat";
import "../resources/styles/components/App.scss";
interface IProps {
    dispatch?
}

export class App extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <Switch>
                        <Route exact path="/" component={UserNamePopUp}/>
                        <Route exact path="/agent/:boardId" component={AgentChat} />
                        <Route exact path="/:boardId" component={Main} />
                    </Switch>
                </div>
            </HashRouter>
        );
      }
}

