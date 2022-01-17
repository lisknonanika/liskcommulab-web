import React, { useState, useEffect } from 'react';
import '../App.css';
import '../Omikuji.css';

function Omikuji() {
  return (
    <div className="App">
      <div className="App-contents Omikuji-contents">
        <div className="content-area">
          <div className="title" style={{backgroundColor: "rgba(233, 37, 37, 0.5)", borderColor: "rgba(233, 37, 37, 0.7)", fontWeight: "bold"}}>
            おみくじを引いてLSKをもらおう！(跡地)
          </div>
          <div className="content" style={{backgroundColor: "rgba(233, 223, 37, 0.05)", borderColor: "rgba(233, 37, 37, 0.7)"}}>
            <div style={{fontWeight: "bold"}}>内容</div>
            <div>・おみくじを引いた人の中から10名に30LSKあげちゃいます！</div>
            <div>・期間：1/1〜1/3</div>
            <div>・当選発表：1/4</div>
            <div style={{fontWeight: "bold"}}>応募方法</div>
            <div>・おみくじを引くだけ！</div>
            <div style={{fontWeight: "bold"}}>注意</div>
            <div>・何回引いても当選確率に影響はありません</div>
            <div>・捨てアカウント(Twitter)での応募はご遠慮ください</div>
            <div style={{fontWeight: "bold"}}>その他</div>
            <div>・おみくじは <a href="https://lisk.com/documentation/lisk-sdk/index.html" target="_blank" rel="noopener noreferrer" className="Omikuji-link">Lisk SDK</a> を使って作られました</div>
            <div>
              <a href="https://github.com/lisknonanika/omikuji-lisk" target="_blank" rel="noopener noreferrer" className="Omikuji-link">ソース</a>
            </div>
          </div>
        </div>

        <div className="content-area">
          <div className="title" style={{backgroundColor: "rgba(233, 37, 37, 0.5)", borderColor: "rgba(233, 37, 37, 0.7)", fontWeight: "bold"}}>
            当選結果
          </div>
          <div className="content" style={{backgroundColor: "rgba(233, 223, 37, 0.05)", borderColor: "rgba(233, 37, 37, 0.7)"}}>
            <div style={{marginBottom: "10px"}}>
              <div className="Omikuji-kekka-list" style={{fontWeight:"bold", "borderBottom":"none"}}>
                当選者は以下の方です。おめでとうございます！
              </div>
              <div className="Omikuji-kekka-list">kplusq さん</div>
              <div className="Omikuji-kekka-list">@31c_burntorange さん</div>
              <div className="Omikuji-kekka-list">@emgie123 さん</div>
              <div className="Omikuji-kekka-list">@minionsdelegate さん</div>
              <div className="Omikuji-kekka-list">@akakohe さん</div>
              <div className="Omikuji-kekka-list">@junmaru_btc さん</div>
              <div className="Omikuji-kekka-list">@jumbo0828 さん</div>
              <div className="Omikuji-kekka-list">chronicle_1909 さん</div>
              <div className="Omikuji-kekka-list">@waian_346 さん</div>
              <div className="Omikuji-kekka-list">naokichi1991102 さん</div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Omikuji;
