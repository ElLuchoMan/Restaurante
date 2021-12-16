import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { LoaderService } from './loader.service';
describe('LoaderService', () => {
    let service: LoaderService;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LoaderService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    const muestraLoader = new BehaviorSubject<boolean | null>(null);
    it('Muestra cargando', () => {
        expect(service.setMuestraCargando(true)).toBe(muestraLoader);
        expect(service.setMuestraCargando(false)).toBe(!muestraLoader);
    })
});
