import { TestBed } from '@angular/core/testing';

import { FakeValueService } from './fake-value.service';
import { MasterService } from './master.service';
import { ValueService } from './value.service';

type SpyObjValueService = jasmine.SpyObj<ValueService>;

describe('MasterService', () => {
  let masterService: MasterService;
  let valueServiceSpy: SpyObjValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MasterService,
        {
          provide: ValueService,
          useValue: jasmine.createSpyObj('ValueService', ['getValue'])
        }
      ]
    })
    masterService = TestBed.inject(MasterService);
    valueServiceSpy = TestBed.inject(ValueService) as SpyObjValueService;
  });

  it('should be create', () => {
    expect(masterService).toBeTruthy();
  });

  // it('should return "my value" from the real service', () => {
  //   const valueService = new ValueService();
  //   const masterService = new MasterService(valueService);
  //   expect(masterService.getValue()).toBe('my value');
  // });

  // it('should return "my value" from the fake service', () => {
  //   const fakeValueService = new FakeValueService();
  //   const masterService = new MasterService(fakeValueService as unknown as ValueService);
  //   expect(masterService.getValue()).toBe('fake value');
  // });

  // it('should return "my value" from the fake object', () => {
  //   const fakeObject = { getValue: () => 'fake value' };
  //   const masterService = new MasterService(fakeObject as ValueService);
  //   expect(masterService.getValue()).toBe('fake value');
  // });

  it('should call to getValue from ValueService', () => {
    valueServiceSpy.getValue.and.returnValue('fake value');
    expect(masterService.getValue()).toBe('fake value');
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  });
});
