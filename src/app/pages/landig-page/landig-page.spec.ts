import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandigPage } from './landig-page';

describe('LandigPage', () => {
  let component: LandigPage;
  let fixture: ComponentFixture<LandigPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandigPage],
    }).compileComponents();

    fixture = TestBed.createComponent(LandigPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
