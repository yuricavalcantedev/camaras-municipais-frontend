import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingPanelRightComponent } from './voting-panel-right.component';

describe('VotingPanelRightComponent', () => {
  let component: VotingPanelRightComponent;
  let fixture: ComponentFixture<VotingPanelRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotingPanelRightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotingPanelRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
