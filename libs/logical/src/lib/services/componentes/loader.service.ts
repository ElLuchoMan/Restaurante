import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class LoaderService {
    mostrar = false;
    private muestraLoader = new BehaviorSubject<boolean | null>(null);
    $muestraLoader = this.muestraLoader.asObservable();
    setMuestraCargando(muestraLoader: boolean) {
        this.muestraLoader.next(muestraLoader);
    }
}