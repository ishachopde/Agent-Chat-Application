
/**
 * Component to display header.
 * @author  Isha CHopde
 */
import * as React from "react";
import { connect } from 'react-redux';
import "../../resources/styles/components/common/Header.scss";
import { changeOnlineCounter, changeOfflineCounter, setUserOnlineStatus } from "../../actions/userActions";
import {user_types} from '../../types/types';
interface IProps {
    user: user_types;
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
        const hours = Math.floor(totalSeconds / 3600);
        //let hours: number = Math.floor(totalSeconds / 60);
        let secondsString: string = seconds.toString();
        let minuteString: string = minutes.toString();
        let hoursString: string = hours.toString();
        //console.log(seconds);
        if (seconds < 10) {
            secondsString = '0' + secondsString;
        }

        if (minutes < 10) {
            minuteString = '0' + minuteString;
        }
        if (hours < 10) {
            hoursString = '0' + hoursString;
        }
        return hoursString + ':' + minuteString + ':' + seconds;
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
        const { onlineCount, offlineCount, isOnline, name } = this.props.user;
        const statusDropDownClass = (isOnline) ? "border-online" : "border-offline";
        //console.log(onlineCount, offlineCount);
        return (
            <div className="header">
                <a href="#default" className="logo">FAgent Chat Application: Isha Chopde - {name}</a>
  <div className="headerrightitems">
    <div className={`selectWrapper ${statusDropDownClass}`}>
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
