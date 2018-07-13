import * as React from "react";
import {Link} from "react-router-dom";
import "../../resources/styles/components/common/Footer.scss";
export class Footer extends React.Component {
    public render() {
        return (
            <footer>
            <main>
                <span id="copyright-notice">
                    Developed by Isha Chopde
                </span>
            </main>
        </footer>
        );
    }
}
