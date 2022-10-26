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
              {/* {this.props.translation('予定されていません')} */}

              <div>
                <div className="event-title">1周年記念キャンペーン</div>
                <div className="event-detail">
                  <div>
                    {this.props.translation('日時')}： 2022/10/30～2022/11/12(JST)
                  </div>
                  <div>
                    {this.props.translation('アナウンス')}：&nbsp;
                    <a href="https://twitter.com/liskcommulab/status/1585058626623995907" target="_new">twitter</a>
                  </div>
                  <div>
                    {this.props.translation('詳細')}：&nbsp;
                    期間中にcommulabに投票されている方への報酬割合が100%(通常時50%)になります。
                  </div>
                  <div>
                    {this.props.translation('タグ')}：&nbsp;
                    {this.props.translation('オンライン')}
                  </div>
                </div>
              </div>

              <div>
                <div className="event-title">おみくじを引いてLSKをもらおう</div>
                <div className="event-detail">
                  <div>
                    {this.props.translation('日時')}： {this.props.translation('終了')}
                  </div>
                  <div>
                    {this.props.translation('アナウンス')}：&nbsp;
                    <a href="https://twitter.com/liskcommulab/status/1477067219922460674" target="_new">twitter</a>
                  </div>
                  <div>
                    {this.props.translation('詳細')}：
                    <a href="https://liskcommulab.jp/omikuji" target="_new">おみくじイベント会場</a>
                  </div>
                  <div>
                    {this.props.translation('タグ')}：&nbsp;
                    {this.props.translation('オンライン')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="content-area">
            <div className="title">{this.props.translation('Lisk 公式')}</div>
            <div className="content">

              <div style={{borderBottom: "1px dotted #404041"}}>
                <div className="event-title">HackOnLisk3</div>
                <div className="event-detail">
                  <div>
                    {this.props.translation('日時')}： 2022
                  </div>
                  <div>
                    {this.props.translation('アナウンス')}：
                  </div>
                  <div>
                    {this.props.translation('詳細')}：
                  </div>
                  <div>
                    {this.props.translation('タグ')}：&nbsp;
                    {this.props.translation('ハッカソン')},&nbsp;
                    {this.props.translation('オンライン')}
                  </div>
                </div>
              </div>

              <div>
                <div className="event-title">AmpliFire</div>
                <div className="event-detail">
                  <div>
                    {this.props.translation('日時')}： {this.props.translation('終了')}
                  </div>
                  <div>
                    {this.props.translation('アナウンス')}：&nbsp;
                    <a href="https://lisk.com/blog/announcement/amplifire-event-lisk" target="_new">lisk.com</a>
                  </div>
                  <div>
                    {this.props.translation('詳細')}：&nbsp;
                    <a href="https://www.youtube.com/playlist?list=PLixm1arf_lEyxuTR5WlvCm_hMYi6h8Y8N" target="_new">youtube</a>
                  </div>
                  <div>
                    {this.props.translation('タグ')}：&nbsp;
                    {this.props.translation('重要')},&nbsp;
                    {this.props.translation('対面')},&nbsp;
                    {this.props.translation('オンライン')}
                  </div>
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
