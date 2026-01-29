import React, { useEffect } from "react";
import { useRouter } from "next/router";

const CourseLayout = () => {
  const router = useRouter();
  const postId = router.query.courseId;

  useEffect(() => {
    if (postId === undefined) {
      router.push("/course-card-2");
    }
  }, []);
};

export default CourseLayout;
