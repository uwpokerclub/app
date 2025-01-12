import { useParams } from "react-router-dom";
import { Modal } from "../../../components";
import { useCallback, useState } from "react";
import { endEvent } from "../../../sdk/events";

type EndEventModalProps = {
  show: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export function EndEventModal({ show, onClose, onSuccess }: EndEventModalProps) {
  const { eventId = "" } = useParams<{ eventId: string }>();

  const [error, setError] = useState("");

  const handleSubmit = useCallback(async () => {
    try {
      await endEvent(eventId);
    } catch (err) {
      if (!(err instanceof SyntaxError)) {
        setError((err as Error).message);
        return;
      }
    }
    onSuccess();
    onClose();
    setError(() => "");
  }, [eventId, onClose, onSuccess]);

  return (
    <Modal
      title="Are you sure you want to end the event?"
      show={show}
      primaryButtonText="End event"
      primaryButtonType="danger"
      closeButtonText="Go back"
      closeButtonType="outline-secondary"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <p>
        Ending the event will calculate the amount of points each player will get and update the rankings. This action
        should only be taken once the tournament has ended and the final standings have been confirmed.
      </p>
      <p>
        <strong>
          This action cannot be undone. If you are sure you want to end the event, click the &quot;End event&quot;
          button.
        </strong>
      </p>
    </Modal>
  );
}
