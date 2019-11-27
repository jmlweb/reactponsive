module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [
      {
        loader: require.resolve("@storybook/source-loader"),
        options: {
          parser: "typescript"
        }
      }
    ],
    enforce: "pre"
  });
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve("awesome-typescript-loader")
      }
    ]
  });
  config.resolve.extensions.push(".ts", ".tsx");
  return config;
};
