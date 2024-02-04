import axios from 'axios';
axios.defaults.headers.common = {
  "User-Agent": "uprkit/0.1.0 (Android)",
};
axios.defaults.baseURL = "https://universalpresenterremote.com";

const delay = (time) => {
  return new Promise(res => {
    setTimeout(res, time)
  })
}

export async function AcquireSession() {
  while (true) {
    try {
      const session = await NewSession();
      console.log("Acquired session", global.session);
      return session;
    } catch (e) {
      console.error(e);
      await delay(2000);
    }
  }
}

async function NewSession() {
  return await axios.get('/NewSession').data;
}

export async function TempSession(token, holdfor, fcmtoken) {
  return await axios.get('/TempSession', {
    params: {
      token,
      holdfor,
      fcmtoken
    },
  }).data;
}

export async function SlideUp(token, holdfor) {
  await axios.get('/SlideUp', {
    params: {
      token,
      holdfor
    },
  });
}

export async function SlideDown(token, holdfor) {
  await axios.get('/SlideDown', {
    params: {
      token,
      holdfor
    },
  });
}

export async function PlayMedia(token, holdfor) {
  await axios.get('/PlayMedia', {
    params: {
      token,
      holdfor
    },
  });
}