


export const getStudiesByResearcher = async (researcherId) => {
  const res = await fetch("/api/studies");
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch studies");
  const allStudies = data.studies || data.study || [];
  return allStudies.filter(study => study.researcher === researcherId);
};

export const deleteStudyById = async (id) => {
  const res = await fetch(`/api/studies/${id}`, {
    method: "DELETE"
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete study");
  return data;
};


