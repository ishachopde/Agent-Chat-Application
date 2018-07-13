import * as React from "react";
import {Link} from "react-router-dom";
import "../../resources/styles/components/common/Header.scss";
export class Header extends React.Component<{}, {}> {
    public render() {
        return (
            <ul id="h" className="menu-list">
            <li className="title"><div className="header-logo-item"><div className="header-logo"/></div></li>
            <li className="ml-auto"/>
            <li className="">
                <a href="/">Feedback</a>
            </li>
        </ul>
        );
    }
}
