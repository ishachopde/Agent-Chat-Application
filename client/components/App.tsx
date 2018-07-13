
import * as React from "react";
import { HashRouter, Route, Switch, Redirect} from "react-router-dom";
import { Main } from "./Main";
import { Footer } from "./common/Footer";
import { Header } from "./common/Header";
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
                    <Header />         
                    <Switch>
                        <Route exact path="/" component={Main}/>
                    </Switch>
                    <Footer />
                </div>
            </HashRouter>
        );
      }
}
