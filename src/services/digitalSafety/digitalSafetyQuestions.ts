import type { DigitalSafetyCategory, DigitalSafetyQuestion } from './digitalSafetyTypes';

export const DIGITAL_SAFETY_CATEGORIES: DigitalSafetyCategory[] = [
  'device',
  'accounts',
  'location',
  'communication',
  'social',
  'cloud',
  'recovery',
];

export const DIGITAL_SAFETY_QUESTIONS: DigitalSafetyQuestion[] = [
  /* 1. Device */
  {
    id: 'device_shared',
    category: 'device',
    titleKey: 'digitalSafety.questions.deviceShared.title',
    descriptionKey: 'digitalSafety.questions.deviceShared.desc',
    whyMattersKey: 'digitalSafety.questions.deviceShared.whyMatters',
    actionKey: 'digitalSafety.questions.deviceShared.action',
    flaggedIf: 'yes',
    severity: 'needsAttention',
  },
  {
    id: 'device_lock_notifications',
    category: 'device',
    titleKey: 'digitalSafety.questions.deviceLockNotifications.title',
    descriptionKey: 'digitalSafety.questions.deviceLockNotifications.desc',
    whyMattersKey: 'digitalSafety.questions.deviceLockNotifications.whyMatters',
    actionKey: 'digitalSafety.questions.deviceLockNotifications.action',
    flaggedIf: 'yes',
    severity: 'reviewRecommended',
  },
  {
    id: 'device_unfamiliar_apps',
    category: 'device',
    titleKey: 'digitalSafety.questions.deviceUnfamiliarApps.title',
    descriptionKey: 'digitalSafety.questions.deviceUnfamiliarApps.desc',
    whyMattersKey: 'digitalSafety.questions.deviceUnfamiliarApps.whyMatters',
    actionKey: 'digitalSafety.questions.deviceUnfamiliarApps.action',
    flaggedIf: 'yes',
    severity: 'needsAttention',
  },

  /* 2. Accounts */
  {
    id: 'accounts_unfamiliar_signed_in',
    category: 'accounts',
    titleKey: 'digitalSafety.questions.accountsUnfamiliar.title',
    descriptionKey: 'digitalSafety.questions.accountsUnfamiliar.desc',
    whyMattersKey: 'digitalSafety.questions.accountsUnfamiliar.whyMatters',
    actionKey: 'digitalSafety.questions.accountsUnfamiliar.action',
    flaggedIf: 'yes',
    severity: 'needsAttention',
  },
  {
    id: 'accounts_recovery_controlled',
    category: 'accounts',
    titleKey: 'digitalSafety.questions.accountsRecovery.title',
    descriptionKey: 'digitalSafety.questions.accountsRecovery.desc',
    whyMattersKey: 'digitalSafety.questions.accountsRecovery.whyMatters',
    actionKey: 'digitalSafety.questions.accountsRecovery.action',
    flaggedIf: 'no',
    severity: 'needsAttention',
  },
  {
    id: 'accounts_unknown_sessions',
    category: 'accounts',
    titleKey: 'digitalSafety.questions.accountsSessions.title',
    descriptionKey: 'digitalSafety.questions.accountsSessions.desc',
    whyMattersKey: 'digitalSafety.questions.accountsSessions.whyMatters',
    actionKey: 'digitalSafety.questions.accountsSessions.action',
    flaggedIf: 'yes',
    severity: 'reviewRecommended',
  },

  /* 3. Location */
  {
    id: 'location_live_shared',
    category: 'location',
    titleKey: 'digitalSafety.questions.locationLiveShared.title',
    descriptionKey: 'digitalSafety.questions.locationLiveShared.desc',
    whyMattersKey: 'digitalSafety.questions.locationLiveShared.whyMatters',
    actionKey: 'digitalSafety.questions.locationLiveShared.action',
    flaggedIf: 'yes',
    severity: 'needsAttention',
  },
  {
    id: 'location_connected_shared_accounts',
    category: 'location',
    titleKey: 'digitalSafety.questions.locationSharedAccounts.title',
    descriptionKey: 'digitalSafety.questions.locationSharedAccounts.desc',
    whyMattersKey: 'digitalSafety.questions.locationSharedAccounts.whyMatters',
    actionKey: 'digitalSafety.questions.locationSharedAccounts.action',
    flaggedIf: 'yes',
    severity: 'reviewRecommended',
  },

  /* 4. Communication */
  {
    id: 'comm_message_previews',
    category: 'communication',
    titleKey: 'digitalSafety.questions.commPreviews.title',
    descriptionKey: 'digitalSafety.questions.commPreviews.desc',
    whyMattersKey: 'digitalSafety.questions.commPreviews.whyMatters',
    actionKey: 'digitalSafety.questions.commPreviews.action',
    flaggedIf: 'yes',
    severity: 'reviewRecommended',
  },
  {
    id: 'comm_shared_channel',
    category: 'communication',
    titleKey: 'digitalSafety.questions.commSharedChannel.title',
    descriptionKey: 'digitalSafety.questions.commSharedChannel.desc',
    whyMattersKey: 'digitalSafety.questions.commSharedChannel.whyMatters',
    actionKey: 'digitalSafety.questions.commSharedChannel.action',
    flaggedIf: 'yes',
    severity: 'needsAttention',
  },

  /* 5. Social */
  {
    id: 'social_unfamiliar_sessions',
    category: 'social',
    titleKey: 'digitalSafety.questions.socialSessions.title',
    descriptionKey: 'digitalSafety.questions.socialSessions.desc',
    whyMattersKey: 'digitalSafety.questions.socialSessions.whyMatters',
    actionKey: 'digitalSafety.questions.socialSessions.action',
    flaggedIf: 'yes',
    severity: 'reviewRecommended',
  },
  {
    id: 'social_recovery_access',
    category: 'social',
    titleKey: 'digitalSafety.questions.socialRecovery.title',
    descriptionKey: 'digitalSafety.questions.socialRecovery.desc',
    whyMattersKey: 'digitalSafety.questions.socialRecovery.whyMatters',
    actionKey: 'digitalSafety.questions.socialRecovery.action',
    flaggedIf: 'yes',
    severity: 'needsAttention',
  },
  {
    id: 'social_privacy_settings',
    category: 'social',
    titleKey: 'digitalSafety.questions.socialPrivacy.title',
    descriptionKey: 'digitalSafety.questions.socialPrivacy.desc',
    whyMattersKey: 'digitalSafety.questions.socialPrivacy.whyMatters',
    actionKey: 'digitalSafety.questions.socialPrivacy.action',
    flaggedIf: 'no',
    severity: 'reviewRecommended',
  },

  /* 6. Cloud */
  {
    id: 'cloud_shared_folders',
    category: 'cloud',
    titleKey: 'digitalSafety.questions.cloudSharedFolders.title',
    descriptionKey: 'digitalSafety.questions.cloudSharedFolders.desc',
    whyMattersKey: 'digitalSafety.questions.cloudSharedFolders.whyMatters',
    actionKey: 'digitalSafety.questions.cloudSharedFolders.action',
    flaggedIf: 'yes',
    severity: 'reviewRecommended',
  },
  {
    id: 'cloud_uncontrolled_backups',
    category: 'cloud',
    titleKey: 'digitalSafety.questions.cloudBackups.title',
    descriptionKey: 'digitalSafety.questions.cloudBackups.desc',
    whyMattersKey: 'digitalSafety.questions.cloudBackups.whyMatters',
    actionKey: 'digitalSafety.questions.cloudBackups.action',
    flaggedIf: 'yes',
    severity: 'needsAttention',
  },

  /* 7. Recovery */
  {
    id: 'recovery_email_control',
    category: 'recovery',
    titleKey: 'digitalSafety.questions.recoveryEmail.title',
    descriptionKey: 'digitalSafety.questions.recoveryEmail.desc',
    whyMattersKey: 'digitalSafety.questions.recoveryEmail.whyMatters',
    actionKey: 'digitalSafety.questions.recoveryEmail.action',
    flaggedIf: 'no',
    severity: 'needsAttention',
  },
  {
    id: 'recovery_phone_control',
    category: 'recovery',
    titleKey: 'digitalSafety.questions.recoveryPhone.title',
    descriptionKey: 'digitalSafety.questions.recoveryPhone.desc',
    whyMattersKey: 'digitalSafety.questions.recoveryPhone.whyMatters',
    actionKey: 'digitalSafety.questions.recoveryPhone.action',
    flaggedIf: 'no',
    severity: 'needsAttention',
  },
  {
    id: 'recovery_trusted_devices',
    category: 'recovery',
    titleKey: 'digitalSafety.questions.recoveryTrustedDevices.title',
    descriptionKey: 'digitalSafety.questions.recoveryTrustedDevices.desc',
    whyMattersKey: 'digitalSafety.questions.recoveryTrustedDevices.whyMatters',
    actionKey: 'digitalSafety.questions.recoveryTrustedDevices.action',
    flaggedIf: 'no',
    severity: 'reviewRecommended',
  },
];

export const SYNTHETIC_PRESET_ANSWERS: Record<string, 'yes' | 'no' | 'unsure'> = {
  /* 1. Device — Looks configured */
  device_shared: 'no',
  device_lock_notifications: 'no',
  device_unfamiliar_apps: 'no',

  /* 2. Accounts — Review recommended */
  accounts_unfamiliar_signed_in: 'no',
  accounts_recovery_controlled: 'yes',
  accounts_unknown_sessions: 'yes',

  /* 3. Location — Needs attention */
  location_live_shared: 'yes',
  location_connected_shared_accounts: 'no',

  /* 4. Communication — Looks configured */
  comm_message_previews: 'no',
  comm_shared_channel: 'no',

  /* 5. Social — Review recommended */
  social_unfamiliar_sessions: 'yes',
  social_recovery_access: 'no',
  social_privacy_settings: 'yes',

  /* 6. Cloud — Looks configured */
  cloud_shared_folders: 'no',
  cloud_uncontrolled_backups: 'no',

  /* 7. Recovery — Needs attention */
  recovery_email_control: 'no',
  recovery_phone_control: 'yes',
  recovery_trusted_devices: 'no',
};

