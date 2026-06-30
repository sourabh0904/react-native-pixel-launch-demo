const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const packagePath = path.resolve(__dirname, "../react-native-pixel-launch");

const config = getDefaultConfig(__dirname);

// Watch the local package directory
config.watchFolders = [packagePath];

// Ensure Metro resolves the symlinked package
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, "node_modules"),
];

// Prevent duplicate React/React Native from the local package's node_modules
config.resolver.blockList = [
  new RegExp(path.resolve(packagePath, "node_modules", "react-native") + "/.*"),
  new RegExp(path.resolve(packagePath, "node_modules", "react") + "/.*"),
];

// Map react & react-native to this project's copies
config.resolver.extraNodeModules = {
  react: path.resolve(__dirname, "node_modules/react"),
  "react-native": path.resolve(__dirname, "node_modules/react-native"),
};

module.exports = config;
