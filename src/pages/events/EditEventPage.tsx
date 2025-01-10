import { useParams } from "react-router-dom";
import { EditEventForm } from "../../features/events/components/EditEventForm";
import { useEvent } from "../../hooks";
import { LoadingScreen } from "../../components";

export function EditEventPage() {
  const { eventId = "" } = useParams<{ eventId: string }>();

  const { event, loading } = useEvent(Number(eventId));

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="container">
      <h1 className="text-center">Edit {event!.name}</h1>
      <EditEventForm event={event!} />
    </div>
  );
}
