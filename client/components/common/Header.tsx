import * as React from "react";
import {Link} from "react-router-dom";
import "../../resources/styles/components/common/Header.scss";
export class Header extends React.Component<{}, {}> {
    public render() {
        return (
            <div className="header">
  <a href="#default" className="logo">CompanyLogo</a>
  <div className="header-right">
    <a className="active" href="#home">Home</a>
    <a href="#contact">Contact</a>
    <a href="#about">About</a>
  </div>
</div>
        );
    }
}
