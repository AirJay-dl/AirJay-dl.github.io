'use client';

import {useEffect, useState} from 'react';

const STORAGE_KEY = 'snooker-calendar-analytics-consent';
const MEASUREMENT_ID = 'G-4DVDNG8GE0';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function loadGoogleAnalytics() {
  if (document.querySelector(`script[data-ga-id="${MEASUREMENT_ID}"]`)) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', MEASUREMENT_ID, {anonymize_ip: true});

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  script.dataset.gaId = MEASUREMENT_ID;
  document.head.appendChild(script);
}

export default function AnalyticsConsent() {
  const [choice, setChoice] = useState<'accepted' | 'rejected' | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'accepted') {
      setChoice('accepted');
      loadGoogleAnalytics();
    } else if (saved === 'rejected') {
      setChoice('rejected');
    }
    setReady(true);

    const reopen = () => setChoice(null);
    window.addEventListener('open-privacy-choices', reopen);
    return () => window.removeEventListener('open-privacy-choices', reopen);
  }, []);

  const choose = (next: 'accepted' | 'rejected') => {
    localStorage.setItem(STORAGE_KEY, next);
    setChoice(next);
    if (next === 'accepted') loadGoogleAnalytics();
  };

  if (!ready || choice) return null;

  return (
    <aside className="consent-banner" aria-label="Analytics privacy choices">
      <div>
        <strong>Help us improve the calendar</strong>
        <p>With your permission, we use Google Analytics to understand which pages are useful. Analytics stays off until you accept. Read our <a href="/privacy/">privacy policy</a>.</p>
      </div>
      <div className="consent-actions">
        <button type="button" className="consent-secondary" onClick={() => choose('rejected')}>Reject analytics</button>
        <button type="button" className="consent-primary" onClick={() => choose('accepted')}>Accept analytics</button>
      </div>
    </aside>
  );
}

export function PrivacyChoicesButton() {
  return <button type="button" className="privacy-choices" onClick={() => window.dispatchEvent(new Event('open-privacy-choices'))}>Privacy choices</button>;
}
