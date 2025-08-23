# Demo App

This is a **React Native + Expo** demo application.

---

## Features

- **Two main tabs**

  - 🏠 **Home** – browse a list of books fetched from the API
  - ⭐ **Favorites** – quickly access the books you’ve saved

- **Book details** – view cover, description, release date, and page count
- **Share a book** – easily share book details with others
- **Search books** – search with debounce
- **Sort options** – organize the list by A–Z, number of pages, or release date
- **Grid/List toggle** – switch between views with smooth animations
- **Persistent storage** – books are saved locally for 24 hours
- **Dark/Light mode** – toggle themes instantly
- **Multi-language support** – switch app language (English, Russian, Hebrew)

---

## 🚀 Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app (with Expo)s

   ```bash
   npx expo start
   ```

---

## 📱 Running the App

When you start the project, **Expo CLI** will give you options to:

- Run the app on an **Android emulator**
- Run the app on an **iOS simulator** (Mac only)
- Scan the **QR code** to open the app in **Expo Go** on your device

---

## ⚙️ EAS Build Setup

### **Setup**

1. Install the Expo CLI and EAS CLI:

   ```bash
   npm install -g eas-cli
   ```

2. Log in to your Expo account:

   ```
   eas login
   ```

3. Configure EAS for the project:

   ```
   eas build:configure
   ```

---

## 📦 Building the App

- For Android (APK/AAB):

  ```
  eas build --profile preview --platform android
  ```

- For iOS (IPA):

  ```
  eas build --platform ios --profile production
  ```

---

## 🌐 React Native Packager Hostname (Windows)

If running the app on a physical device, set your computer's IP as the Metro bundler host:

```bash
setx /M REACT_NATIVE_PACKAGER_HOSTNAME my-ip
```

- Replace my-ip with your machine’s local IP (find it via ipconfig).
