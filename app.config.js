module.exports = {
    name: 'Einkaufsliste',  // Der Name deiner App
    version: '0.9.0',  // Die Version deiner App
    slug: 'einkaufsliste',  // Ein eindeutiger Slug für deine App (verwendet in URLs)
    orientation: 'portrait',  // Die Ausrichtung der App ('portrait', 'landscape' oder 'default')
    icon: './assets/images/icon.png',  // Pfad zum App-Icon (72x72px oder größer)
    splash: {
      image: './assets/images/splash-icon.png',  // Pfad zum Splash-Screen-Bild
      resizeMode: 'contain',  // Wie das Bild skaliert wird ('contain', 'cover', etc.)
      backgroundColor: '#ffffff',  // Hintergrundfarbe des Splash-Screens
    },
    updates: {
      fallbackToCacheTimeout: 0,  // Zeit in ms, nach der auf den Cache zurückgegriffen wird
    },
    assetBundlePatterns: ['**/*'],  // Muster für zu bündelnde Assets
    ios: {
      bundleIdentifier: 'com.meineapp',  // Das musst du hinzufügen
      supportsTablet: true,
    },
    android: {
      package: 'com.meineapp',  // Der Package-Name für Android (z.B. com.deinname.appname)
      versionCode: 1,  // Die Versionsnummer für Android
    },
    web: {
      favicon: './assets/images/favicon.png',  // Pfad zum Favicon für die Web-Version
    },
    extra: {
      // Hier kannst du zusätzliche Daten hinzufügen, z.B. API-Schlüssel
      eas: {
        projectId: '5077dfd5-b73b-484a-ab6e-bedece986e4a', // Deine Projekt-ID
      },
    },
  };