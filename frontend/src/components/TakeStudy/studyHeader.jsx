export default function StudyHeader({ title, participantId, currentIndex, total }) {
    const progress = (currentIndex / total) * 100;
  
    return (
      <div style={{ marginBottom: "2rem" }}>
        <div
          style={{
            backgroundColor: "#4f6df5",
            color: "white",
            padding: "1rem",
            borderRadius: "4px",
            marginBottom: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 0 }}>{title}</h2>
          {participantId && (
            <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>
              Session ID: {participantId.slice(-6)}
            </span>
          )}
        </div>
  
        <div
          style={{
            height: "8px",
            backgroundColor: "#ccc",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              backgroundColor: "#4f6df5",
              transition: "width 0.3s ease",
            }}
          ></div>
        </div>
      </div>
    );
  }