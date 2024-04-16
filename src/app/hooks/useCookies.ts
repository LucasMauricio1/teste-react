import { setCookie, destroyCookie, parseCookies } from "nookies";

interface AddCookieProps {
  tokenName: string;
  tokenData: string;
  maxAge: number;
}

interface RemoveCookieProps {
  tokenName: string;
}

export function useCookies() {
  function addCookie({ tokenName, tokenData, maxAge }: AddCookieProps) {
    try {
      if (tokenData) {
        setCookie(null, tokenName, tokenData, {
          maxAge,
          path: "/",
        });
      } else {
        console.warn(`No token data provided for cookie: ${tokenName}`);
      }
    } catch (error) {
      console.log("Error setting cookie:", error);
    }
  }

  function removeCookie({ tokenName }: RemoveCookieProps) {
    try {
      destroyCookie(null, tokenName);
    } catch (error) {
      console.log("Error removing cookie:", error);
    }
  }

  function hasCookie() {
    try {
      const cookie = parseCookies();
      return cookie;
    } catch (error) {
      console.log("Error checking cookie:", error);
      return false;
    }
  }

  return { addCookie, removeCookie, hasCookie };
}
