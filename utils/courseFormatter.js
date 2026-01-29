import VidyaCourses from "@/data/vidya/VidyaCourses.json";

export const formatCourseNameFromJSON = (courseLink = "") => {
  if (!courseLink) return "N/A";

  const course = VidyaCourses.all_Courses.find(
    (c) => c.course_link === courseLink
  );

  if (!course) {
    // fallback (just in case)
    return courseLink
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  return `${course.course_type} ${course.shortName || course.course_name}`;
};
