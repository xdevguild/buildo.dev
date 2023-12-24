/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';

interface FormStorageProps {
  update?: (value: any) => void;
  storageItem: string;
  withCleanup?: boolean;
}

// TODO: fix typings
export const usePersistStorage = ({
  update,
  storageItem,
  withCleanup = true,
}: FormStorageProps) => {
  const [storageValue, returnStorageValue] = useState<any>();
  useEffect(() => {
    const value = sessionStorage.getItem(storageItem);
    if (value) {
      update?.(JSON.parse(value));
      if (withCleanup) {
        sessionStorage.removeItem(storageItem);
      }
      returnStorageValue(JSON.parse(value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    setItem: (value: any) => {
      sessionStorage.setItem(storageItem, JSON.stringify(value));
    },
    storageValue,
  };
};
