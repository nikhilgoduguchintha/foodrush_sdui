import { useState, useEffect } from "react";
import { fetchLayoutFromServer } from "../engine/serverLayout";

/**
 * Custom hook that:
 * 1. Takes user context
 * 2. "Calls the server" (our simulation)
 * 3. Returns sections + loading state
 *
 * In production: replace fetchLayoutFromServer with
 * an actual fetch() call to your backend.
 */
export function useSDUI(userContext) {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const result = fetchLayoutFromServer(userContext);
      setSections(result);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [JSON.stringify(userContext)]);

  return { sections, loading };
}
