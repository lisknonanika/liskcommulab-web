import React, { useState, useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import locale_ja from '../contents/locale/ja.json';
import locale_en from '../contents/locale/en.json';
import '../App.css';
import flag_jp from '../contents/image/flag_jp.png';
import flag_us from '../contents/image/flag_us.png';
import AboutUs from '../components/AboutUs';
import Reward from '../components/Reward';
import Event from '../components/Event';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: locale_en },
    ja: { translation: locale_ja },
  },
  lng: 'ja',
  fallbackLng: 'ja',
  interpolation: { escapeValue: false }
});

function Top() {
  const [t, i18n] = useTranslation();
  const [lang, setLang] = useState('ja');
  const [page, setPage] = useState(0);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return (
    <div className="App">
      <header className="App-header">
        <div>Lisk CommuLab</div>
        <div className="App-language">Lang: {lang === 'en'? <img src={flag_us} alt="en" onClick={() => setLang("ja")} align="top"/>:<img src={flag_jp} alt="ja" onClick={() => setLang("en")} align="top"/>}</div>
      </header>
      <div className="App-menu">
        <div className={page === 0? "active menu": "menu"} onClick={() => setPage(0)}>About Us</div>
        <div className={page === 1? "active menu": "menu"} onClick={() => setPage(1)}>Vote Reward</div>
        <div className={page === 2? "active menu": "menu"} onClick={() => setPage(2)}>Event</div>
      </div>
      {page === 0? <AboutUs translation={t}/>: ""}
      {page === 1? <Reward translation={t}/>: ""}
      {page === 2? <Event translation={t}/>: ""}
    </div>
  );
}

export default Top;
