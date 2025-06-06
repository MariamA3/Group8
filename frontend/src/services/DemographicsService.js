export const submitDemographics = async (sessionId, demographics) => {
  const res = await fetch("/api/demographics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, demographics }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to submit demographics");
  return data;
};