import { useState, useEffect } from "react";

import { Event, getEvent } from "../sdk/events";

export function useEvent(eventId: number) {
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getEvent(eventId)
      .then((event) => {
        setEvent(event);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [eventId]);

  return { event, error, loading };
}
