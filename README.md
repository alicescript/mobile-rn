## Swishh Mobile

This repository contains the REACT NATIVE app which interacts with our GO Server to enable a secure P2P Messaging platform

## 🧳 Requirements

### Requirements for working on iOS and Android apps

- The [General React Native requirements](#general-react-native-requirements)
- [iOS dev reqs](#ios-dev-requirements) **and/or** [Android dev reqs](#android-dev-requirements)
- [Watchman](https://facebook.github.io/watchman/docs/install/) to enable live reloading
- [Docker Desktop](https://docs.docker.com/docker-for-mac/install/)

💡 `$GOPATH` may need to be set explicitly (usually `$HOME/go`)

### General React Native requirements

- Homebrew or package manager of choice
- Node >= 12.x
- The [yarn package manager](https://classic.yarnpkg.com/en/)

### iOS dev requirements

- Mac OS X
- XCode _(latest stable)_

### Android dev requirements

- An Android app **development environment**, e.g. [Android Studio](https://developer.android.com/studio/install)
- **Android SDK**, with the following enabled (in Android Studio Code in `Tools --> SDK Manager`):
  - SDK Platform "Android 11.0 (R)"
  - Android SDK Build-Tools
  - LLDB
  - NDK version 23.1.7779620 (`export ANDROID_NDK_HOME="$ANDROID_HOME/ndk/23.1.7779620"`)
  - Cmake
  - Android SDK Command-line Tools
- A physical or virtual **Android device** (in Android Studio, `Tools --> AVD Manager`)
- **Java 8**. If you already have another version of Java, you can use a version manager and Homebrew to add another installation. Some nice instructions are given [here](https://java.christmas/2019/16).

💡 Check you can run all the commands `sdkmanager`, `emulator`, `ndk-bundle`, and `adb` (these are binaries in `$ANDROID_HOME` subfolders)
