import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

import CourseData from "../../data/course-details/courseData.json";

import MutipleSelect from "./Quiz/MutipleSelect";
import SingleSelect from "./Quiz/SingleSelect";
import TrueFalse from "./Quiz/TrueFalse";
import FillBlanks from "./Quiz/FillBlanks";
import Summary from "./Quiz/Summary";
import Ordering from "./Quiz/Ordering";
import QuizHead from "./Quiz/QuizHead";

const LessonQuiz = () => {
  const [courseList, setCourseList] = useState(CourseData.courseDetails);
  const [hydrated, setHydrated] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const totalQuestions = 6;

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  useEffect(() => {
    setHydrated(true);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setCourseList((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  if (!hydrated) {
    return null;
  }

  return (
    <>
      <form id="quiz-form" className="quiz-form-wrapper">
        <div
          id="question-1"
          className={`question ${currentQuestion === 0 ? "" : "d-none"}`}
        >
          <QuizHead questionNo="1" totalQuestion="6" attemp="2" />
          <MutipleSelect />
        </div>

        <div
          id="question-2"
          className={`question ${currentQuestion === 1 ? "" : "d-none"}`}
        >
          <QuizHead questionNo="2" totalQuestion="6" attemp="3" />
          <SingleSelect />
        </div>

        <div
          id="question-3"
          className={`question ${currentQuestion === 2 ? "" : "d-none"}`}
        >
          <QuizHead questionNo="3" totalQuestion="6" attemp="1" />
          <TrueFalse />
        </div>
        <div
          id="question-4"
          className={`question ${currentQuestion === 3 ? "" : "d-none"}`}
        >
          <QuizHead questionNo="4" totalQuestion="6" attemp="3" />
          <Summary />
        </div>

        <div
          id="question-5"
          className={`question ${currentQuestion === 4 ? "" : "d-none"}`}
        >
          <QuizHead questionNo="5" totalQuestion="6" attemp="4" />
          <FillBlanks num="1" />
        </div>

        <div
          id="question-6"
          className={`question ${currentQuestion === 5 ? "" : "d-none"}`}
        >
          <QuizHead questionNo="6" totalQuestion="6" attemp="5" />
          <div className="rbt-single-quiz">
            <h4>6. Change Question Order</h4>
            <div className="row g-3 mt--10">
              <div className="col-lg-12">
                <div className="rbt-form-chec">
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    modifiers={[restrictToVerticalAxis]}
                  >
                    <SortableContext
                      items={courseList}
                      strategy={verticalListSortingStrategy}
                    >
                      {courseList.slice(0, 3).map((course) => (
                        <Ordering key={course.id} course={course} />
                      ))}
                    </SortableContext>
                  </DndContext>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rbt-quiz-btn-wrapper mt--30">
          <button
            className="rbt-btn bg-primary-opacity btn-sm"
            id="prev-btn"
            type="button"
            onClick={handlePrev}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
          {currentQuestion < totalQuestions - 1 ? (
            <button
              className="rbt-btn bg-primary-opacity btn-sm ms-2"
              id="next-btn"
              type="button"
              onClick={handleNext}
            >
              Next
            </button>
          ) : (
            <Link
              className="rbt-btn btn-gradient btn-sm ms-2"
              href="/lesson-quiz-result"
              id="submit-btn"
            >
              Submit
            </Link>
          )}
        </div>
      </form>
    </>
  );
};

export default LessonQuiz;
