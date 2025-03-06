import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingFooterComponent } from './voting-footer.component';

describe('VotingFooterComponent', () => {
  let component: VotingFooterComponent;
  let fixture: ComponentFixture<VotingFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotingFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotingFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
