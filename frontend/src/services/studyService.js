

export const getStudyById = async (id) => {
  const res = await fetch(`/api/studies/${id}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch study");
  return data.study || data;
}

export const submitResponses = async(studyId, answers) => {
  const res = await fetch("/api/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studyId, answers }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to submit responses");
  return data;
}