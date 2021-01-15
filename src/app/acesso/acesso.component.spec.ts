import { ComponentFixture, TestBed } from '@angular/core/testing';

import { acessoComponent } from './acesso.component';

describe('acessoComponent', () => {
  let component: acessoComponent;
  let fixture: ComponentFixture<acessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ acessoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(acessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
