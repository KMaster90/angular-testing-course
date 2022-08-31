import {fakeAsync, flush, flushMicrotasks, tick, waitForAsync} from '@angular/core/testing';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';

describe('Async Testing Examples', () => {

  it('Asyncronous text example with Jasmine done', (done) => {
    let test = false;
    setTimeout(() => {
      console.log('running assertions');
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1000);
  });
  it('Asyncronous text example - setTimeout()', fakeAsync(() => {
    let test = false;
    setTimeout(() => console.log('running assertions 2'), 500);
    setTimeout(() => {
      console.log('running assertions');
      test = true;
      expect(test).toBeTruthy();
    }, 1000);
    // tick(1000); // move the clock forward by 1000ms
    flush(); // flush all the async calls
    expect(test).toBeTruthy();
  }));
  it('Asyncronous text example - plain Promise', fakeAsync(() => {
    let test = false;
    console.log('Creating Promise');
    // setTimeout(() => console.log('set timeout'));
    // setTimeout(() => console.log('set timeout 2'));

    Promise.resolve().then(() => {
      console.log('Promise evaluated successfully');
      return Promise.resolve();
    }).then(() => {
      console.log('Promise evaluated successfully 2');
      test = true;
      expect(test).toBeTruthy('Inside');
    });
    console.log('Running test assertions');
    // tick();
    // flush();
    flushMicrotasks();
    expect(test).toBeTruthy('Outside');
  }));
  it('Asyncronous text example - Promise + setTimeout()', fakeAsync(() => {
    let counter = 0;
    console.log('Creating Promise');

    Promise.resolve().then(() => {
      console.log('Promise evaluated successfully');
      counter += 10;
      setTimeout(() => {
        console.log('set timeout');
        counter += 1;
      }, 1000);
    });
    console.log('Running test assertions');
    expect(counter).toBe(0, 'Outside');
    flushMicrotasks();
    expect(counter).toBe(10, 'Outside');
    tick(500);
    expect(counter).toBe(10, 'Outside');
    flush(); // or tick other 500ms to reach 100ms
    expect(counter).toBe(11, 'Outside');
  }));
  it('Asyncronous text example - Observable', fakeAsync(() => {
    let test = false;
    console.log('Creating Observable');
    const test$ = of(test).pipe(delay(1000));
    test$.subscribe(() => {
      console.log('Observable evaluated successfully');
      test = true;
    });
    tick(1000);
    console.log('Running test assertions');
    expect(test).toBeTruthy();

  }));
});
