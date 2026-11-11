# React Native Starter Kit

A React Native CLI (0.88, TypeScript) starter with a themeable component library, Redux Toolkit + thunks, an Axios API layer, AsyncStorage, permissions, and Stack + Drawer + Bottom Tab navigation.

## What's inside

| Area | Library / approach |
| --- | --- |
| Language | TypeScript, path aliases (`@components`, `@store`, ...) |
| State | Redux Toolkit, `createAsyncThunk`, redux-persist |
| API | Axios instance with token + error interceptors |
| Storage | `@react-native-async-storage/async-storage` (typed wrapper) |
| Navigation | React Navigation 7: native stack, drawer, bottom tabs |
| Permissions | `react-native-permissions` + `usePermission` hook |
| UI | Custom components, light/dark theme, responsive sizes |
| Env | `react-native-config` (.env.development / .env.production) |
| Quality | ESLint, Prettier, Jest, GitHub Actions |
| Release | Signed Android AAB + APK, built locally or on GitHub |

## Getting started

```sh
npm install
npm run env:setup   # creates .env.development and .env.production from .env.example
npm run pods        # iOS only: installs CocoaPods
npm run ios         # or: npm run android
```

Requirements: Node 22.11+, Xcode, Android Studio, CocoaPods. See the [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment).

