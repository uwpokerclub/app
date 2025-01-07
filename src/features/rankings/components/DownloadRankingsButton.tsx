type Props = {
  semesterID: string;
};

export function DownloadRankingsButton({ semesterID }: Props) {
  const handleClick = async () => {
    // Fetch the top 100 rankings
    const response = await fetch(`${import.meta.env.VITE_API_URL}/semesters/${semesterID}/rankings/export`, {
      credentials: "include",
    });

    // Create the download link
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = response.headers.get("Content-Disposition")!.split("filename=")[1].replace(/"/g, "");

    // Trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up the link
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <button className="btn btn-success" onClick={handleClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-file-earmark-arrow-down-fill"
        viewBox="0 0 16 16"
      >
        <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1m-1 4v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 11.293V7.5a.5.5 0 0 1 1 0" />
      </svg>
      <span className="ps-1">Download</span>
    </button>
  );
}
