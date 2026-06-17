import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import type { DashboardOutletContext } from "../components/dashboard/DashboardLayout";

export function usePageTitle(title: string) {
  const { setPageTitle } = useOutletContext<DashboardOutletContext>();

  useEffect(() => {
    setPageTitle(title);
  }, [setPageTitle, title]);
}
