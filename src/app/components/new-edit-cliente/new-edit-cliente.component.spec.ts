import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditClienteComponent } from './new-edit-cliente.component';

describe('NewEditClienteComponent', () => {
  let component: NewEditClienteComponent;
  let fixture: ComponentFixture<NewEditClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewEditClienteComponent]
    });
    fixture = TestBed.createComponent(NewEditClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
