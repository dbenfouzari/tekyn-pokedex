import "dotenv/config"

export default {
  name: 'tekyn-pokedex',
  version: '1.0.0',
  extra: {
    enableStorybook: process.env.ENABLE_STORYBOOK,
  }
}
