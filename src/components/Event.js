import React from 'react';
import '../App.css';

class Event extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="App-contents">

          <div className="content-area">
            <div className="title">commulab</div>
            <div className="content">
              {this.props.translation('予定されていません')}
            </div>
          </div>

          <div className="content-area">
            <div className="title">{this.props.translation('Lisk 公式')}</div>
            <div className="content">
              <div style={{borderBottom: "1px dotted #404041"}}>
                <div className="reward-title">AmpliFire</div>
                <div className="reward-result">
                  <div>{this.props.translation('日時')}： 2021/12/3 AM2:00～AM7:00 (JST)</div>
                  <div>{this.props.translation('詳細')}：&nbsp;
                    <a href="https://lisk.com/blog/announcement/amplifire-event-lisk" target="_new">lisk.com</a>
                    &nbsp;/&nbsp;
                    <a href="https://www.youtube.com/watch?v=31XPRrrBBX4" target="_new">youtube</a>
                    &nbsp;/&nbsp;
                    <a href="https://www.eventbrite.com/e/amplifire-tickets-201633179267" target="_new">eventbrite</a>
                  </div>
                  <div>{this.props.translation('タグ')}： {this.props.translation('対面')}, {this.props.translation('オンライン')}</div>
                </div>
              </div>

              <div>
                <div className="reward-title">HackOnLisk2</div>
                <div className="reward-result">
                  <div>{this.props.translation('日時')}： 2021/9/11 AM1:15～2021/12/3 AM2:00 (JST)</div>
                  <div>{this.props.translation('詳細')}：&nbsp;
                    <a href="https://lisk.com/blog/announcement/announcing-hackonlisk2" target="_new">lisk.com</a>
                    &nbsp;/&nbsp;
                    <a href="https://hackonlisk2.devpost.com/" target="_new">devpost</a>
                  </div>
                  <div>{this.props.translation('タグ')}：{this.props.translation('ハッカソン')}, {this.props.translation('オンライン')}</div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}

export default Event;
