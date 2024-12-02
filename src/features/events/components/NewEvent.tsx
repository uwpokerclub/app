import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../../hooks";
import { Blind, Semester, Structure, StructureWithBlinds } from "../../../types";
import { sendAPIRequest } from "../../../lib";

import styles from "./NewEvent.module.css";

export function NewEvent() {
  const navigate = useNavigate();

  const { data: semesters } = useFetch<Semester[]>("semesters");
  const { data: structures } = useFetch<Structure[]>("structures");

  const nameRef = useRef<HTMLInputElement | null>(null);
  const semesterIdRef = useRef<HTMLSelectElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  const formatRef = useRef<HTMLSelectElement | null>(null);
  const pointsMultiplierRef = useRef<HTMLInputElement | null>(null);
  const notesRef = useRef<HTMLTextAreaElement | null>(null);

  const structureNameRef = useRef<HTMLInputElement>(null);
  const [structureId, setStructureId] = useState("");
  const [blinds, setBlinds] = useState([
    {
      small: 0,
      big: 0,
      ante: 0,
      time: 0,
    },
  ]);

  const [showSelectStructure, setShowSelectStructure] = useState(true);

  const submitDisabled = useCallback(
    () =>
      nameRef.current?.value === "" ||
      formatRef.current?.value === "Invalid" ||
      semesterIdRef.current?.value === "" ||
      dateRef.current?.value === "",
    [nameRef, semesterIdRef, dateRef, formatRef],
  );

  useEffect(() => {
    if (!structures || structures.length === 0) {
      setShowSelectStructure(false);
    } else {
      setShowSelectStructure(true);
    }
  }, [structures]);

  const createEvent = async (e: FormEvent) => {
    e.preventDefault();

    // User has selected "Create a structure"
    let createdStructureId = -1;
    if (!showSelectStructure) {
      const { data } = await sendAPIRequest<StructureWithBlinds>("structures", "POST", {
        name: structureNameRef.current?.value,
        blinds,
      });
      if (data) {
        createdStructureId = data.id;
      }
    }

    const { status } = await sendAPIRequest("events", "POST", {
      name: nameRef.current?.value,
      startDate: new Date(dateRef.current?.value || ""),
      format: formatRef.current?.value,
      notes: notesRef.current?.value,
      semesterId: semesterIdRef.current?.value,
      pointsMultiplier: Number(pointsMultiplierRef.current?.value),
      structureId: createdStructureId === -1 ? Number(structureId) : createdStructureId,
    });

    if (status === 201) {
      navigate("../");
    }
  };

  /**
   * setLevel updates the field of level i in state
   */
  const setLevel = (i: number, field: Partial<Blind>) => {
    setBlinds((prev) => [...prev.slice(0, i), { ...prev[i], ...field }, ...blinds.slice(i + 1)]);
  };

  /**
   * newLevel adds a new level to the state when a user clicks the add level button
   */
  const newLevel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    if (blinds.length === 1) {
      return setBlinds((prev) => [
        ...prev,
        {
          small: prev[0].small * 2,
          big: prev[0].big * 2,
          ante: prev[0].ante * 2,
          time: prev[0].time,
        },
      ]);
    }

    return setBlinds((prev) => {
      return [
        ...prev,
        {
          small: prev[prev.length - 1].small + (prev[prev.length - 1].small - prev[prev.length - 2].small),
          big: prev[prev.length - 1].big + (prev[prev.length - 1].big - prev[prev.length - 2].big),
          ante: prev[prev.length - 1].ante + (prev[prev.length - 1].ante - prev[prev.length - 2].ante),
          time: prev[prev.length - 1].time,
        },
      ];
    });
  };

  return (
    <div>
      <h1 className="text-center">New Event</h1>

      <div className="row">
        <div className="col-md-2" />

        <div className="col-md-8">
          <div className="mx-auto">
            <form>
              <div className="mb-3">
                <label htmlFor="name">Name</label>
                <input
                  data-qa="input-name"
                  ref={nameRef}
                  type="text"
                  placeholder="Name"
                  name="name"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="semester_id">Term</label>
                <select data-qa="select-semester" ref={semesterIdRef} name="semester_id" className="form-control">
                  <option value="">Select Semester</option>
                  {semesters?.map((semester) => (
                    <option key={semester.id} value={semester.id}>
                      {semester.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="start_date">Date</label>
                <input
                  data-qa="input-date"
                  ref={dateRef}
                  type="datetime-local"
                  name="start_date"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="format">Format</label>
                <select data-qa="select-format" ref={formatRef} className="form-control">
                  <option disabled value="Invalid">
                    Select a format
                  </option>
                  <option value="No Limit Hold'em">No Limit Hold&apos;em</option>
                  <option value="Pot Limit Omaha">Pot Limit Omaha</option>
                  <option value="Short Deck No Limit Hold'em">Short Deck No Limit Hold&apos;em</option>
                  <option value="Dealers Choice">Dealers Choice</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="pointsMultiplier">Points Multiplier</label>
                <input
                  data-qa="input-points-multiplier"
                  ref={pointsMultiplierRef}
                  className="form-control"
                  type="text"
                ></input>
              </div>

              <div className="mb-3">
                <header className={styles.tabs}>
                  {structures?.length !== 0 && (
                    <div
                      data-qa="tab-select-structure"
                      className={`${styles.tab} ${showSelectStructure ? styles.tabActive : ""}`}
                      onClick={() => setShowSelectStructure(true)}
                    >
                      <span>Select a structure</span>
                    </div>
                  )}
                  <div
                    data-qa="tab-new-structure"
                    className={`${styles.tab} ${showSelectStructure ? "" : styles.tabActive}`}
                    onClick={() => setShowSelectStructure(false)}
                  >
                    <span>Create a new structure</span>
                  </div>
                </header>
                {showSelectStructure ? (
                  <select
                    data-qa="select-structure"
                    className="form-control"
                    value={structureId}
                    onChange={(e) => setStructureId(e.target.value)}
                  >
                    <option value="">Select a structure</option>
                    {structures?.map((structure) => (
                      <option key={structure.id} value={structure.id}>
                        {structure.name}
                      </option>
                    )) || <></>}
                  </select>
                ) : (
                  <>
                    <input
                      data-qa="input-structure-name"
                      ref={structureNameRef}
                      name="structureName"
                      className="form-control"
                      placeholder="Name the structure"
                    />
                    <header className={styles.header}>
                      <span>Small</span>
                      <span>Big</span>
                      <span>Ante</span>
                      <span>Time</span>
                    </header>
                    {blinds.map((blind, i) => (
                      <div key={i} className="input-group">
                        <input
                          data-qa={`blind-${i}-small`}
                          className="form-control"
                          type="text"
                          value={blind.small}
                          onChange={(e) => setLevel(i, { small: Number(e.target.value) })}
                        ></input>
                        <input
                          data-qa={`blind-${i}-big`}
                          className="form-control"
                          type="text"
                          value={blind.big}
                          onChange={(e) => setLevel(i, { big: Number(e.target.value) })}
                        ></input>
                        <input
                          data-qa={`blind-${i}-ante`}
                          className="form-control"
                          type="text"
                          value={blind.ante}
                          onChange={(e) => setLevel(i, { ante: Number(e.target.value) })}
                        ></input>
                        <input
                          data-qa={`blind-${i}-time`}
                          className="form-control"
                          type="text"
                          value={blind.time}
                          onChange={(e) => setLevel(i, { time: Number(e.target.value) })}
                        ></input>
                      </div>
                    ))}

                    <button
                      data-qa="add-level-btn"
                      className={`btn btn-primary ${styles.addBtn}`}
                      onClick={(e) => newLevel(e)}
                    >
                      Add level
                    </button>
                  </>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="notes">Additional Details</label>
                <textarea
                  data-qa="input-additional-details"
                  ref={notesRef}
                  rows={6}
                  name="notes"
                  className="form-control"
                />
              </div>

              <div className="row">
                <div className="text-center">
                  <button
                    data-qa="submit-btn"
                    type="submit"
                    value="create"
                    className="btn btn-success btn-responsive"
                    disabled={submitDisabled()}
                    onClick={createEvent}
                  >
                    Create
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="col-md-2" />
      </div>
    </div>
  );
}
