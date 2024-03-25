export function ResultsEmbed() {
  return (
    <div
      id="rv-embed-results"
      style={{
        maxWidth: "1140px",
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: "2px",
        paddingRight: "2px",
      }}
    >
      <iframe
        width="100%"
        height="650"
        style={{
          border: "2px solid #EEEEEE",
          borderRadius: "10px",
          maxWidth: "1140px",
        }}
        title="Winter 2024 Election election powered by RankedVote"
        loading="lazy"
        src="https://app.rankedvote.co/rv/uwpsc-w24/results/embed-rv/"
      ></iframe>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            color: "#B0B7C3",
            fontSize: "14px",
            textAlign: "left",
            marginTop: "2px",
            marginLeft: "10px",
          }}
        >
          <strong>
            Not loading?{" "}
            <a
              href="https://app.rankedvote.co/rv/uwpsc-w24/results/embed-rv/"
              style={{ color: "#B0B7C3", fontSize: "14px" }}
            >
              Click here
            </a>
          </strong>
        </div>{" "}
        <div
          style={{
            color: "#B0B7C3",
            fontSize: "14px",
            textAlign: "right",
            marginTop: "2px",
            marginRight: "10px",
          }}
        >
          <strong>
            <em>
              Powered by{" "}
              <a href="https://www.rankedvote.co" style={{ color: "#7540EE", fontSize: "14px" }}>
                RankedVote
              </a>
            </em>
          </strong>
        </div>
      </div>
    </div>
  );
}

export function ElectionEmbed() {
  return (
    <div
      id="rv-embed-vote"
      style={{
        maxWidth: "1140px",
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: "2px",
        paddingRight: "2px",
      }}
    >
      <iframe
        width="100%"
        height="650"
        style={{
          border: "2px solid #EEEEEE",
          borderRadius: "10px",
          maxWidth: "1140px",
        }}
        title="Spring 2024 Election election powered by RankedVote"
        loading="lazy"
        src="https://app.rankedvote.co/rv/uwpsc-s24/vote/embed-rv/"
      ></iframe>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            color: "#B0B7C3",
            fontSize: "14px",
            textAlign: "left",
            marginTop: "2px",
            marginLeft: "10px",
          }}
        >
          <strong>
            Not loading?{" "}
            <a
              href="https://app.rankedvote.co/rv/uwpsc-s24/vote/embed-rv/"
              style={{ color: "#B0B7C3", fontSize: "14px" }}
            >
              Click here
            </a>
          </strong>
        </div>{" "}
        <div
          style={{
            color: "#B0B7C3",
            fontSize: "14px",
            textAlign: "right",
            marginTop: "2px",
            marginRight: "10px",
          }}
        >
          <strong>
            <em>
              Powered by{" "}
              <a href="https://www.rankedvote.co" style={{ color: "#7540EE", fontSize: "14px" }}>
                RankedVote
              </a>
            </em>
          </strong>
        </div>
      </div>
    </div>
  );
}
