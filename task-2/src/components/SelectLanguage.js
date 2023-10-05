import React from "react";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
 
  { label: "English", code: "en" },
  { label: "Hindi", code: "hi" },
];

function SelectLanguage() {
  const { t, i18n } = useTranslation();
  function languageHandler(e) {
    i18n.changeLanguage(e.target.value);
  }
  return (
    <select defaultValue={i18n.language} onChange={languageHandler}>
      {LANGUAGES.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}

export default SelectLanguage;