The demo logs in against [dummyjson.com](https://dummyjson.com). The login form is pre-filled with `emilys` / `emilyspass`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm start` / `npm run start:reset` | Start Metro (reset clears its cache) |
| `npm run ios` / `npm run android` | Run the app with `.env.development` |
| `npm run ios:prod` / `npm run android:prod` | Run a release build with `.env.production` |
| `npm run env:setup` | Create the local `.env` files from `.env.example` |
| `npm run build:aab` | Build the Play Store AAB |
| `npm run build:apk` | Build an installable release APK |
| `npm run pods` | Install iOS pods |
| `npm run lint` / `npm run lint:fix` | ESLint |
| `npm run format` | Prettier on `src/` |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Jest |
| `npm run link:fonts` | Link fonts from `src/assets/fonts` |

## Folder structure

```
src/
├── App.tsx                  # Providers: gesture, redux, persist, safe area
├── api/
│   ├── client.ts            # Axios instance, interceptors, api.get/post/...
│   ├── endpoints.ts         # All API paths
│   ├── types.ts             # Request / response types
│   └── services/            # One file per resource (authService, postService)
├── assets/
│   ├── fonts/               # Custom .ttf / .otf files
│   └── images/
├── components/
│   ├── layout/              # ScreenWrapper, Header
│   ├── ui/                  # AppText, AppButton, AppInput, Dropdown, Card...
│   └── index.ts             # import { AppButton } from '@components/index'
├── constants/
│   ├── config.ts            # Reads .env values (API URL, timeouts, logs)
│   ├── routes.ts            # ROUTES: every screen name
│   └── storageKeys.ts       # STORAGE_KEYS: every AsyncStorage key
├── hooks/                   # useTheme, useThemedStyles, usePermission, useDebounce
├── navigation/
│   ├── RootNavigator.tsx    # Auth or App, based on the token
│   ├── AuthStack.tsx        # Login, Register
│   ├── AppDrawer.tsx        # Drawer: Tabs, Settings, Permissions
│   ├── BottomTabs.tsx       # Home, Posts, Profile
│   ├── DrawerContent.tsx    # Custom drawer UI
│   ├── navigationService.ts # navigate() from outside components
│   └── types.ts             # Typed params for every navigator
├── screens/                 # One folder per feature
├── store/
│   ├── index.ts             # configureStore + redux-persist
│   ├── rootReducer.ts       # Register slices here
│   ├── hooks.ts             # useAppDispatch, useAppSelector, createAppAsyncThunk
│   ├── slices/              # app, auth, posts
│   └── thunks/              # authThunks, postThunks
├── types/
│   └── env.d.ts             # Types for .env variables
├── theme/
│   ├── colors.ts            # Brand palette + light/dark colors
│   ├── fonts.ts             # Font families, sizes, text variants
│   ├── metrics.ts           # spacing, radius, sizes, shadow
│   └── index.ts             # lightTheme, darkTheme
└── utils/
    ├── responsive.ts        # scale, verticalScale, moderateScale, fontScale, wp, hp
    ├── storage.ts           # Typed AsyncStorage wrapper
    ├── permissions.ts       # check / request helpers
    └── validators.ts        # required, email, minLength, phone
```

## Navigation

```
Root (native stack)
├── AuthStack            ← when logged out
│   ├── Login
│   └── Register
├── AppDrawer            ← when logged in
│   ├── MainTabs
│   │   ├── Home
│   │   ├── Posts
│   │   └── Profile
│   ├── Settings
│   └── Permissions
└── PostDetail           ← pushed over drawer + tabs
```

Logging in stores a token in Redux. `RootNavigator` reads it and shows the app. Logging out clears it and shows the auth screens. Nothing navigates manually.

Always use the route constants:

```tsx
import { ROUTES } from '@constants/routes';
navigation.navigate(ROUTES.POST_DETAIL, { id: 1 });
```

**Add a screen:**

1. Create `src/screens/<feature>/MyScreen.tsx`.
2. Add `MY_SCREEN: 'MyScreen'` to `ROUTES`.
3. Add its params to the matching list in `navigation/types.ts`.
4. Register it in the navigator (stack, drawer, or tabs).

Screen props are typed with `TabScreen<'Home'>`, `DrawerScreen<'Settings'>`, `RootScreen<'PostDetail'>`, or `AuthScreen<'Login'>`.

To navigate outside a component (in a thunk, for example), use `navigate()` from `@navigation/navigationService`.

## Theming

Everything visual comes from `src/theme`. Change it there and the whole app updates.

- **Brand colors:** edit `palette` in `theme/colors.ts`. Components only use semantic keys (`primary`, `text`, `border`...), so both light and dark mode stay consistent.
- **Dark mode:** the user picks `system` / `light` / `dark` in Settings. The choice is saved in Redux and restored on launch.
- **Spacing, radius, sizes:** edit `theme/metrics.ts`.

Use the theme in your own components:

```tsx
const { colors, spacing } = useTheme();

const styles = useThemedStyles(t => ({
  box: { backgroundColor: t.colors.card, padding: t.spacing.lg },
}));
```

### Custom fonts

1. Copy the font files into `src/assets/fonts` (for example `Poppins-Regular.ttf`, `Poppins-Medium.ttf`, `Poppins-SemiBold.ttf`, `Poppins-Bold.ttf`).
2. Run `npm run link:fonts`.
3. In `theme/fonts.ts`, set `fontFamily.regular = 'Poppins-Regular'`, and so on.
4. Rebuild the app.

### Responsive sizes

The design base is 375 × 812. Change it in `utils/responsive.ts`.

```ts
scale(16)          // widths, horizontal padding
verticalScale(16)  // heights
moderateScale(16)  // gentler scaling (radii, buttons)
fontScale(16)      // font sizes
wp(50) / hp(50)    // % of screen width / height
```

Font sizes in `theme/fonts.ts` already use `fontScale`, so `<AppText variant="h1">` is responsive by default.

## Components

All components accept `style` props for one-off overrides and read colors and fonts from the theme.

### AppText

```tsx
<AppText variant="h1">Title</AppText>
<AppText variant="caption" color="textSecondary">Muted</AppText>
<AppText size="lg" weight="bold" color="#FF0000" align="center">Custom</AppText>
```

Variants: `h1 h2 h3 title body bodyBold caption label tiny`. Add more in `typography` in `theme/fonts.ts`.

### AppButton

```tsx
<AppButton title="Save" onPress={save} />
<AppButton title="Delete" variant="danger" size="sm" fullWidth={false} />
<AppButton title="Next" loading={isLoading} rightIcon={<Icon />} rounded />
<AppButton title="Custom" backgroundColor="#10B981" textColor="#fff" />
```

Variants: `primary secondary outline ghost danger`. Sizes: `sm md lg`.

### AppInput

```tsx
<AppInput label="Email" required value={email} onChangeText={setEmail} error={errors.email} />
<AppInput label="Password" password helperText="At least 8 characters" />
<AppInput leftIcon={<SearchIcon />} disabled containerStyle={{ marginBottom: 0 }} />
```

Supports `ref` for focusing the next field.

### Dropdown

No extra library. It opens a bottom-sheet modal.

```tsx
// Single
<Dropdown label="Gender" options={GENDERS} value={gender} onChange={setGender} />

// Searchable
<Dropdown label="Country" searchable options={COUNTRIES} value={country} onChange={setCountry} />

// Multi-select
<Dropdown label="Interests" multiple options={INTERESTS} value={list} onChange={setList} />
```

`options` is `{ label, value, disabled? }[]`. `value` can be any type (string, number, enum).

### ScreenWrapper (layout)

Wrap every screen in it. It handles safe area, background, keyboard, scrolling, and a loading overlay.

```tsx
<ScreenWrapper
  scrollable
  padding="lg"                     // spacing key, or 'none'
  edges={['top', 'bottom']}        // default: top/left/right (tabs handle the bottom)
  header={<Header title="Profile" showMenu />}
  footer={<AppButton title="Continue" />}
  loading={isSaving}
  refreshControl={<RefreshControl ... />}>
  ...
</ScreenWrapper>
```

### Header

```tsx
<Header title="Home" showMenu />               // opens the drawer
<Header title="Details" />                     // back arrow when possible
<Header title="Edit" right={<AppButton title="Save" size="sm" fullWidth={false} />} />
```

### Others

`Card` (pressable when `onPress` is set), `Spacer`, `Divider`, `Loader` (with `overlay`), `EmptyState` (with an optional action button).

## Redux Toolkit + thunks

**Use the typed hooks:**

```tsx
const dispatch = useAppDispatch();
const user = useAppSelector(state => state.auth.user);
```

**Add a feature** (for example, products):

1. Add the API call in `api/services/productService.ts` and its path in `api/endpoints.ts`.
2. Add the thunk in `store/thunks/productThunks.ts`:

   ```ts
   export const fetchProducts = createAppAsyncThunk(
     'products/fetch',
     async (_, { rejectWithValue }) => {
       try {
         return await productService.getAll();
       } catch (e) {
         return rejectWithValue(toErrorMessage(e));
       }
     },
   );
   ```

3. Add the slice in `store/slices/productsSlice.ts` and handle `pending` / `fulfilled` / `rejected` in `extraReducers` (see `postsSlice.ts`).
4. Register it in `store/rootReducer.ts`.
5. To save it across app restarts, add its key to `whitelist` in `store/index.ts`.

**Wait for a result in a component:**

```ts
try {
  const data = await dispatch(fetchProducts()).unwrap();
} catch (message) {
  Alert.alert('Error', message as string);
}
```

## API layer

- Set the base URL with `API_BASE_URL` in your `.env` files.
- `api/client.ts` adds `Authorization: Bearer <token>` to every request, logs requests in dev, and turns every failure into `{ status, message, data }`.
- A `401` response logs the user out automatically.
- Call `api.get<T>()`, `api.post<T>()` and so on. They return the response data directly.

To use the API without Redux, call a service directly in a component:

```ts
const posts = await postService.getPosts({ limit: 10 });
```

## AsyncStorage

Redux state in the persist `whitelist` (`app`, `auth`) is saved automatically.

For anything else, use the typed wrapper. Values are stored as JSON:

```ts
import { storage } from '@utils/storage';
import { STORAGE_KEYS } from '@constants/storageKeys';

await storage.set(STORAGE_KEYS.ONBOARDING_DONE, true);
const done = await storage.get<boolean>(STORAGE_KEYS.ONBOARDING_DONE);
await storage.remove(STORAGE_KEYS.ONBOARDING_DONE);
```

Add new keys to `STORAGE_KEYS` first.

## Permissions

```tsx
const { granted, status, request } = usePermission('camera');

if (!granted) {
  await request(); // Shows an "Open Settings" alert if the user blocked it before
}
```

Or call `requestPermission('location')` from `@utils/permissions` outside a component.

The kit includes camera, location, photos, and notifications.

**Add or remove a permission:** update all three native files, then add it to `AppPermission` and `PERMISSION_MAP` in `utils/permissions.ts`.

1. `ios/Podfile`: the `setup_permissions([...])` list. Run `npm run pods` after.
2. `ios/ReactNativeStarterKit/Info.plist`: the matching `NS...UsageDescription` key, with a clear reason.
3. `android/app/src/main/AndroidManifest.xml`: the `<uses-permission />` line.

Remove permissions you don't use. App Store review rejects unused usage descriptions.

## Icons

Tab and header icons are text characters so the kit has no icon dependency. For real icons, add `@react-native-vector-icons/*` or `react-native-svg`, then replace `TAB_ICONS` in `navigation/BottomTabs.tsx`.

## Environment variables

Values such as the API URL live in `.env` files, read by `react-native-config`.

| File | Committed? | Used by |
| --- | --- | --- |
| `.env.example` | Yes | Template with every key |
| `.env.development` | No | `npm run ios`, `npm run android` |
| `.env.production` | No | `*:prod` scripts, `build:aab`, `build:apk`, GitHub Actions |

**Add a variable:**

1. Add it to `.env.example`, `.env.development` and `.env.production`.
2. Add its type to `src/types/env.d.ts`.
3. Read it in `src/constants/config.ts`. Values are always strings, so convert numbers and booleans there.
4. Rebuild the app. Env values are compiled into the native build, so a Metro reload is not enough.

Anything in a `.env` file ends up inside the app and can be extracted. Never put secret keys or passwords there.

For a staging environment, create `.env.staging` and run `ENVFILE=.env.staging npx react-native run-android`.

## Release build (AAB)

### 1. Create an upload key (once)

```sh
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore release.keystore \
  -alias upload -keyalg RSA -keysize 2048 -validity 10000
```

Back up `release.keystore` and its passwords somewhere safe. If you lose it, you cannot update your app on the Play Store. It is git-ignored, so it never goes to GitHub.

### 2. Tell Gradle about it

```sh
cp android/keystore.properties.example android/keystore.properties
```

Fill in the passwords in `android/keystore.properties`. This file is git-ignored.

### 3. Build

```sh
npm run build:aab
# -> android/app/build/outputs/bundle/release/app-release.aab
```

Upload that file to the Google Play Console. Use `npm run build:apk` for an APK you can install directly on a phone.

Without a keystore, release builds are signed with the debug key. They still install and run, but the Play Store will reject them.

Bump `versionCode` / `versionName` in `android/app/build.gradle` for each Play Store upload. GitHub Actions does this automatically.

## GitHub Actions

Two workflows live in `.github/workflows/`:

- **`ci.yml`** runs lint, type-check and tests on every push and pull request.
- **`android-release.yml`** builds the AAB and APK on every push to `main`, on `v*` tags, or when you start it by hand.

**Download the AAB:** open the repo on GitHub, then **Actions → Android Release →** the latest run **→ Artifacts → android-release-...**.

**Publish a release:** push a version tag, and the AAB and APK are attached to a GitHub Release.

```sh
git tag v1.0.0
git push origin v1.0.0
```

**Signed builds on GitHub:** add these in **Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Value |
| --- | --- |
| `ANDROID_KEYSTORE_BASE64` | Output of `base64 -i android/app/release.keystore` |
| `ANDROID_STORE_PASSWORD` | Keystore password |
| `ANDROID_KEY_ALIAS` | `upload` (or your alias) |
| `ANDROID_KEY_PASSWORD` | Key password |
| `ENV_PRODUCTION` | Full contents of your `.env.production` |

All of these are optional. Without them, the workflow uses `.env.example` and the debug key, and shows a warning on the run.

`versionCode` is set to the workflow run number, so every build is higher than the last. `versionName` is the tag (for example `v1.0.0`) or `1.0.<run number>`.

## Starting your own app

1. Rename the app. Search for `ReactNativeStarterKit`, or use `react-native-rename`.
2. Set `palette`, fonts, and `API_BASE_URL` in your `.env` files.
3. Replace the demo screens (Home, Posts) and the demo `postsSlice`.
4. Point `authService` at your login endpoint and adjust `LoginResponse` in `api/types.ts`.
