"use client";
import { useEffect, useState, useCallback } from "react";
import University from "@/data/vidya/University.json";

export const useFetchSpecializations = () => {
  const [specializations, setSpecializations] = useState([]);
  const [specializationloading, setSpecializationLoading] = useState(false);

  const normalize = useCallback(
    (str) => (str || "").toString().trim().toLowerCase().replace(/\s+/g, " "),
    []
  );

  const fetchByCourseAndDegree = useCallback(
    (courseName, degreeType) => {
      if (!courseName || !degreeType) return;
      setSpecializationLoading(true);

      const universities = University?.AllUniversities || [];

      // Step 1: collect all valid courses
      const allCourses = universities.flatMap((university) =>
        university.courses
          .filter(
            (course) =>
              Array.isArray(course.overviewTableDetails) &&
              course.overviewTableDetails.length > 0 &&
              course.keyoverview &&
              Object.keys(course.keyoverview).length > 0 &&
              course.eligibilityDuration &&
              Object.keys(course.eligibilityDuration).length > 0 &&
              course.admissionProcess &&
              Object.keys(course.admissionProcess).length > 0 &&
              typeof course.course_name === "string" &&
              course.course_name.trim() !== ""
          )
          .map((course) => ({
            ...course,
            universityDetails: university,
          }))
      );

      // Step 2: filter by courseName + degreeType
      const filteredCourses = allCourses.filter(
        (course) =>
          normalize(course.shortName) === normalize(courseName) &&
          normalize(course.degree_type) === normalize(degreeType)
      );

      // Step 3: gather all specializations
      const allSpecs = filteredCourses.flatMap((course) => {
        const specs = course.specializations?.specializationList || [];
        return specs.map((spec) => ({
          specialization_name: spec.specialization_name,
          university: course.universityDetails.title,
          course_name: course.course_name,
        }));
      });

      // Step 4: remove duplicates
      const uniqueSpecs = Array.from(
        new Map(
          allSpecs.map((spec) => [normalize(spec.specialization_name), spec])
        ).values()
      );

      setSpecializations(uniqueSpecs);
      setSpecializationLoading(false);
    },
    [normalize]
  );

  return {
    specializations,
    specializationloading,
    fetchByCourseAndDegree,
  };
};
