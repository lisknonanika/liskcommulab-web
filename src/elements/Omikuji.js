import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { Mnemonic } from '@liskhq/lisk-passphrase';
import { getLisk32AddressFromPassphrase } from '@liskhq/lisk-cryptography';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../App.css';
import '../Omikuji.css';

function Omikuji() {
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [kekkaAddress, setKekkaAddress] = useState("");
  const [kekkaName, setKekkaName] = useState("");
  const [password, setPassword] = useState("");
  const [kekka, setKekka] = useState([]);
  const [tosensha, setTosensha] = useState([]);

  useEffect(async() => {
    await getKekka();
    await getTosensha();
  }, []);

  const MySwal = withReactContent(Swal);

  const TEST_MODE = true;

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

  const escapeValue = (v) => {
    return v
    .replace(/&/g, '&lt;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, "&#x27;");
  }

  const copy = async(a, p) => {
    const ret = await navigator.clipboard.writeText(
`
[アドレス]
${a}
[パスフレーズ]
${p}
`
    );
    await MySwal.fire({ text: 'コピーしました', icon: 'success', confirmButtonColor: '#3085d6' });
  }

  const createAccount = async() => {
    const passphrase = Mnemonic.generateMnemonic();
    const address = getLisk32AddressFromPassphrase(passphrase);
    await MySwal.fire({
      html: 
      <div>
        <div className="Omikuji-memo1">アカウントを作成しました！</div>
        <div className="Omikuji-memo1">パスフレーズは絶対に他人に教えないでください。</div>
        <div className="Omikuji-memo1">LSKを引き出す際はパスフレーズが必要です。必ずメモするなど忘れないようにしてください。(忘れた場合は復旧することができません)</div>
        <div className="Omikuji-memo2" style={{marginTop: "5px"}}>アドレス</div>
        <div className="Omikuji-memo3">{address}</div>
        <div className="Omikuji-memo2">パスフレーズ</div>
        <div className="Omikuji-memo3">{passphrase}</div>
        <div className="Omikuji-copy" onClick={async() => {await copy(address, passphrase)}}>アドレスとパスフレーズをコピーする</div>
      </div>,
      icon: 'success',
      confirmButtonColor: '#3085d6'
    });
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
    const text = encodeURIComponent(
`おみくじを引いたら...
${kekka} でした！

${KUJI_SHURUI[0]}：${KUJI_NAIYO[n1]}
${KUJI_SHURUI[1]}：${KUJI_NAIYO[n2]}
${KUJI_SHURUI[2]}：${KUJI_NAIYO[n3]}
${KUJI_SHURUI[3]}：${KUJI_NAIYO[n4]}

https://liskcommulab.jp/omikuji
#Lisk #OmikujiLisk`);

    await MySwal.fire({
      html:
      <div>
        <div class="Omikuji-kekka">{kekka}</div>
        <div class="Omikuji-kekka-detail">{KUJI_SHURUI[0]}：{KUJI_NAIYO[n1]}</div>
        <div class="Omikuji-kekka-detail">{KUJI_SHURUI[1]}：{KUJI_NAIYO[n2]}</div>
        <div class="Omikuji-kekka-detail">{KUJI_SHURUI[2]}：{KUJI_NAIYO[n3]}</div>
        <div class="Omikuji-kekka-detail">{KUJI_SHURUI[3]}：{KUJI_NAIYO[n4]}</div>
        <div class="Omikuji-kekka-detail" style={{fontWeight: "bold", marginTop: "10px"}}>アドレス</div>
        <div class="Omikuji-kekka-detail">
          <a href={`https://omikuji-api.liskcommulab.jp/account?address=${address}`} target="_blank" rel="noopener noreferrer">{address}</a>
        </div>
        <div class="Omikuji-kekka-detail" style={{fontWeight: "bold", marginTop: "10px"}}>トランザクションID</div>
        <div class="Omikuji-kekka-detail">
          <a href={`https://omikuji-api.liskcommulab.jp/transaction?id=${id}`} target="_blank" rel="noopener noreferrer">{id}</a>
        </div>
        <div class="Omikuji-kekka-detail" style={{fontWeight: "bold", marginTop: "10px"}}>結果をつぶやいてみる？</div>
        <div class="Omikuji-kekka-detail">
          <a href={`https://twitter.com/intent/tweet?text=${text}`} target="_blank" rel="noopener noreferrer">
            Twitterでつぶやく
          </a>
        </div>
      </div>,
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

  const getKekka = async() => {
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

  const getTosensha = async() => {
    const res = await fetch(`https://omikuji-api.liskcommulab.jp/tosensha`, {mode: 'cors'});
    const json = await res.json();

    if (!json.result) {
      await Swal.fire({text: json.msg, icon: 'error', confirmButtonColor: '#3085d6'});
      return;
    }
    const data = json.data.slice(0, 10);
    const tosenshaElem = [];
    tosenshaElem.push(
      <div className="Omikuji-kekka-list" style={{fontWeight:"bold", "borderBottom":"none"}} key={"msg"}>
        当選者は以下の方です。おめでとうございます！
      </div>
    );  
    for (let i in data) {
      tosenshaElem.push(
        <div className="Omikuji-kekka-list" key={i}>
          {data[i]} さん
        </div>
      );  
    }
    setTosensha(tosenshaElem);
  }

  const chusen = async() => {

    const res = await fetch(`https://omikuji-api.liskcommulab.jp/atari?password=${password}`, {mode: 'cors'});
    const json = await res.json();

    if (!json.result) {
      await Swal.fire({text: json.msg, icon: 'error', confirmButtonColor: '#3085d6'});
      return;
    }

    await Swal.fire({
      html: `
      ${json.id?
        `<div>` +
        `<div class="Omikuji-kekka" style="font-size: 2rem;">抽選結果</div>` +
        `<div style="font-size: 1rem; font-weight: bold; margin-bottom: 5px;">当選者は以下の方です。おめでとうございます！</div>` +
        `${json.data.length > 0? `<div style="font-size: 0.9rem;">${escapeValue(json.data[0])} さん</div>`: ""}` +
        `${json.data.length > 1? `<div style="font-size: 0.9rem;">${escapeValue(json.data[1])} さん</div>`: ""}` +
        `${json.data.length > 2? `<div style="font-size: 0.9rem;">${escapeValue(json.data[2])} さん</div>`: ""}` +
        `${json.data.length > 3? `<div style="font-size: 0.9rem;">${escapeValue(json.data[3])} さん</div>`: ""}` +
        `${json.data.length > 4? `<div style="font-size: 0.9rem;">${escapeValue(json.data[4])} さん</div>`: ""}` +
        `${json.data.length > 5? `<div style="font-size: 0.9rem;">${escapeValue(json.data[5])} さん</div>`: ""}` +
        `${json.data.length > 6? `<div style="font-size: 0.9rem;">${escapeValue(json.data[6])} さん</div>`: ""}` +
        `${json.data.length > 7? `<div style="font-size: 0.9rem;">${escapeValue(json.data[7])} さん</div>`: ""}` +
        `${json.data.length > 8? `<div style="font-size: 0.9rem;">${escapeValue(json.data[8])} さん</div>`: ""}` +
        `${json.data.length > 9? `<div style="font-size: 0.9rem;">${escapeValue(json.data[9])} さん</div>`: ""}` +
        `<div class="Omikuji-kekka-detail" style="font-weight: bold; margin-top: 10px;">トランザクションID</div>` +
        `<div class="Omikuji-kekka-detail"><a href="https://omikuji-api.liskcommulab.jp/transaction?id=${json.id}" target="_blank" rel="noopener noreferrer">${json.id}</a></div>` +
        `</div>`
        :
        `<div>` +
        `<div class="Omikuji-kekka" style="font-size: 2rem;">抽選結果(テスト)</div>` +
        `<div style="font-size: 1rem; font-weight: bold; margin-bottom: 5px;">これはテストです。実際の当選結果とは関係ありません。</div>` +
        `${json.data.length > 0? `<div style="font-size: 0.9rem;">${escapeValue(json.data[0])} さん</div>`: ""}` +
        `${json.data.length > 1? `<div style="font-size: 0.9rem;">${escapeValue(json.data[1])} さん</div>`: ""}` +
        `${json.data.length > 2? `<div style="font-size: 0.9rem;">${escapeValue(json.data[2])} さん</div>`: ""}` +
        `${json.data.length > 3? `<div style="font-size: 0.9rem;">${escapeValue(json.data[3])} さん</div>`: ""}` +
        `${json.data.length > 4? `<div style="font-size: 0.9rem;">${escapeValue(json.data[4])} さん</div>`: ""}` +
        `${json.data.length > 5? `<div style="font-size: 0.9rem;">${escapeValue(json.data[5])} さん</div>`: ""}` +
        `${json.data.length > 6? `<div style="font-size: 0.9rem;">${escapeValue(json.data[6])} さん</div>`: ""}` +
        `${json.data.length > 7? `<div style="font-size: 0.9rem;">${escapeValue(json.data[7])} さん</div>`: ""}` +
        `${json.data.length > 8? `<div style="font-size: 0.9rem;">${escapeValue(json.data[8])} さん</div>`: ""}` +
        `${json.data.length > 9? `<div style="font-size: 0.9rem;">${escapeValue(json.data[9])} さん</div>`: ""}` +
        `</div>`
      }
      `,
      confirmButtonColor: '#3085d6'
    });
  }

  return (
    <div className="App">
      <div className="App-contents Omikuji-contents">
        {TEST_MODE?<h3>テスト中です！</h3>: ""}
        <div className="content-area">
          <div className="title" style={{backgroundColor: "rgba(233, 37, 37, 0.5)", borderColor: "rgba(233, 37, 37, 0.7)", fontWeight: "bold"}}>
            おみくじを引いてLSKをもらおう！
          </div>
          <div className="content" style={{backgroundColor: "rgba(233, 223, 37, 0.05)", borderColor: "rgba(233, 37, 37, 0.7)"}}>
            <div style={{fontWeight: "bold"}}>内容</div>
            <div>・おみくじを引いた人の中から10名に30LSKあげちゃいます！</div>
            <div>・期間：1/1〜1/3(予定)</div>
            <div>・当選発表：1/4(予定)</div>
            <div style={{fontWeight: "bold"}}>応募方法</div>
            <div>・おみくじを引くだけ！</div>
            <div style={{fontWeight: "bold"}}>注意</div>
            <div>・何回引いても当選確率に影響はありません</div>
            <div>・捨てアカウント(Twitter)での応募はご遠慮ください</div>
          </div>
        </div>

        <div className="content-area">
          <div className="title" style={{backgroundColor: "rgba(233, 37, 37, 0.5)", borderColor: "rgba(233, 37, 37, 0.7)", fontWeight: "bold"}}>
            おみくじを引く
          </div>
          <div className="content" style={{backgroundColor: "rgba(233, 223, 37, 0.05)", borderColor: "rgba(233, 37, 37, 0.7)"}}>
            <div style={{fontWeight: "bold"}}>おみくじを引くには...</div>
            <div>・Liskアドレスを入力します(アドレスを持っていない人や新しいアドレスがほしい人は <span className="Omikuji-createAccount" onClick={async() => await createAccount()}>こちら</span>)</div>
            <div>・Twitter名(例:@liskcommulab)を入力します(@はなくても大丈夫)</div>
            <div>・「おみくじを引く」ボタンを押します</div>
            <div className="form-area">
              <div>
                <input type="text" className="textbox" value={address} placeholder="Liskアドレス" onChange={(e) => setAddress(e.target.value)} />
              </div>
              <div>
                <input type="text" className="textbox" value={name} placeholder="Twitter名(例:@liskcommulab)" onChange={(e) => setName(e.target.value)} />
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
            <div style={{marginBottom: "10px"}}>
              {kekka}
            </div>
            <div>・Liskアドレス、Twitter名を入力して「最新化/検索」ボタンを押すと入力内容に一致するもののみで絞り込みができます</div>
            <div className="form-area">
              <div>
                <input type="text" className="textbox" value={kekkaAddress} placeholder="Liskアドレス" onChange={(e) => setKekkaAddress(e.target.value)} />
              </div>
              <div>
                <input type="text" className="textbox" value={kekkaName} placeholder="Twitter名(例:@liskcommulab)" onChange={(e) => setKekkaName(e.target.value)} />
              </div>
              <div>
                <button className="button" onClick={async() => {await getKekka()}}>最新化/検索</button>
              </div>
            </div>
          </div>
        </div>

        <div className="content-area">
          <div className="title" style={{backgroundColor: "rgba(233, 37, 37, 0.5)", borderColor: "rgba(233, 37, 37, 0.7)", fontWeight: "bold"}}>
            当選結果
          </div>
          <div className="content" style={{backgroundColor: "rgba(233, 223, 37, 0.05)", borderColor: "rgba(233, 37, 37, 0.7)"}}>
            <div style={{marginBottom: "10px"}}>
              {tosensha}
            </div>
            {tosensha.length == 0 || TEST_MODE?
              <div>
                <div>・おみくじを引いた中からランダムで10名抽出します</div>
                <div>・抽選用パスワードを入力せずに「抽選する」ボタンを押すことで当選気分を味わえるかも？</div>
                <div>・抽選用パスワード正しい場合のみ抽選結果が確定します</div>
                <div className="form-area">
                  <div>
                    <input type="text" className="textbox" value={password} placeholder="抽選用パスワード" onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div>
                    <button className="button" onClick={async() => {await chusen()}}>抽選する</button>
                  </div>
                </div>
              </div>
            : ""}
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Omikuji;
