import React, { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../../../hooks/useFetch";

import NoResults from "../../../../../shared/components/NoResults/NoResults";
import TermSelector from "../../../../../shared/components/TermSelector/TermSelector";
import { Event, Semester } from "../../../../../types";

function ListEvents(): ReactElement {
  const [isLoading, setIsLoading] = useState(true);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  const viewEventsForSemester = (semesterId: string): void => {
    if (semesterId === "All") {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(
        events.filter((event) => event.semesterId === semesterId)
      );
    }
  };

  const { data: eventsData } = useFetch<Event[]>("events");
  const { data: semestersData } = useFetch<Semester[]>("semesters");

  useEffect(() => {
    if (eventsData && semestersData) {
      setEvents(eventsData);
      setFilteredEvents(eventsData);
      setSemesters(semestersData);
      setIsLoading(false);
    }
  }, [eventsData, semestersData]);


  return (
    <>
      {!isLoading && (
        <div>
          <h1>Events</h1>

          <div className="row">
            <div className="col-md-6">
              <Link
                to={`new`}
                className="btn btn-primary btn-responsive"
              >
                Create an Event
              </Link>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <TermSelector
                  semesters={semesters}
                  onSelect={viewEventsForSemester}
                />
              </div>
            </div>
          </div>

          <div className="list-group">
            {filteredEvents.length > 0 ? (
              <>
                {filteredEvents.map((event) => (
                  <Link
                    key={event.id}
                    to={`${event.id}`}
                    className="list-group-item"
                  >
                    <h4 className="list-group-item-heading bold">
                      {event.name}
                    </h4>

                    <div className="list-group-item-text">
                      <p>
                        <strong>Format:</strong> {event.format}
                      </p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {
                          new Date(event.startDate).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                            }
                          )
                        }
                      </p>
                      <p>
                        <strong>Additional Details:</strong> {event.notes}
                      </p>
                      <p> {event.count || "No"} Entries </p>
                    </div>
                  </Link>
                ))}
              </>
            ) : (
              <NoResults
                title="No events have been created."
                body="Create a new event above to get started."
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ListEvents;
