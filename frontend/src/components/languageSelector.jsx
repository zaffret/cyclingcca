import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import AmericanFlagIcon from "../assets/images/icons8-usa-flag-48.png";
import ChineseFlagIcon from "../assets/images/icons8-china-50.png";
import TamilFlagIcon from "../assets/images/icons8-india-50.png";

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();

  const flagIcons = {
    en: AmericanFlagIcon,
    zh: ChineseFlagIcon,
    ta: TamilFlagIcon,
  };

  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "en"
  );

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("selectedLanguage", selectedLanguage);
  }, [selectedLanguage, i18n]);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        variant="outline-light"
        className="d-flex align-items-center border-0"
        id="language-dropdown"
      >
        <img
          src={flagIcons[selectedLanguage]}
          width="32"
          height="32"
          className="rounded-circle me-2"
          alt={t(`language.${selectedLanguage}`)}
        />
        <span>{t(`language.${selectedLanguage}`)}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {Object.keys(flagIcons).map((language) => (
          <Dropdown.Item
            key={language}
            onClick={() => handleLanguageChange(language)}
          >
            <img
              src={flagIcons[language]}
              width="20"
              height="20"
              className="rounded-circle me-2"
              alt={t(`language.${language}`)}
            />
            {t(`language.${language}`)}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSelector;
