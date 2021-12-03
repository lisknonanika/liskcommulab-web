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
                <div className="event-title">AmpliFire</div>
                <div className="event-detail">
                  <div>{this.props.translation('日時')}： -</div>
                  <div>{this.props.translation('アナウンス')}：&nbsp;
                    <a href="https://lisk.com/blog/announcement/amplifire-event-lisk" target="_new">lisk.com</a>
                  </div>
                  <div>{this.props.translation('詳細')}：&nbsp;
                    <a href="https://www.youtube.com/watch?v=31XPRrrBBX4" target="_new">youtube</a>
                    &nbsp;/&nbsp;
                    <a href="https://www.eventbrite.com/e/amplifire-tickets-201633179267" target="_new">eventbrite</a>
                  </div>
                  <div>{this.props.translation('タグ')}： {this.props.translation('対面')}, {this.props.translation('オンライン')}</div>
                </div>
              </div>

              <div style={{borderBottom: "1px dotted #404041"}}>
                <div className="event-title">HackOnLisk3</div>
                <div className="event-detail">
                  <div>{this.props.translation('日時')}： 2022</div>
                  <div>{this.props.translation('アナウンス')}：&nbsp;
                    -
                  </div>
                  <div>{this.props.translation('詳細')}：&nbsp;
                    -
                  </div>
                  <div>{this.props.translation('タグ')}：{this.props.translation('ハッカソン')}, {this.props.translation('オンライン')}</div>
                </div>
              </div>

              <div style={{borderBottom: "1px dotted #404041"}}>
                <div className="event-title">Ask Max Anything</div>
                <div className="event-detail">
                  <div>{this.props.translation('日時')}： {this.props.translation('次回未定')}</div>
                  <div>{this.props.translation('アナウンス')}：&nbsp;
                    <a href="https://twitter.com/maxkordek/status/1455487974527881225" target="_new">twitter</a>
                  </div>
                  <div>{this.props.translation('詳細')}：&nbsp;
                    <a href="https://www.youtube.com/watch?v=P13z_u5ahoc" target="_new">youtube</a>
                  </div>
                  <div>{this.props.translation('タグ')}： {this.props.translation('定期')}, AMA, {this.props.translation('オンライン')}</div>
                </div>
              </div>

              <div>
                <div className="event-title">Lisk Army Contest</div>
                <div className="event-detail">
                  <div>{this.props.translation('日時')}： 2021/12/2 2:00〜 (JST)</div>
                  <div>{this.props.translation('アナウンス')}：&nbsp;
                    <a href="https://twitter.com/LiskHQ/status/1456283209663123463" target="_new">twitter</a>
                  </div>
                  <div>{this.props.translation('詳細')}：&nbsp;
                    <a href="https://sweepwidget.com/view/38437-g7p8qesk" target="_new">sweepwidget</a>
                  </div>
                  <div>{this.props.translation('タグ')}： {this.props.translation('恒常')}, {this.props.translation('オンライン')}</div>
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
