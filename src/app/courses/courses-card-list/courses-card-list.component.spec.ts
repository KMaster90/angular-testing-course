import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {CoursesCardListComponent} from './courses-card-list.component';
import {CoursesModule} from '../courses.module';
import {COURSES} from '../../../../server/db-data';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {sortCoursesBySeqNo} from '../home/sort-course-by-seq';
import {Course} from '../model/course';
import {setupCourses} from '../common/setup-test-data';
import {waitForAngularReady} from '@angular/cdk/testing/selenium-webdriver';
import {MatCard} from '@angular/material/card';


describe('CoursesCardListComponent', () => {
  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let el: DebugElement;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoursesModule]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(CoursesCardListComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
    });
  }));

  it('should create the component', () => expect(component).toBeTruthy());


  it('should display the course list', () => {
    component.courses = setupCourses();

    fixture.detectChanges();
    console.log(el.nativeElement);

    const cards = el.queryAll(By.css('[data-test="course-card"]'));
    expect(cards).toBeTruthy('Could not find cards');
    expect(cards.length).toBe(12, 'Unexpected number of courses cards');
  });


  it('should display the first course', () => {

    component.courses = setupCourses();
    fixture.detectChanges();
    const course = component.courses[0];
    const card = el.query(By.css('[data-test="course-card"]:nth-child(1)')),
      title = card.query(By.css('mat-card-title')).nativeElement.textContent,
      img = (<HTMLImageElement>card.query(By.css('img')).nativeElement).src;
    console.log(title);
    expect(card).toBeTruthy('Could not find first card');
    expect(title).withContext('The title is wrong').toEqual(course.titles.description);
    expect(img).withContext('The Image is wrong').toEqual(course.iconUrl);

  });


});


