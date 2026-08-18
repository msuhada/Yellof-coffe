"use client";

import { useState, useEffect, useCallback } from "react";
import {
  StoreSettings,
  DEFAULT_STORE_SETTINGS,
  getStoredStoreSettings,
  saveStoreSettings,
  resetStoreSettings,
} from "@/data/storeSettings";

export function useStoreSettings() {
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_STORE_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setSettings(getStoredStoreSettings());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "yellof_store_settings") {
        setSettings(getStoredStoreSettings());
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const updateSettings = useCallback((newSettings: StoreSettings) => {
    setSettings(newSettings);
    saveStoreSettings(newSettings);
  }, []);

  const resetSettings = useCallback(() => {
    resetStoreSettings();
    setSettings(DEFAULT_STORE_SETTINGS);
  }, []);

  return {
    settings,
    isLoaded,
    updateSettings,
    resetSettings,
  };
}
