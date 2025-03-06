import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingPanelLeftComponent } from './voting-panel-left.component';

describe('VotingPanelLeftComponent', () => {
  let component: VotingPanelLeftComponent;
  let fixture: ComponentFixture<VotingPanelLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotingPanelLeftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotingPanelLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
