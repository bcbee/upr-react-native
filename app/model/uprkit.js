import axios from "axios";
import { createContext } from "react";

axios.defaults.headers.common = {
  "User-Agent": "uprkit/0.1.0 (Android)",
};
axios.defaults.baseURL = "https://universalpresenterremote.com";

export const UPRContext = createContext();
export const SessionInitializing = "...";

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

export async function TempSession(token, holdfor, fcmtoken) {
  const tempSession = await axios.get("/TempSession", {
    params: {
      token,
      holdfor,
      fcmtoken,
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
