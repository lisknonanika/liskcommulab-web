import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { Mnemonic } from '@liskhq/lisk-passphrase';
import { getLisk32AddressFromPassphrase } from '@liskhq/lisk-cryptography';
import Swal from 'sweetalert2'
import '../App.css';
import '../Omikuji.css';

function Omikuji() {
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [kekkaAddress, setKekkaAddress] = useState("");
  const [kekkaName, setKekkaName] = useState("");
  const [kekka, setKekka] = useState([]);

  useEffect(async() => {
    await reload();
  }, []);

  const KUJI_KEKKA = [
    '大吉',
    '吉',
    '中吉',
    '小吉',
    '末吉',
    '凶',
    '大凶'
  ];

  const KUJI_NAIYO = [
      '最高なのじゃー！',
      'いい感じじゃな',
      'まあまあじゃな',
      'ダメっぽいのじゃ',
      'ダメダメなのじゃー！'
  ];

  const KUJI_SHURUI = [
      '金運',
      '健康運',
      '仕事運',
      '恋愛運'
  ];

  const createAccount = async() => {
    const passphrase = Mnemonic.generateMnemonic();
    const address = getLisk32AddressFromPassphrase(passphrase);
    await Swal.fire({
      html: `
      <div>
        <div class="Omikuji-memo1">アカウントを作成しました！</div>
        <div class="Omikuji-memo1">この情報は忘れないようにして下さい。また、パスフレーズは絶対に他人に教えないでください。</div>
        <div class="Omikuji-memo2" style="margin-top: 5px;">アドレス</div>
        <div class="Omikuji-memo3">${address}</div>
        <div class="Omikuji-memo2">パスフレーズ</div>
        <div class="Omikuji-memo3">${passphrase}</div>
      </div>
      `,
      icon: 'success',
      confirmButtonColor: '#3085d6'});
  }

  const getOmikuji = async(id, address) => {
    const n1 = parseInt(id.slice(0, 8), 16) % KUJI_NAIYO.length;
    const n2 = parseInt(id.slice(8, 16), 16) % KUJI_NAIYO.length;
    const n3 = parseInt(id.slice(16, 24), 16) % KUJI_NAIYO.length;
    const n4 = parseInt(id.slice(24, 32), 16) % KUJI_NAIYO.length;
    let kekka = "";
    const v = n1 + n2 + n3 + n4;	// min:0 max:16
    if (v <= 3) {
      kekka = KUJI_KEKKA[0];
    } else if (v <= 6) {
      kekka = KUJI_KEKKA[1];
    } else if (v <= 8) {
      kekka = KUJI_KEKKA[2];
    } else if (v <= 10) {
      kekka = KUJI_KEKKA[3];
    } else if (v <= 12) {
      kekka = KUJI_KEKKA[4];
    } else if (v <= 14) {
      kekka = KUJI_KEKKA[5];
    } else if (v <= 16) {
      kekka = KUJI_KEKKA[6];
    }
    await Swal.fire({
      html: `
      <div class="Omikuji-kekka">${kekka}</div>
      <div class="Omikuji-kekka-detail">${KUJI_SHURUI[0]}：${KUJI_NAIYO[n1]}</div>
      <div class="Omikuji-kekka-detail">${KUJI_SHURUI[1]}：${KUJI_NAIYO[n2]}</div>
      <div class="Omikuji-kekka-detail">${KUJI_SHURUI[2]}：${KUJI_NAIYO[n3]}</div>
      <div class="Omikuji-kekka-detail">${KUJI_SHURUI[3]}：${KUJI_NAIYO[n4]}</div>
      <div class="Omikuji-kekka-detail" style="font-weight: bold; margin-top: 5px;">アドレス</div>
      <div class="Omikuji-kekka-detail">
        <a href="https://omikuji-api.liskcommulab.jp/account?address=${address}" target="_new">${address}</a>
      </div>
      <div class="Omikuji-kekka-detail" style="font-weight: bold; margin-top: 5px;">トランザクションID</div>
      <div class="Omikuji-kekka-detail">
        <a href="https://omikuji-api.liskcommulab.jp/transaction?id=${id}" target="_new">${id}</a>
      </div>
      `,
      confirmButtonColor: '#3085d6'
    });
  }

  const hiku = async() => {
    const res = await fetch(`https://omikuji-api.liskcommulab.jp/pull?address=${address}&name=${name}`, {mode: 'cors'});
    const json = await res.json();

    if (!json.result) {
      await Swal.fire({text: json.msg, icon: 'error', confirmButtonColor: '#3085d6'});
      return;
    }
    await getOmikuji(json.id, address);
  }

  const reload = async() => {
    const res = await fetch(`https://omikuji-api.liskcommulab.jp/kekka?address=${kekkaAddress}&name=${kekkaName}`, {mode: 'cors'});
    const json = await res.json();

    if (!json.result) {
      await Swal.fire({text: json.msg, icon: 'error', confirmButtonColor: '#3085d6'});
      return;
    }
    const data = json.data.slice(0, 10);
    const kekkaElems = [];
    for (let i in data) {
      const d = new Date();
      d.setTime(data[i].jikan * 1000);
      kekkaElems.push(
        <div className="Omikuji-kekka-list" key={i} onClick={async() => await getOmikuji(data[i].tx, data[i].address)}>
          {data[i].name}: {data[i].result} ({d.toLocaleString()})&nbsp;
          <FontAwesomeIcon icon={faExternalLinkAlt}/>
        </div>
      );  
    }
    setKekka(kekkaElems);
  }

  return (
    <div className="App">
      <div className="App-contents Omikuji-contents">
        <h3>テスト中です！</h3>
        <div className="content-area">
          <div className="title" style={{backgroundColor: "rgba(233, 37, 37, 0.5)", borderColor: "rgba(233, 37, 37, 0.7)", fontWeight: "bold"}}>
            おみくじを引いてLSKをもらおう！
          </div>
          <div className="content" style={{backgroundColor: "rgba(233, 223, 37, 0.05)", borderColor: "rgba(233, 37, 37, 0.7)"}}>
            <div style={{fontWeight: "bold"}}>内容</div>
            <div>・おみくじを引いた人の中から10名に30LSKあげちゃいます！</div>
            <div>・当選発表は1/4(予定)</div>
            <div style={{fontWeight: "bold"}}>応募方法</div>
            <div>・おみくじを引くだけ！</div>
            <div style={{fontWeight: "bold"}}>注意</div>
            <div>・何回引いても当選確率に影響はありません</div>
            <div>・捨てアカウント(Twitter)での応募はおやめください</div>
          </div>
        </div>

        <div className="content-area">
          <div className="title" style={{backgroundColor: "rgba(233, 37, 37, 0.5)", borderColor: "rgba(233, 37, 37, 0.7)", fontWeight: "bold"}}>
            おみくじを引く
          </div>
          <div className="content" style={{backgroundColor: "rgba(233, 223, 37, 0.05)", borderColor: "rgba(233, 37, 37, 0.7)"}}>
            <div style={{fontWeight: "bold"}}>おみくじを引くには...</div>
            <div>・Liskアドレスを入力します(アドレスを持っていない人や新しいアドレスがほしい人は <span className="Omikuji-createAccount" onClick={async() => await createAccount()}>こちら</span>)</div>
            <div>・Twitter名(例：@liskcommulab)を入力します(@はなくても大丈夫)</div>
            <div>・おみくじを引くボタンを押します</div>
            <div className="form-area">
              <div>
                <input type="text" className="textbox" value={address} placeholder="Liskアドレス" onChange={(e) => setAddress(e.target.value)} />
              </div>
              <div>
                <input type="text" className="textbox" value={name} placeholder="Twitter名(例：@commulab)" onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <button className="button" onClick={async() => {await hiku()}}>おみくじを引く</button>
              </div>
            </div>
          </div>
        </div>

        <div className="content-area">
          <div className="title" style={{backgroundColor: "rgba(233, 37, 37, 0.5)", borderColor: "rgba(233, 37, 37, 0.7)", fontWeight: "bold"}}>
            おみくじ結果(最新10件)
          </div>
          <div className="content" style={{backgroundColor: "rgba(233, 223, 37, 0.05)", borderColor: "rgba(233, 37, 37, 0.7)"}}>
            <div>
              {kekka}
            </div>
            <div className="form-area">
              <div>
                <input type="text" className="textbox" value={kekkaAddress} placeholder="フィルタ用：Liskアドレス" onChange={(e) => setKekkaAddress(e.target.value)} />
              </div>
              <div>
                <input type="text" className="textbox" value={kekkaName} placeholder="フィルタ用：Twitter名(例：@commulab)" onChange={(e) => setKekkaName(e.target.value)} />
              </div>
              <div>
                <button className="button" onClick={async() => {await reload()}}>最新を見る/検索</button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Omikuji;
