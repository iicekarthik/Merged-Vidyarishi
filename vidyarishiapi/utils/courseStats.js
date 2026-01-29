// ⏱ Convert "MM:SS" or "HH:MM:SS" → seconds
export const toSeconds = (time) => {
  if (!time || typeof time !== "string") return 0;

  const parts = time.split(":").map(Number);

  if (parts.length === 2) {
    const [m, s] = parts;
    return m * 60 + s;
  }

  if (parts.length === 3) {
    const [h, m, s] = parts;
    return h * 3600 + m * 60 + s;
  }

  return 0;
};

// 📊 Calculate lectures + duration
export const getCourseStats = (sections = []) => {
  let totalLectures = 0;
  let totalSeconds = 0;

  sections.forEach((section) => {
    section.videos.forEach((video) => {
      totalLectures++;
      if (!video.duration) return;

      const parts = video.duration.split(":").map(Number);

      // MM:SS
      if (parts.length === 2) {
        const [m, s] = parts;
        totalSeconds += m * 60 + s;
      }

      // HH:MM:SS
      if (parts.length === 3) {
        const [h, m, s] = parts;
        totalSeconds += h * 3600 + m * 60 + s;
      }
    });
  });

  const totalMinutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  let durationLabel = "0m";

  if (hours > 0 && minutes > 0) {
    durationLabel = `${hours}h ${minutes}m`;
  } else if (hours > 0) {
    durationLabel = `${hours}h`;
  } else if (minutes > 0) {
    durationLabel = `${minutes}m`;
  }

  return {
    totalLectures,
    totalSeconds,
    durationLabel,
  };
};

