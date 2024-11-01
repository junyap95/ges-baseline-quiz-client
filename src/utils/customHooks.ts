import { useEffect } from "react";
import { MAP_API_URL } from "./constants";

/**
 * Custom hook to show a confirmation dialog before the user leaves the page,
 * either through refreshing, closing, or using the browser's back/forward buttons.
 * @param {boolean} shouldWarn - Determines if the warning should be active.
 */
export const useBeforeUnload = (shouldWarn: boolean) => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (shouldWarn) {
        event.preventDefault();
        event.returnValue = ""; // Required for most browsers
      }
    };

    // const handlePopState = () => {
    //   if (shouldWarn) {
    //     const confirmLeave = window.confirm(
    //       "Are you sure you want to leave this page? Progress and data may be lost."
    //     );
    //     if (!confirmLeave) {
    //       window.history.pushState(null, "", window.location.href);
    //     }
    //   }
    // };

    window.addEventListener("beforeunload", handleBeforeUnload);
    // window.addEventListener("popstate", handlePopState);

    // Create a new history state so that we have a point to return if they cancel
    // if (shouldWarn) {
    //   window.history.pushState(null, "", window.location.href);
    // }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      //   window.removeEventListener("popstate", handlePopState);
    };
  }, [shouldWarn]);
};

export const useBeforeBack = (shouldWarn: boolean) => {
  useEffect(() => {
    const handlePopState = () => {
      if (shouldWarn) {
        const confirmLeave = window.confirm(
          "Are you sure you want to leave this page? This will count as an attempt and all progress may be lost."
        );
        if (!confirmLeave) {
          window.history.pushState(null, "", window.location.href);
        } else {
          window.location.href = `${MAP_API_URL}/game-map`;
        }
      }
    };

    window.addEventListener("popstate", handlePopState);

    if (shouldWarn) {
      window.history.pushState(null, "", window.location.href);
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [shouldWarn]);
};
