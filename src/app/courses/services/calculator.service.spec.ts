import {CalculatorService} from './calculator.service';
import {LoggerService} from './logger.service';
import {TestBed} from '@angular/core/testing';

describe('CalculatorService', () => {
  let loggerSpy: jasmine.SpyObj<LoggerService>;
  let calculator: CalculatorService;
  beforeEach(() => {
    console.log('beforeEach');
    // logger = new LoggerService();
    // spyOn(logger, 'log');
    loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {provide: LoggerService, useValue: loggerSpy}
      ]
    });

    calculator = TestBed.inject(CalculatorService);

  });

  it('should add two numbers', () => {
    console.log('add');
    const result = calculator.add(1, 2);
    expect(result).toBe(3, '1 + 2 should be 3');
    expect(loggerSpy.log).withContext('logger_called').toHaveBeenCalledTimes(1);
  });
  it('should subtract two numbers', () => {
    console.log('sub');
    const result = calculator.subtract(1, 2);
    expect(result).toBe(-1, '1 - 2 should be -1');
    expect(loggerSpy.log).withContext('logger_called').toHaveBeenCalledTimes(1);

  });

});

