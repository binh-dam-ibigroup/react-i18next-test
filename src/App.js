import logo from './logo.svg';
import './App.css';
import i18n from "i18next";
import moment from 'moment-with-locales-es6';
import { initReactI18next, Trans, useTranslation } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them)
const translatedMessages = {
  en: {
    translation: {
      depart: "Depart {{departDate, MMMM DD}} at {{departDate, h:mm a}}",
      transitFare: "Transit fare: {{fare, currency}}",
      walkDistance: "Walk {{dist}} miles"
    }
  },
  fr: {
    translation: {
      depart: "Départ le {{departDate, DD MMMM}} à {{departDate, H:mm}}",
      transitFare: "Prix du trajet : {{fare, currency}}",
      walkDistance: "{{dist, decimal}} km à pied"
    }
  }
};

const locale = 'en'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: translatedMessages,
    lng: locale,

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
      format: function(value, format, lng) {
        console.log(value, "isFinite", isFinite(value))

        if (format === 'uppercase') return value.toUpperCase();
        if (value instanceof Date) return moment(value).format(format);
        if (format.startsWith('currency')) return new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' }).format(value);
        if (isFinite(value)) return new Intl.NumberFormat(locale, { style: format }).format(value);
        return value;
      }
    }    
  });

moment.locale('fr')

function App() {
  const { t } = useTranslation();
  return (
    <div className="App">
      <header className="App-header">
          <ul>
            <li>{locale}</li>
            <li>{t("depart", {departDate: new Date()})}</li>
            <li>{t("transitFare", {fare: 1.50})}</li>
            <li>{t("walkDistance", {dist: 0.4})}</li>
          </ul>
      </header>
    </div>
  );
}

export default App;
