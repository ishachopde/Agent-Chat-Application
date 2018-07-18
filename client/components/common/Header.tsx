import * as React from "react";
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import "../../resources/styles/components/common/Header.scss";
import { changeOnlineCounter, changeOfflineCounter, setUserOnlineStatus } from "../../actions/userActions";
interface IProps {
    user: {
        isOnline: boolean,
        onlineCount: number,
        offlineCount: number
    };
    dispatch?
}

interface IState {
    onlineCount: number;
    offlineCount: number;
}
export class HeaderClass extends React.Component<IProps, IState> {
    private offlinetimer;
    private ontimer;
    constructor(props) {
        super(props);
    }
    private formatSeconds (totalSeconds) {
        let seconds: number = totalSeconds % 60;
        let minutes: number = Math.floor(totalSeconds / 60);
        //let hours: number = Math.floor(totalSeconds / 60);
        let secondsString: string = seconds.toString();
        let minuteString: string = minutes.toString();
        //console.log(seconds);
        if (seconds < 10) {
            secondsString = '0' + secondsString;
        }

        if (minutes < 10) {
            minuteString = '0' + minuteString;
        }
        return '00:' + minuteString + ':' + seconds;
    }

    componentDidMount () {
        console.log(this.props.user.isOnline);
        if(this.props.user.isOnline) {
            this.startOnlineTimer(); 
            clearInterval(this.offlinetimer);
        } else {
            this.startOfflineTimer(); 
            clearInterval(this.ontimer);
        }
    }

    componentWillUnmount() {
        clearInterval(this.ontimer);
        clearInterval(this.offlinetimer);
    }

    private startOnlineTimer () {
        this.ontimer = setInterval(() => {
            this.props.dispatch(changeOnlineCounter());
        }, 1000);
    }

    private startOfflineTimer () {
        this.offlinetimer = setInterval(() => {
            this.props.dispatch(changeOfflineCounter());
        }, 1000);
    }

    private changeStatusChange (event){
        const status = event.target.value;

        if(status.toLowerCase() === "online") {
            this.startOnlineTimer(); 
            clearInterval(this.offlinetimer);
            this.props.dispatch(setUserOnlineStatus(true));
        } else {
            this.startOfflineTimer(); 
            clearInterval(this.ontimer);
            this.props.dispatch(setUserOnlineStatus(false));
        }
    }

    public render() {
        const { onlineCount, offlineCount } = this.props.user;
        //console.log(onlineCount, offlineCount);
        return (
            <div className="header">
  <a href="#default" className="logo">Front End Challenge</a>
  <div className="headerrightitems">
    <div className="selectWrapper">
            <select className="selectBox" onChange={this.changeStatusChange.bind(this)}>
            <option>Online</option>
            <option>Offline</option>
        </select>
        </div>
    <div className="headertimers12">
        <div className="header-timer-divs">
                    <div>AWAY - {this.formatSeconds(offlineCount)} </div> 
                    <div> ONLINE - {this.formatSeconds(onlineCount)} </div>
        </div>
    </div>
  </div>
</div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

export const Header = connect(
    mapStateToProps,
)(HeaderClass);
