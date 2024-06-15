import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Course, compareCourses } from "../model/course";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "../action-types";

export const coursesFeatureKey = "courses";

export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
});

export const initalCoursesState = adapter.getInitialState({
  allCoursesLoaded: false,
});

export const coursesReducer = createReducer(
  initalCoursesState,
  on(CourseActions.allCoursesLoaded, (state, action) =>
    adapter.setAll(action.courses, { ...state, allCoursesLoaded: true })
  ),
  on(CourseActions.courseUpdated, (state, action) =>
    adapter.updateOne(action.update, state)
  )
);

export const selectors = adapter.getSelectors();
