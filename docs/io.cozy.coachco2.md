# Cozy CoachCO2 settings doctype

This doctype stores information about CoachCO2 application settings. There is only one document.

The doctype stores the following data:
- `account`: {Object} - Current account displayed, copy of the associated `io.cozy.account` document
- `bikeGoal`: {Object} - Informations about the bike goal feature
  - `showAlert`: {boolean} - Whether an alert is displayed requesting activation of the bike goal feature
  - `showAlertSuccess`: {boolean} - Whether an alert is displayed when the goal is reached
  - `activated`: {boolean} - Whether the feature is enabled
  - `sendToDACC`: {boolean} - Whether the user has agreed to share their data with the DACC
  - `onboarded`: {boolean} - Whether the user as completed the onboarding
  - `onboardingStep`: {number} - The actual onboard step of the user
  - `firstname`: {string} - The user's firstname requested in the onboarding
  - `lastname`: {string} - The user's lastname requested in the onboarding
  - `daysToReach`: {number} - The user's goal days to reach requested in the onboarding
- `CO2Emission`: {Object} - Informations about the CO2 Emission feature
  - `showAlert`: {boolean} - Whether an alert is displayed requesting activation of the DACC
  - `sendToDACC`: {boolean} - Whether the user has agreed to share their data with the DACC
