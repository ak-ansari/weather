import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NzspinComponent } from './nzspin.component';

describe('NzspinComponent', () => {
  let component: NzspinComponent;
  let fixture: ComponentFixture<NzspinComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NzspinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzspinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
