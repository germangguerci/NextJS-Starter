"use client";

import { useRouter, usePathname } from "next-intl/client";
import { useLocale } from "next-intl";

import { useState } from "react";

export default function LanguageSelect() {
  const router = useRouter();
  const pathName = usePathname();
  const locale = useLocale();
  const [selectedLanguage, setSelectedLanguage] = useState(locale || "en");

  const handleLanguageChange = (event: any) => {
    event.preventDefault();
    setSelectedLanguage(event.target.value);
    const url = `${pathName}`;
    router.push(url, { locale: event?.target.value });
  };

  return (
    <div className="flex items-center space-x-2">
      <select
        value={selectedLanguage}
        onChange={handleLanguageChange}
        className="rounded border border-gray-300 p-1 text-black"
      >
        <option value="en">EN</option>
        <option value="es">ES</option>
      </select>
    </div>
  );
}
