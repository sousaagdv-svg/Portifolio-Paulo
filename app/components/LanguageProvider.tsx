"use client";

import React, { createContext, useContext, useState } from "react";
import { translations, type Lang, type Translation } from "../i18n";

type LanguageContextValue = {
  lang: Lang;
  t: Translation;
  toggleLang: () => void;
  setLang: (lang: Lang) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("pt");

  const value = React.useMemo<LanguageContextValue>(
    () => ({
      lang,
      t: translations[lang],
      toggleLang: () => setLang((prev) => (prev === "pt" ? "en" : "pt")),
      setLang,
    }),
    [lang]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}