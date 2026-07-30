export function getProjectStatusColorClass(status?: string) {
  console.log("S", status);
  const normalizedStatus = status?.trim().toLowerCase();

  if (normalizedStatus === "live" || normalizedStatus === "completed") {
    return "text-emerald-400/75";
  }

  if (normalizedStatus === "archived") {
    return "text-amber-300/75";
  }

  if (normalizedStatus === "in development") {
    return "text-amber-300/75";
  }

  if (normalizedStatus === "practice project") {
    return "text-sky-300/75";
  }

  return "text-primary-text/40";
}
