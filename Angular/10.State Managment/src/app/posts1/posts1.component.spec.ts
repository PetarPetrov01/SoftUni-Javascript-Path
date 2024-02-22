import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Posts1Component } from './posts1.component';

describe('Posts1Component', () => {
  let component: Posts1Component;
  let fixture: ComponentFixture<Posts1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Posts1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Posts1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
