module.exports = {
  stories: ['../src/**/*.stories.mdx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          postcssOptions: {
            plugins: [
              [
                'postcss-preset-env',
                {
                  stage: 3,
                  features: {
                    'nesting-rules': true,
                  },
                },
              ],
              require('autoprefixer'),
            ],
          },
        },
      },
    },
  ],
};
