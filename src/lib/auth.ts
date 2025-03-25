import { UserManager, WebStorageStateStore } from "oidc-client-ts";

const IDENTITY_SERVER_URL = "https://rmidp.vnptit.vn";
const CLIENT_ID = "4b25-637664417048491244.apps.smartcaapi.com";
const CLIENT_SECRET = "Nzk2M2QyODQ-NTIyMi00YjI1";
const REDIRECT_URI = "http://localhost:3000/callback";
const POST_LOGOUT_REDIRECT_URI = "https://localhost:44348/";

const userManager = new UserManager({
  authority: IDENTITY_SERVER_URL,
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  redirect_uri: REDIRECT_URI,
  response_type: "code",
  scope: "openid profile email sign offline_access",
  post_logout_redirect_uri: POST_LOGOUT_REDIRECT_URI,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
});

export default userManager;
