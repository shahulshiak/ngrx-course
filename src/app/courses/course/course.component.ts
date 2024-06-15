import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Course } from "../model/course";
import { Observable } from "rxjs";
import { Lesson } from "../model/lesson";
import { delay, map, tap, withLatestFrom } from "rxjs/operators";
import { LessonEntityService } from "../services/lesson-entity-service";
import { CourseEntityService } from "../services/course-entity.service";

@Component({
  selector: "course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent implements OnInit, OnDestroy {
  course$: Observable<Course>;

  loading$: Observable<boolean>;

  lessons$: Observable<Lesson[]>;

  displayedColumns = ["seqNo", "description", "duration"];

  nextPage = 0;

  constructor(
    private lessonService: LessonEntityService,
    private coursesService: CourseEntityService,
    private route: ActivatedRoute
  ) {}

  ngOnDestroy() {
    this.lessonService.clearCache();
  }

  ngOnInit() {
    const courseUrl = this.route.snapshot.paramMap.get("courseUrl");

    this.course$ = this.coursesService.entities$.pipe(
      map((courses) => courses.find((course) => course.url === courseUrl))
    );

    this.lessons$ = this.lessonService.entities$.pipe(
      withLatestFrom(this.course$),
      tap(([lessons, course]) => {
        if (this.nextPage === 0) {
          this.loadLessonsPage(course);
        }
      }),
      map(([lessons, course]) =>
        lessons.filter((lesson) => lesson.courseId === course.id)
      )
    );

    this.loading$ = this.lessonService.loading$.pipe(delay(0));

    // this.course$ = this.coursesService.findCourseByUrl(courseUrl);

    // this.lessons$ = this.course$.pipe(
    //   concatMap((course) => this.coursesService.findLessons(course.id)),
    //   tap(console.log)
    // );
  }

  loadLessonsPage(course: Course) {
    this.lessonService.getWithQuery({
      courseId: course.id,
      pageNumber: this.nextPage.toString(),
      pageSize: "3",
    });

    this.nextPage += 1;
  }
}
