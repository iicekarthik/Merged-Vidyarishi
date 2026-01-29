import React, { useEffect } from "react";
import { useRouter } from "next/router";

const CourseLayout = () => {
  const router = useRouter();
  const postId = router.query.courseId;

  useEffect(() => {
    if (postId === undefined) {
      router.push("/course-filter-one-toggle");
    }
  }, []);
};

export default CourseLayout;
