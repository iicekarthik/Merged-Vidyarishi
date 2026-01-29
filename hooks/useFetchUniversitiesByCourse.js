"use client";
import { useEffect, useState, useCallback } from "react";
import University from "@/data/vidya/University.json";

export const useFetchUniversitiesSorted = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);

  const PRIORITY_ORDER = [
    "Amity University Online",
    "Manipal University Online",
    "Sharda University Online",
    "Parul University Online",
    "D.Y. Patil University Online",
    "Jain University Online",
    "NMIMS University Online",
    "Lovely Professional University Online",
    "D.Y. Patil Navi Mumbai",
    "UPES University Online",
    "Vivekananda Global University Online",
    "Mangalayatan University Online",
    "Swami Vivekanand Subharti University Distance",
    "Amrita University Online",
  ];

  const normalize = useCallback((str) => {
    return (str || "").toString().trim().toLowerCase().replace(/\s+/g, " ");
  }, []);

  const fetchUniversitiesSorted = useCallback(
    (courseName, degreeType, specialization = "") => {
      if (!courseName || !degreeType) return;

      setLoading(true);

      const allUniversities = University?.AllUniversities || [];

      const matchedUniversities = allUniversities
        .map((uni) => {
          const matchedCourses = uni.courses.filter((course) => {
            const matchCourse =
              normalize(course.shortName) === normalize(courseName);

            const matchDegree =
              normalize(course.degree_type) === normalize(degreeType);

            let matchSpecialization = true;

            if (specialization) {
              const allSpecs = course.specializations?.specializationList || [];

              matchSpecialization = allSpecs.some(
                (spec) =>
                  normalize(spec.specialization_name) ===
                  normalize(specialization)
              );
            }

            return matchCourse && matchDegree && matchSpecialization;
          });

          if (matchedCourses.length > 0) {
            return {
              ...uni,
              universityName: uni.title,
              universityLink: uni.link || uni.url || "",
              matchedCourses,
              fee: matchedCourses[0]?.fee || "N/A",
            };
          }

          return null;
        })
        .filter(Boolean);

      const sortedUniversities = matchedUniversities
        .slice(0, 10)
        .sort((a, b) => {
          const aPriority = PRIORITY_ORDER.indexOf(a.universityName);
          const bPriority = PRIORITY_ORDER.indexOf(b.universityName);

          if (aPriority !== -1 && bPriority !== -1)
            return aPriority - bPriority;
          if (aPriority !== -1) return -1;
          if (bPriority !== -1) return 1;

          return a.universityName.localeCompare(b.universityName);
        });

      // 🚨 Remove current university from the list
      // console.log("window.location.pathname - ", window.location.pathname.split("/"))
      const currentUniversitySlug = window.location.pathname.split("/")[1];
      // console.log("currentUniversitySlug - ", currentUniversitySlug)

      const convertSlugToTitle = (slug) =>
        slug
          ?.split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ")
          .trim();

      const normalizedSlugTitle = convertSlugToTitle(
        currentUniversitySlug
      ).toLowerCase();

      // console.log("normalizedSlugTitle - ", normalizedSlugTitle)

      const finalList = sortedUniversities.filter(
        (uni) => {
          const cleanedName = uni.universityName
            .replace(/\./g, "")   // remove dots
            .toLowerCase()
            .trim();

          return !cleanedName.includes(normalizedSlugTitle);
        }
      );

      setUniversities(finalList);
      setLoading(false);
    },
    [normalize]
  );

  return {
    universities,
    UniveristyLoading: loading,
    fetchUniversitiesSorted,
  };
};
