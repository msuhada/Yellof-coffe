"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ProductVariant,
  YellofContact,
  getStoredProducts,
  getStoredContact,
  saveProducts,
  saveContact,
  DEFAULT_YELLOF_PRODUCTS,
  DEFAULT_YELLOF_CONTACT,
} from "@/data/products";

export function useProducts() {
  const [products, setProducts] = useState<ProductVariant[]>(DEFAULT_YELLOF_PRODUCTS);
  const [contact, setContact] = useState<YellofContact>(DEFAULT_YELLOF_CONTACT);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setProducts(getStoredProducts());
    setContact(getStoredContact());
    setIsLoaded(true);
  }, []);

  // Listen for storage changes from other tabs / admin panel
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "yellof_products") {
        setProducts(getStoredProducts());
      }
      if (e.key === "yellof_contact") {
        setContact(getStoredContact());
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const updateProducts = useCallback((newProducts: ProductVariant[]) => {
    setProducts(newProducts);
    saveProducts(newProducts);
  }, []);

  const updateContact = useCallback((newContact: YellofContact) => {
    setContact(newContact);
    saveContact(newContact);
  }, []);

  const resetToDefaults = useCallback(() => {
    setProducts(DEFAULT_YELLOF_PRODUCTS);
    setContact(DEFAULT_YELLOF_CONTACT);
    if (typeof window !== "undefined") {
      localStorage.removeItem("yellof_products");
      localStorage.removeItem("yellof_contact");
    }
  }, []);

  return {
    products,
    contact,
    isLoaded,
    updateProducts,
    updateContact,
    resetToDefaults,
  };
}
