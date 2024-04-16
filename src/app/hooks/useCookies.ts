import { setCookie, destroyCookie, parseCookies } from "nookies";

interface AddCookieProps {
  cookieName: string;
  cookieData: string;
  maxAge: number;
}

interface RemoveCookieProps {
  cookieName: string;
}

interface HasCookieProps extends RemoveCookieProps {}

export function useCookies() {
  function addCookie({ cookieName, cookieData, maxAge }: AddCookieProps) {
    try {
      if (cookieData) {
        setCookie(null, cookieName, cookieData, {
          maxAge,
          path: "/",
        });
      } else {
        console.warn(`No token data provided for cookie: ${cookieName}`);
      }
    } catch (error) {
      console.log("Error setting cookie:", error);
    }
  }

  function removeCookie({ cookieName }: RemoveCookieProps) {
    try {
      destroyCookie(null, cookieName);
    } catch (error) {
      console.log("Error removing cookie:", error);
    }
  }

  function hasCookie({ cookieName }: HasCookieProps) {
    try {
      const cookie = parseCookies();
      const cookieData = cookie[cookieName];
      return cookieData;
    } catch (error) {
      console.log("Error checking cookie:", error);
      return null;
    }
  }

  return { addCookie, removeCookie, hasCookie };
}
