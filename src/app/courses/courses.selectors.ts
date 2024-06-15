import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromCourses from "./reducers";

export const selectCoursesState =
  createFeatureSelector<fromCourses.CoursesState>(
    fromCourses.coursesFeatureKey
  );

export const selectAllCourses = createSelector(
  selectCoursesState,
  (coursesState) => {
    return fromCourses.selectors.selectAll(coursesState);
  }
);

export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  (courses) => courses.filter((course) => course.category === "BEGINNER")
);

export const selectAdvancedCourses = createSelector(
  selectAllCourses,
  (courses) => courses.filter((course) => course.category === "ADVANCED")
);

export const selectPromoTotal = createSelector(
  selectAllCourses,
  (courses) => courses.filter((course) => course.promo).length
);

export const areCoursesLoaded = createSelector(
  selectCoursesState,
  (coursesState) => coursesState.allCoursesLoaded
);
