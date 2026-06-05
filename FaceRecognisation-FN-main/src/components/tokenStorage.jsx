const setCookie = (name, value, expiresAt) => {
  if (typeof document === "undefined") return;
  if (!value || !expiresAt) return;

  const expires = new Date(expiresAt).toUTCString();

  document.cookie =
    `${name}=${encodeURIComponent(value)}; ` +
    `expires=${expires}; ` +
    `path=/; ` +
    `SameSite=Lax`;
};

const getCookie = (name) => {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));

  return match ? decodeURIComponent(match[2]) : null;
};

const deleteCookie = (name) => {
  if (typeof document === "undefined") return;

  document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
};

/* ================= TOKEN STORAGE ================= */
export const TokenStorage = {
  /* 🔹 PROJECT TOKENS */
  getAccessToken: () => getCookie("accessToken"),
  getRefreshToken: () => getCookie("refreshToken"),

  setProjectTokensById: (
    projectId,
    accessToken,
    refreshToken,
    accessExpiry,
    refreshExpiry,
  ) => {
    setCookie(`accessToken_${projectId}`, accessToken, accessExpiry);
    setCookie(`refreshToken_${projectId}`, refreshToken, refreshExpiry);
    setCookie(`accessExpiry_${projectId}`, accessExpiry, accessExpiry);
    setCookie(`refreshExpiry_${projectId}`, refreshExpiry, refreshExpiry);
  },

  /* 🔹 SSO TOKENS */
  getSsoAccessToken: () => getCookie("ssoAccessToken"),
  getSsoRefreshToken: () => getCookie("ssoRefreshToken"),
  getSsoAccessExpiry: () => getCookie("ssoAccessExpiry"),
  getSsoRefreshExpiry: () => getCookie("ssoRefreshExpiry"),

  setSsoTokens: (accessToken, refreshToken, accessExpiry, refreshExpiry) => {
    setCookie("ssoAccessToken", accessToken, accessExpiry);
    setCookie("ssoRefreshToken", refreshToken, refreshExpiry);
    setCookie(`ssoAccessExpiry`, accessExpiry, accessExpiry);
    setCookie(`ssoRefreshExpiry`, refreshExpiry, refreshExpiry);
  },

  clearSsoTokens: () => {
    deleteCookie("ssoAccessToken");
    deleteCookie("ssoRefreshToken");
    deleteCookie("ssoAccessExpiry");
    deleteCookie("ssoRefreshExpiry");
  },
};
