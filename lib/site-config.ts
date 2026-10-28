/**
 * Single place to update event timing and links.
 *
 * - countdownTarget: ISO 8601 string with timezone offset
 * - registrationUrl: official registration link; the Register button is hidden while null
 * - social: set a URL to enable an icon; null shows it as "coming soon"
 */
export const siteConfig = {
  countdownTarget: '2027-03-20T23:59:00+05:30' as string | null,
  countdownLabel: 'Registration Deadline',
  timezoneLabel: 'IST (UTC+05:30)',
  /** Shown when no verified upcoming date exists. */
  lastEditionNote: "ROBOFEST '26 was held in March 2026. The next edition's dates have not been announced yet.",
  registrationUrl: null as string | null,
  social: [
    { id: 'linkedin', label: 'LinkedIn', url: 'https://in.linkedin.com/company/robotix-club-nit-raipur' },
    { id: 'instagram', label: 'Instagram', url: null },
    { id: 'youtube', label: 'YouTube', url: null },
    { id: 'x', label: 'X (Twitter)', url: null },
    { id: 'github', label: 'GitHub', url: null },
  ] as { id: 'linkedin' | 'instagram' | 'youtube' | 'x' | 'github'; label: string; url: string | null }[],
}
