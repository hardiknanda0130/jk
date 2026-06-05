import ApiService from "@/lib/ApiServiceFunctions";
import { TokenStorage } from "./tokenStorage";
import ApiEndPoints from "@/lib/ApiServiceEndpoint";

let refreshTimer = null;

function getRemainingTime() {
  const expiry =
    TokenStorage.getSsoAccessExpiry?.() || TokenStorage.accessExpiry?.();
  if (!expiry) return 0;

  const exp = new Date(expiry).getTime();
  const now = Date.now();

  return exp - now - 30000; // 30 sec before
}

export async function runRefreshNow() {
  try {
    const refreshToken = TokenStorage.getSsoRefreshToken();
    if (!refreshToken) throw new Error("No refresh token");

    const res = await ApiService.post(ApiEndPoints.refreshToken, {
      refreshToken,
    });

    const {
      accessToken,
      refreshToken: newRefresh,
      expires,
      refreshTokenExpiry,
    } = res.data;

    TokenStorage.setSsoTokens(
      accessToken,
      newRefresh,
      expires,
      refreshTokenExpiry,
    );

    startAutoRefresh(); // restart timer
  } catch (err) {
    // console.error("Refresh failed → logout");
    // TokenStorage.clearSsoTokens();
    // window.location.replace("/login");
  }
}

export function startAutoRefresh() {
  if (refreshTimer) clearTimeout(refreshTimer);

  const time = getRemainingTime();

  if (time <= 0) {
    runRefreshNow();
    return;
  }

  refreshTimer = setTimeout(runRefreshNow, time - 10000);
}
