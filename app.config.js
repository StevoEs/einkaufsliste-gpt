// app.config.js
module.exports = {
  expo: {
    name: 'Einkaufsliste',
    version: '0.9.0',
    slug: 'einkaufsliste',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myapp', // Für Deep Linking und Linking-Warnungen wichtig
    splash: {
      image: './assets/images/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      bundleIdentifier: 'com.meineapp', // Passe diesen Wert ggf. an deinen tatsächlichen Bundle Identifier an
      supportsTablet: true,
    },
    android: {
      package: 'com.meineapp', // Stelle sicher, dass dieser Package-Name konsistent ist
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      favicon: './assets/images/favicon.png',
      bundler: 'metro',
      output: 'static',
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      eas: {
        projectId: '5077dfd5-b73b-484a-ab6e-bedece986e4a',
      },
      splash: {
        image: './assets/images/splash-icon.png',
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
    },
  },
};
