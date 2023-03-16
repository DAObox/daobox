module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-daobox`
  extends: ["daobox"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
