import { sync } from 'read-pkg-up';

export default {
  packageJson: sync({ cwd: __dirname }).packageJson,
  framework: 'web-components',
  frameworkPresets: [require.resolve('./framework-preset-web-components')],
};
