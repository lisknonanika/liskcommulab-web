import React from 'react';
import Swal from 'sweetalert2'
import { convertBeddowsToLSK } from '@liskhq/lisk-transactions';
import '../App.css';

class Reward extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      reward: "0",
      history: [],
      amount: ""
    };
    this.setText = this.setText.bind(this);
    this.setAmount = this.setAmount.bind(this);
    this.checkhReward = this.checkhReward.bind(this);
    this.checkhWeekReward = this.checkhWeekReward.bind(this);
  }

  setText = (event) => {
    this.setState({address: event.target.value});
  }

  setAmount = (event) => {
    this.setState({amount: event.target.value});
  }

  checkhReward = async() => {
    if (!this.state.address.trim()) {
      await Swal.fire({text: this.props.translation('Liskアドレスを入力してください。'), icon: 'error', confirmButtonColor: '#3085d6'});
      return;
    }

    let reward = "0";
    let history = [];
    try {
      const res = await fetch("https://mainnet-payout.liskcommulab.jp", {mode: 'cors'});
      const json = await res.json();
      const data = json.voter.find((v) => this.state.address.toLocaleLowerCase() === v.address.toLocaleLowerCase());
      if (!data) {
        await Swal.fire({text: this.props.translation('データが見つかりませんでした。'), icon: 'error',confirmButtonColor: '#3085d6'});
        return;
      }
      reward = convertBeddowsToLSK(data.reward);
    } catch (err) {
      await Swal.fire({text: this.props.translation('データが見つかりませんでした。'), icon: 'error',confirmButtonColor: '#3085d6'});
      return;
    }

    try {
      const resH = await fetch(
        `https://service.lisk.com/api/v2/transactions?moduleAssetId=2:0&senderAddress=lsk5tyhc6tw76ybwwzt9vcefy3gryjvprkcj329tw&recipientAddress=${this.state.address.toLocaleLowerCase()}`,
        {mode: 'cors'}
      );
      const jsonH = await resH.json();
      for (const data of jsonH.data) {
        history.push({
          amount: convertBeddowsToLSK(data.asset.amount),
          timestamp: `${new Date(data.block.timestamp * 1000).toLocaleDateString()} ${new Date(data.block.timestamp * 1000).toLocaleTimeString()}`
        })
      }

    } catch (err) {
      // 何もしない
    }

    await Swal.fire({text: this.props.translation('見つかりました！'), icon: 'success', confirmButtonColor: '#3085d6'});
    this.setState({address:"", reward:reward, history:history, amount:""});
  }

  checkhWeekReward = async() => {
    if (!this.state.amount.trim()) {
      await Swal.fire({text: this.props.translation('枚数を入力してください。'), icon: 'error', confirmButtonColor: '#3085d6'});
      return;
    }

    if (isNaN(this.state.amount.trim())) {
      await Swal.fire({text: this.props.translation('10以上の数値を入力してください。'), icon: 'error', confirmButtonColor: '#3085d6'});
      return;
    }

    let target = 0;
    try {
      target = Math.floor(+this.state.amount.trim() / 10) * 10;
      if (target < 10) {
        await Swal.fire({text: this.props.translation('10以上の数値を入力してください。'), icon: 'error', confirmButtonColor: '#3085d6'});
        return;
      }

    } catch (e) {
      await Swal.fire({text: this.props.translation('10以上の数値を入力してください。'), icon: 'error', confirmButtonColor: '#3085d6'});
      return;
    }

    let receive = "0";
    let selfvote = "0";
    try {
      const res = await fetch("https://service.lisk.com/api/v2/accounts?isDelegate=true&username=commulab", {mode: 'cors'});
      const json = await res.json();
      const data = json.data[0];
      receive = data.dpos.delegate.totalVotesReceived;
      selfvote = data.dpos.sentVotes.find((v) => {return v.delegateAddress === "lsk5tyhc6tw76ybwwzt9vcefy3gryjvprkcj329tw"}).amount;

    } catch (err) {
      await Swal.fire({text: this.props.translation('データが見つかりませんでした。'), icon: 'error',confirmButtonColor: '#3085d6'});
      return;
    }

    let weekReward = "0";
    const total = (+convertBeddowsToLSK(receive)) - (+convertBeddowsToLSK(selfvote));
    if (total > 0) {
      weekReward = Math.floor(target / total * 290 * 100000000) / 100000000;
    }
    await Swal.fire({text: this.props.translation('報酬は約') + weekReward.toString() + this.props.translation('です。'), icon: 'success',confirmButtonColor: '#3085d6'});
    this.setState({address:"", reward:"0", history:[], amount:""});
  }

  render() {
    return (
      <div>
        <div className="App-contents">

          <div className="content-area">
            <div className="title" style={{backgroundColor: "#da0000", borderColor: "#da0000", fontWeight: "bold"}}>{this.props.translation('報酬について')}</div>
            <div className="content" style={{backgroundColor: "rgba(233, 223, 37, 0.05)", borderColor: "#da0000"}}>
              <div style={{fontWeight: "bold"}}>{this.props.translation('報酬割合')}：50%</div>
              <div>{this.props.translation('※週1回、1LSK貯まるごとに払出されます。')}</div>
              <div>{this.props.translation('※送信手数料は払出される報酬から支払われます。')}</div>
              <div>{this.props.translation('※報酬割合の計算には自己投票は含まれません。')}</div>
            </div>
          </div>

          <div className="content-area">
            <div className="title">{this.props.translation('報酬の確認')}</div>
            <div className="content">
              <div className="form-area" style={{borderBottom: "1px dotted #404041"}}>
                <div>
                  <input type="text" className="textbox" value={this.state.address} placeholder={this.props.translation('Liskアドレスを入力してください')} onChange={(e) => this.setText(e)} />
                </div>
                <div>
                  <button className="button" onClick={async () => {await this.checkhReward()}}>{this.props.translation('報酬を確認する')}</button>
                </div>
              </div>

              <div style={{borderBottom: "1px dotted #404041"}}>
                <div className="reward-title">{this.props.translation('報酬')}</div>
                <div className="reward-result">{this.state.reward} LSK</div>
              </div>
              <div>
                <div className="reward-title">{this.props.translation('直近10件の報酬')}</div>
                <div className="reward-result">
                  {this.state.history.length > 0?
                    this.state.history.map((o, i) => {
                      return <div key={i}>{o.amount} LSK ({o.timestamp})</div>;
                    })
                    :
                    "NO DATA"
                  }
                </div>
              </div>

            </div>
          </div>

          <div className="content-area">
            <div className="title">{this.props.translation('1週間の報酬予想')}</div>
            <div className="content">
              <div className="text">
                <div>{this.props.translation('投票枚数で1週間にどのくらい報酬が入るかを表示します。')}</div>
                <div style={{marginTop: "5px", marginBottom: "5px", color: "blue"}}>{this.props.translation('※結果はcommulabが1週間アクティブデリゲートだった場合の鋳造報酬と自己投票を除いた総投票数から算出している為、確実に入手できる報酬ではないことにご注意ください。')}</div>
              </div>
              <div className="form-area">
                <div>
                  <input type="text" className="textbox" value={this.state.amount} placeholder={this.props.translation('投票数を入力して下さい')} onChange={(e) => this.setAmount(e)} />
                </div>
                <div>
                  <button className="button" onClick={async () => {await this.checkhWeekReward()}}>{this.props.translation('報酬を確認する')}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Reward;
