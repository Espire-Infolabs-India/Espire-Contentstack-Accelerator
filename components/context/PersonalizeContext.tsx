"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import Personalize from '@contentstack/personalize-edge-sdk';
import { Sdk } from '@contentstack/personalize-edge-sdk/dist/sdk';

let sdkInstance: Sdk | null = null;

export async function getPersonalizeInstance() {
  const isInitialized = Personalize.getInitializationStatus();

  if (!isInitialized) {
    sdkInstance = await Personalize.init("687e3221230c6e97e851831f");
  }

  return sdkInstance;
}

const PersonalizeContext = createContext<Sdk | null>(null);

export function PersonalizeProvider({ children }: { children: React.ReactNode }) {
  const [sdk, setSdk] = useState<Sdk | null>(null);

  useEffect(() => {
    getPersonalizeInstance().then((sdkInstance) => {
      setSdk(sdkInstance);
      console.log("✅ SDK initialized:", sdkInstance);
      console.log("📌 Initialization status:", Personalize.getInitializationStatus());
    });
  }, []);

  return (
    <PersonalizeContext.Provider value={sdk}>
      {children}
    </PersonalizeContext.Provider>
  );
}

export function usePersonalize() {
  return useContext(PersonalizeContext);
}
