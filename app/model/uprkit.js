import axios from "axios";
import { createContext } from "react";
import { Platform } from "react-native";

axios.defaults.headers.common = {
  "User-Agent": `uprkit/1.0.0 (${Platform.OS})`,
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
      token,
      holdfor,
    },
  });
  return tempSession.data;
}

export async function SlideUp(token, holdfor) {
  await axios.get("/SlideUp", {
    params: {
      token,
      holdfor,
    },
  });
}

export async function SlideDown(token, holdfor) {
  await axios.get("/SlideDown", {
    params: {
      token,
      holdfor,
    },
  });
}

export async function PlayMedia(token, holdfor) {
  await axios.get("/PlayMedia", {
    params: {
      token,
      holdfor,
    },
  });
}
