// eslint-disable-next-line no-restricted-imports
import { useEffect, useLayoutEffect as useOriginalLayoutEffect } from 'react';

// Silence silly warning
// https://reactjs.org/link/uselayouteffect-ssr
export const useLayoutEffect = typeof window === 'undefined' ? useEffect : useOriginalLayoutEffect;
