import axios from "axios";
import { createContext } from "react";
import { Platform } from "react-native";
import * as StoreReview from "expo-store-review";
import AsyncStorage from "@react-native-async-storage/async-storage";
import appConfig from "../../app.json";

export const APP_VERSION = appConfig.expo.version;

axios.defaults.headers.common = {
  "User-Agent": `uprkit/${APP_VERSION} (${Platform.OS})`,
};
axios.defaults.baseURL = "https://universalpresenterremote.com";

export const UPRContext = createContext();
export const SessionInitializing = "...";

// The server returns the six-digit token as plain text, which axios
// JSON-parses into a number — dropping leading zeros. Returns the token
// as a padded string, or null while the session is still initializing.
export function FormatToken(token) {
  const raw = token == null ? "" : String(token);
  return /^\d+$/.test(raw) ? raw.padStart(6, "0") : null;
}

const delay = (time) => {
  return new Promise((res) => {
    setTimeout(res, time);
  });
};

export async function AcquireSession() {
  while (true) {
    try {
      const newSession = await axios.get("/NewSession");
      return newSession.data;
    } catch (e) {
      console.error(e);
      await delay(2000);
    }
  }
}

export async function TempSession(token, holdfor) {
  const tempSession = await axios.get("/TempSession", {
    params: {
      token: FormatToken(token),
      holdfor,
    },
  });
  return tempSession.data;
}

export async function SlideUp(token, holdfor) {
  await axios.get("/SlideUp", {
    params: {
      token: FormatToken(token),
      holdfor,
    },
  });
}

export async function SlideDown(token, holdfor) {
  await axios.get("/SlideDown", {
    params: {
      token: FormatToken(token),
      holdfor,
    },
  });
}

export async function PlayMedia(token, holdfor) {
  await axios.get("/PlayMedia", {
    params: {
      token: FormatToken(token),
      holdfor,
    },
  });
}

// A session worth asking about: enough commands sent over enough time that
// the remote clearly did its job. Thresholds are strict (">"), matching the
// "over 3 minutes / over 10 commands" bar.
const REVIEW_MIN_SESSION_MS = 3 * 60 * 1000;
const REVIEW_MIN_COMMANDS = 10;
// The app version we last prompted on, so we ask at most once per release.
const REVIEW_PROMPTED_KEY = "uprkit:reviewPromptedVersion";

// Asks for a store review after a clearly successful session. Safe to
// fire-and-forget: it no-ops unless the thresholds are met, the OS supports
// the native review sheet, and we haven't already asked on this version.
export async function MaybeRequestReview({ commandCount, sessionMs }) {
  if (
    commandCount <= REVIEW_MIN_COMMANDS ||
    sessionMs <= REVIEW_MIN_SESSION_MS
  ) {
    return;
  }

  try {
    // The OS caps how often the review sheet can appear; don't spend that
    // budget more than once per installed version.
    const promptedVersion = await AsyncStorage.getItem(REVIEW_PROMPTED_KEY);
    if (promptedVersion === APP_VERSION) {
      return;
    }

    if (!(await StoreReview.isAvailableAsync())) {
      return;
    }

    await StoreReview.requestReview();
    await AsyncStorage.setItem(REVIEW_PROMPTED_KEY, APP_VERSION);
  } catch (e) {
    console.error(e);
  }
}
