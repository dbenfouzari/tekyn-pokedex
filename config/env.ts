import Constants from 'expo-constants';

export type Env = {
  ENABLE_STORYBOOK: boolean;
}

export const env: Env = {
  ENABLE_STORYBOOK: Constants.manifest.extra.enableStorybook,
}
