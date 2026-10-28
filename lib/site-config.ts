/**
 * Single place to update event timing and links.
 *
 * Only fill these in with officially verified information.
 * - countdownTarget: ISO 8601 string with timezone offset, e.g. '2027-03-10T23:59:00+05:30'
 * - registrationUrl: official registration link; the Register button is hidden while null
 */
export const siteConfig = {
  countdownTarget: null as string | null,
  countdownLabel: 'Registration Deadline',
  timezoneLabel: 'IST (UTC+05:30)',
  /** Shown when no verified upcoming date exists. */
  lastEditionNote: "ROBOFEST '26 was held in March 2026. The next edition's dates have not been announced yet.",
  registrationUrl: null as string | null,
  social: {
    linkedin: 'https://in.linkedin.com/company/robotix-club-nit-raipur',
    // PLACEHOLDER: official Instagram URL not yet verified. Add it here to enable the link.
    instagram: null as string | null,
  },
}
