import { useFetchers, useMatches, useNavigation } from "@remix-run/react";
import nProgress from "nprogress";
import { useEffect, useMemo } from "react";

nProgress.configure({ showSpinner: false, trickleSpeed: 161 });

export function useMatchesData(id: string) {
  const matchingRoutes = useMatches();

  const route = useMemo(
    () => matchingRoutes.find(route => route.id === id),
    [matchingRoutes, id]
  );

  return route?.data;
}

function isLoaderData(data: any): data is object {
  return data && typeof data === "object";
}

function isServerTime(time: any): time is number {
  return time && typeof time === "number";
}

export function useServerTime() {
  const data = useMatchesData("root");

  if (isLoaderData(data) && "time" in data && isServerTime(data.time)) {
    return new Date(data.time);
  }

  throw new Error();
}

function useNavigationAndFetchersState() {
  const navigation = useNavigation();
  const fetchers = useFetchers();

  const states = [navigation.state, ...fetchers.map(fetcher => fetcher.state)];

  if (states.includes("submitting")) {
    return "submitting";
  } else if (states.includes("loading")) {
    return "loading";
  } else {
    return "idle";
  }
}

export function useNProgress() {
  const state = useNavigationAndFetchersState();

  useEffect(() => {
    if (state === "idle") {
      nProgress.done();
    } else {
      nProgress.start();
    }
  }, [state]);
}
