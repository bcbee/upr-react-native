# UPR: Remote

The mobile remote for [Universal Presenter Remote](https://universalpresenterremote.com) — turn your phone into a presentation clicker. The app generates a six-digit token, you enter it into the UPR control software on the presenting computer, and Next / Previous / media commands are relayed through the UPR cloud service. No account, no pairing, unlimited range.

Built with **Expo SDK 57** / **React Native 0.86** / **React 19.2** (managed workflow, JavaScript).

## How it works

1. **Pair** — on launch the app requests a token from the server (`GET /NewSession`) and generates a random six-digit `holdfor` secret client-side. The token is displayed as digit boxes on the pairing screen.
2. **Wait** — the app polls `GET /TempSession?token=&holdfor=` once per second. The server answers `0` (session gone — start over), `1` (still waiting), or `2` (control software connected). On `2` the Begin button lights up and a success haptic fires.
3. **Control** — button presses call `GET /SlideUp` (Next), `GET /SlideDown` (Previous), or `GET /PlayMedia`, each authenticated with the `token` + `holdfor` pair. The server signs and forwards the command to the control software over Socket.IO.

All networking is plain HTTPS via axios against `https://universalpresenterremote.com`; the client holds no credentials and stores nothing.

## Project structure

```
App.js                        Root: fonts, navigation stack, session context
app/
  theme.js                    Design tokens (colors, fonts, radii, spacing)
  model/uprkit.js             API layer: session + command requests
  components/
    Button.js                 Primary / ghost / icon button
    TokenDigits.js            Six-digit token display
    StatusDot.js              Green (connected) / pulsing lilac (waiting) dot
    InstructionPage.js        Layout for the numbered instruction steps
  views/
    Login.js                  "Pair your remote" screen; owns the polling loop
    Control.js                Dark control stage: Previous / Next / media, activity log
    Instruction1..3.js        Onboarding modal pages
```

State is a single React context (`UPRContext` in `uprkit.js`) holding `session` (the token), `holdFor`, and `ready`. Navigation is React Navigation 7 (native stack); the instruction pages are a modal group.

## Design system

The UI mirrors the design language of the UPR website ([Universal-Presenter-Remote-Server](https://github.com/bcbee/Universal-Presenter-Remote-Server), `src/public/stylesheets/style.less`). All values live in [app/theme.js](app/theme.js) — keep it in sync with the website when the palette changes.

- **Accent** `#A824A8` magenta-purple, with `#F1E6FA` soft lavender fills (token digits, badges)
- **Light surfaces** `#FAF9FB` sections on `#EDEAF2` page background, white cards with `#ECE8F0` borders and soft shadows
- **Dark control surfaces** `#1B1620` stage with `#2A232F` panels — used for the Control screen, matching the website's web remote
- **Status** green `#39C07E` connected dot; pulsing lilac `#C9A2D6` waiting dot (same 1.4s pulse as the site's `uprpulse` keyframe)
- **Typography** Manrope 700/800 for display/headings/buttons, Inter 400–700 for body — loaded from `@expo-google-fonts` with per-weight imports so unused weights stay out of the bundle

## Development

```sh
yarn                # install dependencies
yarn start          # start the Metro dev server (Expo Go or dev client)
yarn android        # start + open on Android
yarn ios            # start + open on iOS
yarn format         # prettier
```

Requires Node 20+ and Yarn 1.x. To test the full flow you need the UPR control software (or the server's testing console) on another machine to claim the token.

### Checks

```sh
npx expo-doctor     # validates config + dependency alignment (should pass 20/20)
npx expo export --platform android   # verifies the app bundles cleanly
```

## Building & releasing

Builds go through [EAS](https://docs.expo.dev/build/introduction/) (`eas.json`: `development`, `preview`, `production` profiles):

```sh
eas build --profile production --platform android
eas build --profile production --platform ios
```

App identity: `com.dbztech.universalpresenterremote.upr`, owner `bcbee`. Bump `version` and `android.versionCode` in [app.json](app.json) before a release build.

## Upgrading Expo

```sh
yarn add expo@^<next-sdk>
npx expo install --fix     # realigns all expo-* and RN packages
npx expo-doctor            # confirm everything passes
```

The app has no custom native code, so SDK upgrades are usually just dependency bumps.
