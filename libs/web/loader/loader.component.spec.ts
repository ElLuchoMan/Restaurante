import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoaderComponent } from './loader.component';
import { SesionService } from '@ServiciosLogica';
describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let service: SesionService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [SesionService],
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule],
    }).compileComponents();
    service = TestBed.get(SesionService);
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('-Se crea el componente', () => {
    expect(component).toBeTruthy();
  });
});