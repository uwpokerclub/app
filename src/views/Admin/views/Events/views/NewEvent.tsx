import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../../../hooks/useFetch";
import sendAPIRequest from "../../../../../shared/utils/sendAPIRequest";

import {
  Blind,
  Semester,
  Structure,
  StructureWithBlinds,
} from "../../../../../types";

function NewEvent(): ReactElement {
  const navigate = useNavigate();

  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [format, setFormat] = useState("Invalid");
  const [notes, setNotes] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [pointsMultiplier, setPointsMultiplier] = useState("1");
  const [structureId, setStructureId] = useState("");
  const [structures, setStructures] = useState<Structure[]>([]);

  const [showSelectStructure, setShowSelectStructure] = useState(true);

  const { data: semestersData } = useFetch<Semester[]>("semesters");
  const { data: structuresData } = useFetch<Structure[]>("structures");

  const structureNameRef = useRef<HTMLInputElement>(null);
  const [blinds, setBlinds] = useState([
    {
      small: 0,
      big: 0,
      ante: 0,
      time: 0,
    },
  ]);

  const submitDisabled = useCallback(
    () =>
      name === "" ||
      format === "Invalid" ||
      semesterId === "" ||
      startDate === "",
    [name, semesterId, startDate, format],
  );

  useEffect(() => {
    if (semestersData) {
      setSemesters(semestersData);
    }
    if (structuresData) {
      if (structuresData.length === 0) {
        setShowSelectStructure(false);
      }
      setStructures(structuresData);
    }
  }, [semestersData, structuresData]);

  const createEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    // User has selected "Create a structure"
    let createdStructureId = -1;
    if (!showSelectStructure) {
      const { data } = await sendAPIRequest<StructureWithBlinds>(
        "structures",
        "POST",
        {
          name: structureNameRef.current?.value,
          blinds,
        },
      );
      if (data) {
        createdStructureId = data.id;
      }
    }

    sendAPIRequest("events", "POST", {
      name,
      startDate: new Date(startDate),
      format,
      notes,
      semesterId,
      pointsMultiplier: Number(pointsMultiplier),
      structureId:
        createdStructureId === -1 ? Number(structureId) : createdStructureId,
    }).then(({ status }) => {
      if (status === 201) {
        navigate("../");
      }
    });
  };

  const setLevel = (i: number, field: Partial<Blind>) => {
    setBlinds([
      ...blinds.slice(0, i),
      { ...blinds[i], ...field },
      ...blinds.slice(i + 1),
    ]);
  };

  const newLevel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    if (blinds.length === 1) {
      return setBlinds((oldLevels) => {
        return [
          ...oldLevels,
          {
            small: oldLevels[0].small * 2,
            big: oldLevels[0].big * 2,
            ante: oldLevels[0].ante * 2,
            time: oldLevels[0].time,
          },
        ];
      });
    }

    return setBlinds((oldLevels) => {
      return [
        ...oldLevels,
        {
          small:
            oldLevels[oldLevels.length - 1].small +
            (oldLevels[oldLevels.length - 1].small -
              oldLevels[oldLevels.length - 2].small),
          big:
            oldLevels[oldLevels.length - 1].big +
            (oldLevels[oldLevels.length - 1].big -
              oldLevels[oldLevels.length - 2].big),
          ante:
            oldLevels[oldLevels.length - 1].ante +
            (oldLevels[oldLevels.length - 1].ante -
              oldLevels[oldLevels.length - 2].ante),
          time: oldLevels[oldLevels.length - 1].time,
        },
      ];
    });
  };

  return (
    <div>
      <h1 className="center">New Event</h1>

      <div className="row">
        <div className="col-md-2" />

        <div className="col-md-8">
          <div className="mx-auto">
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="semester_id">Term</label>
                <select
                  name="semester_id"
                  className="form-control"
                  value={semesterId}
                  onChange={(e) => setSemesterId(e.target.value)}
                >
                  <option disabled value="">
                    Select Semester
                  </option>
                  {semesters.map((semester) => (
                    <option value={semester.id}>{semester.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="start_date">Date</label>
                <input
                  type="datetime-local"
                  name="start_date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="format">Format</label>
                <select
                  className="form-control"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                >
                  <option disabled value="Invalid">
                    Select a format
                  </option>
                  <option value="No Limit Hold'em">No Limit Hold'em</option>
                  <option value="Pot Limit Omaha">Pot Limit Omaha</option>
                  <option value="Short Deck No Limit Hold'em">
                    Short Deck No Limit Hold'em
                  </option>
                  <option value="Dealers Choice">Dealers Choice</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="pointsMultiplier">Points Multiplier</label>
                <input
                  className="form-control"
                  type="text"
                  value={pointsMultiplier}
                  onChange={(e) => setPointsMultiplier(e.target.value)}
                ></input>
              </div>

              <div className="form-group">
                <header className="Structures__tab-group">
                  {structures.length !== 0 && (
                    <div
                      className={`Structures__tab ${
                        showSelectStructure ? "Structures__tab-active" : ""
                      }`}
                      onClick={() => setShowSelectStructure(true)}
                    >
                      <span>Select a structure</span>
                    </div>
                  )}
                  <div
                    className={`Structures__tab ${
                      showSelectStructure ? "" : "Structures__tab-active"
                    }`}
                    onClick={() => setShowSelectStructure(false)}
                  >
                    <span>Create a new structure</span>
                  </div>
                </header>
                {showSelectStructure ? (
                  <select
                    className="form-control"
                    value={structureId}
                    onChange={(e) => setStructureId(e.target.value)}
                  >
                    <option value="" disabled>
                      Select a structure
                    </option>
                    {structures.map((structure) => (
                      <option key={structure.id} value={structure.id}>
                        {structure.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <>
                    <input
                      ref={structureNameRef}
                      name="structureName"
                      className="form-control"
                      placeholder="Name the structure"
                    />
                    <header className="StructureBlinds__header">
                      <span>Small</span>
                      <span>Big</span>
                      <span>Ante</span>
                      <span>Time</span>
                    </header>
                    {blinds.map((blind, i) => (
                      <div className="input-group">
                        <input
                          className="form-control"
                          type="text"
                          value={blind.small}
                          onChange={(e) =>
                            setLevel(i, { small: Number(e.target.value) })
                          }
                        ></input>
                        <input
                          className="form-control"
                          type="text"
                          value={blind.big}
                          onChange={(e) =>
                            setLevel(i, { big: Number(e.target.value) })
                          }
                        ></input>
                        <input
                          className="form-control"
                          type="text"
                          value={blind.ante}
                          onChange={(e) =>
                            setLevel(i, { ante: Number(e.target.value) })
                          }
                        ></input>
                        <input
                          className="form-control"
                          type="text"
                          value={blind.time}
                          onChange={(e) =>
                            setLevel(i, { time: Number(e.target.value) })
                          }
                        ></input>
                      </div>
                    ))}

                    <button
                      className="btn btn-primary StructureBlinds__add"
                      onClick={(e) => newLevel(e)}
                    >
                      Add level
                    </button>
                  </>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="notes">Additional Details</label>
                <textarea
                  rows={6}
                  name="notes"
                  className="form-control"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <div className="row">
                <div className="mx-auto">
                  <button
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

export default NewEvent;
