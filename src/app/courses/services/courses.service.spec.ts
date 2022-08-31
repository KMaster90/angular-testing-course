import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CoursesService} from './courses.service';
import {COURSES, findLessonsForCourse, LESSONS} from '../../../../server/db-data';
import {Course} from '../model/course';
import {HttpErrorResponse} from '@angular/common/http';
import {Lesson} from '../model/lesson';

describe('CoursesService', () => {
  let coursesService: CoursesService,
    httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CoursesService
      ]
    });
    coursesService = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  it('find All Courses', () => {
    coursesService.findAllCourses().subscribe(courses => {
      expect(courses).toBeTruthy('courses should be truthy');
      console.log('courses', courses);
      expect(courses.length).toBe(12, 'courses should be 12');
      const course = courses.find(_course => _course.id === 12);
      expect(course.titles.description).toBe('Angular Testing Course');
    });
    const req = httpTestingController.expectOne('/api/courses');
    expect(req.request.method).toEqual('GET');
    req.flush({payload: Object.values(COURSES)});
  });
  it('find Course By Id', () => {
    coursesService.findCourseById(12).subscribe(course => {
      expect(course).toBeTruthy('course should be truthy');
      console.log('course', course);
      expect(course.id).toBe(12);
    });
    const req = httpTestingController.expectOne('/api/courses/12');
    expect(req.request.method).toEqual('GET');
    req.flush(COURSES[12]);
  });
  it('save Course', () => {
    const changes: Partial<Course> = {titles: {description: 'ciao'}};
    coursesService.saveCourse(12, changes).subscribe(course => {
      expect(course).toBeTruthy('course should be truthy');
      console.log('course', course);
      expect(course.id).toBe(12);
      expect(course.titles.description).toBe('ciao');
    });
    const req = httpTestingController.expectOne('/api/courses/12');
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body.titles.description).toEqual(changes.titles.description);
    req.flush({...COURSES[12], ...changes});
  });
  it('should give an error if save course fails', () => {
    const changes: Partial<Course> = {titles: {description: 'ciao'}};
    coursesService.saveCourse(12, changes).subscribe(
      course => fail('the save course should have failed'),
      (err: HttpErrorResponse) => expect(err.status).toBe(500)
    );
    const req = httpTestingController.expectOne('/api/courses/12');
    expect(req.request.method).toEqual('PUT');
    req.flush('Save course fail', {status: 500, statusText: 'error'});
  });
  it('find lessons', () => {
    coursesService.findLessons(12, '', 'asc', 0, 3).subscribe(lessons => {
      expect(lessons).toBeTruthy('lessons should be truthy');
      console.log('lessons', lessons);
      expect(lessons.length).toBe(3, 'lessons should be 3');
    });
    const req = httpTestingController.expectOne(_req => _req.url === '/api/lessons');
    expect(req.request.method).toEqual('GET');
    expect(req.request.params.get('courseId')).toEqual('12');
    expect(req.request.params.get('sortOrder')).toEqual('asc');
    expect(req.request.params.get('pageNumber')).toEqual('0');
    expect(req.request.params.get('pageSize')).toEqual('3');
    req.flush({payload: findLessonsForCourse(12).slice(0, 3)});
  });
  afterEach(() => {
    httpTestingController.verify();
  });
});
