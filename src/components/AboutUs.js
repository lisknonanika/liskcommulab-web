import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faGlobe, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { convertBeddowsToLSK } from '@liskhq/lisk-transactions';
import '../App.css';

class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: {balance:"", rank:"", voteWeight:"", totalVotesReceived:""},
    };
  }

  async componentDidMount() {
    try {
      const resH = await fetch(
        `https://service.lisk.com/api/v2/accounts?username=commulab&isDelegate=true&limit=1&offset=0`,
        {mode: 'cors'}
      );
      const jsonH = await resH.json();
      const data = jsonH.data[0];
      this.setState({
        account: {
          balance: convertBeddowsToLSK(data.token.balance),
          rank: String(data.dpos.delegate.rank),
          voteWeight: convertBeddowsToLSK(data.dpos.delegate.voteWeight),
          totalVotesReceived: convertBeddowsToLSK(data.dpos.delegate.totalVotesReceived)
        }
      });
    } catch (err) {
      // 何もしない
    }
  }

  render() {
    return (
      <div>
        <div className="App-contents">
          <div className="content-area">
            <div className="title">{this.props.translation('私たちについて')}</div>
            <div className="content">
              <div>{this.props.translation('日本で活動しているコミュニティです。')}</div>
              <div>{this.props.translation('日本人向けにLiskに関する質問回答など様々な支援を行っています。')}</div>
              <div>{this.props.translation('Liskや当コミュニティに関して不明な点がありましたらお気軽にご質問をどうぞ。')}</div>
              <div style={{marginTop: "20px"}}>{this.props.translation('詳しくはこちら')}</div>
              <div>- <a href="https://note.com/liskcommulab/n/n1ba460ab394e" target="_new">Lisk CommuLab設立と新デリゲート立ち上げに伴う投票変更のご案内</a></div>
              <div style={{marginTop: "5px"}}>- <a href="https://note.com/liskcommulab/n/ncf7163771c4d" target="_new">Establishment of "Lisk CommuLab" and Guide to Delegate Migration</a></div>
            </div>
          </div>
  
          <div className="content-area">
            <div className="title">{this.props.translation('デリゲート情報')}</div>
            <div className="content">
              <div className="row">
                <div className="name">commulab</div>
                <div className="text">
                  <a href="https://lisk.observer/account/lsk5tyhc6tw76ybwwzt9vcefy3gryjvprkcj329tw" target="_new">
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.4 136.3" className="lisk-icon">
                      <g>
                        <g>
                          <path d="M45.1,136.1l17.8-20c0.3-0.3,0.1-0.8-0.4-0.8H42.9c-0.1,0-0.3-0.1-0.4-0.2L25.9,96.5
                            c-0.1-0.2-0.2-0.4-0.1-0.6l27.8-47.7c0.1-0.2,0.1-0.4,0-0.5L42.1,27.9c-0.2-0.3-0.7-0.3-0.9,0L0.1,98.5C0,98.7,0,98.9,0.1,99.1
                            l33,37.1c0.1,0.1,0.2,0.2,0.4,0.2h11.2C44.8,136.3,45,136.2,45.1,136.1z"/>
                          <path d="M57.3,0.3L45.7,20.1c-0.1,0.2-0.1,0.4,0,0.5l12,20.6l0,0l31.8,54.6c0.1,0.2,0.1,0.4-0.1,0.6l-16.8,18.8h0
                            l-17.9,20.2c-0.3,0.3-0.1,0.8,0.4,0.8h26.8c0.1,0,0.3-0.1,0.4-0.2l33-37.1c0.1-0.2,0.2-0.4,0.1-0.6L58.1,0.3
                            C58-0.1,57.5-0.1,57.3,0.3z"/>
                        </g>
                      </g>
                    </svg> Lisk
                  </a>
                </div>
                <div className="text"><a href="https://twitter.com/liskcommulab" target="_new"><FontAwesomeIcon icon={faTwitter}/> Twitter</a></div>
              </div>
              <div className="row" style={{borderBottom: "1px dotted #404041"}}>
                <ul>
                  <li style={{marginTop: "3px"}}>{this.props.translation('アドレス')}<br/><a href="https://lisk.observer/account/lsk5tyhc6tw76ybwwzt9vcefy3gryjvprkcj329tw" target="_new">lsk5tyhc6tw76ybwwzt9vcefy3gryjvprkcj329tw</a></li>
                  <li style={{marginTop: "3px"}}>{this.props.translation('ランク')}<br/>{this.state.account.rank}</li>
                  <li style={{marginTop: "3px"}}>{this.props.translation('得票数 / 最大票数')}<br/>{this.state.account.totalVotesReceived} / {this.state.account.voteWeight}</li>
                </ul>
              </div>
              <div className="row" style={{marginTop: "5px"}}><div className="text">{this.props.translation('いつも応援ありがとうございます。')}</div></div>
              <div className="row"><div className="text">{this.props.translation('commulabへの投票・寄付で私たちをサポートして下さい。')}</div></div>
            </div>
          </div>
  
          <div className="content-area">
            <div className="title">{this.props.translation('メンバー情報')}</div>
            <div className="content">
              
              <div className="row"><div className="job" style={{marginBottom: "1px"}}>- {this.props.translation('管理者')} -</div></div>
              <div className="row">
                <div className="name">uzamaru</div>
                <div className="text"><a href="https://twitter.com/uzamaru_crypto" target="_new"><FontAwesomeIcon icon={faTwitter}/> Twitter</a></div>
              </div>
              <div className="row" style={{borderBottom: "1px dotted #404041"}}>
                <ul>
                  <li>{this.props.translation('commulabのTwitterアカウントの管理')}</li>
                  <li>{this.props.translation('Liskに関する質問回答などの日本人サポート')}</li>
                </ul>
              </div>
              
              <div className="row"><div className="job" style={{marginBottom: "1px"}}>- {this.props.translation('管理者')} -</div></div>
              <div className="row">
                <div className="name">ebifu222</div>
                <div className="text"><a href="https://twitter.com/ebifu222" target="_new"><FontAwesomeIcon icon={faTwitter}/> Twitter</a></div>
              </div>
              <div className="row" style={{borderBottom: "1px dotted #404041"}}>
                <ul>
                  <li>{this.props.translation('commulabのDiscordアカウントの管理')}</li>
                  <li>{this.props.translation('Liskに関する質問回答などの日本人サポート')}</li>
                </ul>
              </div>
  
              <div className="row"><div className="job">- {this.props.translation('開発者')} -</div></div>
              <div className="row">
                <div className="name">ys_mdmg</div>
                <div className="text">
                  <a href="https://lisk.observer/account/lskb7gxff65y6epkmkoqe8xkq7qu5bcnnet6d2nco" target="_new">
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.4 136.3" className="lisk-icon">
                      <g>
                        <g>
                          <path d="M45.1,136.1l17.8-20c0.3-0.3,0.1-0.8-0.4-0.8H42.9c-0.1,0-0.3-0.1-0.4-0.2L25.9,96.5
                            c-0.1-0.2-0.2-0.4-0.1-0.6l27.8-47.7c0.1-0.2,0.1-0.4,0-0.5L42.1,27.9c-0.2-0.3-0.7-0.3-0.9,0L0.1,98.5C0,98.7,0,98.9,0.1,99.1
                            l33,37.1c0.1,0.1,0.2,0.2,0.4,0.2h11.2C44.8,136.3,45,136.2,45.1,136.1z"/>
                          <path d="M57.3,0.3L45.7,20.1c-0.1,0.2-0.1,0.4,0,0.5l12,20.6l0,0l31.8,54.6c0.1,0.2,0.1,0.4-0.1,0.6l-16.8,18.8h0
                            l-17.9,20.2c-0.3,0.3-0.1,0.8,0.4,0.8h26.8c0.1,0,0.3-0.1,0.4-0.2l33-37.1c0.1-0.2,0.2-0.4,0.1-0.6L58.1,0.3
                            C58-0.1,57.5-0.1,57.3,0.3z"/>
                        </g>
                      </g>
                    </svg> Lisk
                  </a>
                </div>
                <div className="text"><a href="https://twitter.com/ys_mdmg" target="_new"><FontAwesomeIcon icon={faTwitter}/> Twitter</a></div>
                <div className="text"><a href="https://github.com/lisknonanika" target="_new"><FontAwesomeIcon icon={faGithub}/> GitHub</a></div>
                <div className="text"><a href="https://note.com/lisknonanika" target="_new"><FontAwesomeIcon icon={faBookOpen}/> note</a></div>
              </div>
              <div className="row">
                <ul>
                  <li>{this.props.translation('ノード・サイト管理')}</li>
                  <li>{this.props.translation('Liskに関するツール・アプリの開発')}</li>
                  <li>{this.props.translation('Liskに関する質問回答などの日本人サポート')}</li>
                </ul>
              </div>
            </div>
          </div>
  
          <div className="content-area">
            <div className="title">{this.props.translation('製品・管理')}</div>
            <div className="content">
              <div className="row">
                <div className="name">Lisk Service</div>
                <div className="text">
                  <a href="https://mainnet-service.liskcommulab.jp/api/status" target="_new">Mainnet</a>
                  &nbsp;/&nbsp;
                  <a href="https://testnet-service.liskcommulab.jp/api/status" target="_new">Testnet</a>
                </div>
              </div>
              <div className="row">
                <div className="name">Lisk Payout</div>
                <div className="text">
                  <a href="https://github.com/lisknonanika/lisk-payout" target="_new">Source</a>
                  &nbsp;/&nbsp;
                  <a href="https://mainnet-payout.liskcommulab.jp" target="_new">API</a>
                </div>
              </div>
            </div>
          </div>
  
          <div className="content-area">
            <div className="title">{this.props.translation('リンク')}</div>
            <div className="content">
              <div className="row">
                <div className="name" style={{fontWeight: "bold", whiteSpace: "nowrap"}}>{this.props.translation('Lisk 公式')}</div>
                <div className="text" style={{whiteSpace: "nowrap"}}><a href="https://lisk.com/" target="_new"><FontAwesomeIcon icon={faGlobe}/> Site</a></div>
                <div className="text" style={{whiteSpace: "nowrap"}}><a href="https://twitter.com/LiskHQ" target="_new"><FontAwesomeIcon icon={faTwitter}/> Twitter</a></div>
                <div className="text" style={{whiteSpace: "nowrap"}}><a href="https://github.com/LiskHQ" target="_new"><FontAwesomeIcon icon={faGithub}/> GitHub</a></div>
                <div className="text" style={{whiteSpace: "nowrap"}}><a href="https://lisk.chat" target="_new"><FontAwesomeIcon icon={faDiscord}/> Discord</a></div>
              </div>
              <div className="row">
                <div className="name" style={{whiteSpace: "nowrap"}}>Lisk Observer</div>
                <div className="text" style={{whiteSpace: "nowrap"}}><a href="https://lisk.observer/" target="_new"><FontAwesomeIcon icon={faProjectDiagram}/> Lisk Explorer</a></div>
              </div>
              <div className="row">
                <div className="name" style={{whiteSpace: "nowrap"}}>Lisk Scan</div>
                <div className="text" style={{whiteSpace: "nowrap"}}><a href="https://liskscan.com/" target="_new"><FontAwesomeIcon icon={faProjectDiagram}/> Lisk Explorer</a></div>
              </div>
              <div className="row">
                <div className="name" style={{fontWeight: "bold", whiteSpace: "nowrap"}}>Lisk.vote</div>
                <div className="text" style={{whiteSpace: "nowrap"}}><a href="https://lisk.vote/" target="_new"><FontAwesomeIcon icon={faGlobe}/> Site</a></div>
              </div>
              <div className="row">
                <div className="name" style={{fontWeight: "bold", whiteSpace: "nowrap"}}>Lisk Rewards</div>
                <div className="text" style={{whiteSpace: "nowrap"}}><a href="https://liskrewards.com/" target="_new"><FontAwesomeIcon icon={faGlobe}/> Site</a></div>
              </div>
              <div className="row">
                <div className="name" style={{fontWeight: "bold", whiteSpace: "nowrap"}}>{this.props.translation('日本語コミュニティ')}</div>
                <div className="text" style={{whiteSpace: "nowrap"}}><a href="https://discord.com/invite/jWruheS" target="_new"><FontAwesomeIcon icon={faDiscord}/> Discord</a></div>
              </div>
            </div>
          </div>

          <div className="content-area">
            <div className="title" style={{backgroundColor: "#da0000", borderColor: "#da0000", fontWeight: "bold"}}>注意</div>
            <div className="content" style={{backgroundColor: "rgba(233, 223, 37, 0.05)", borderColor: "#da0000"}}>
              <div style={{fontWeight: "bold"}}>Liskはバージョン3へアップグレードされました。</div>
              <div>旧ウォレット(Lisk nano, Lisk Hub, Lisk Desktop 2.0.0未満)の利用が出来なくなっています。</div>
              <div>また、現時点ではLisk Mobileや各種ハードウェアウォレットが対応していません。</div>
              <div>LSKを送る場合は<a href="https://lisk.com/wallet" target="_new">Lisk公式サイトから最新のLisk Desktop</a>をダウンロードして下さい。</div>
              <div>Lisk Desktopの操作については<a href="https://note.com/lisknonanika/m/m4198e454e4c8" target="_new">Desktop 2.0.0 操作方法</a>をご覧下さい。</div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default AboutUs;
