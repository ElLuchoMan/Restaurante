import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderService, SesionService } from '@ServiciosLogica';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
@Injectable({
    providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
    numeroPeticiones = 0;
    constructor(
        private sesionService: SesionService,
        private loaderService: LoaderService
    ) {
    }
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        this.numeroPeticiones++;
        this.loaderService.setMuestraCargando(true);
        const token = this.sesionService.recuperaToken();
        if (this.sesionService.expirado() || !token) {
            this.loaderService.setMuestraCargando(true);
            return next.handle(req);
        } else {
            const authRquest = req.clone({
                setHeaders: {
                    Authorization: token || '',
                },
            });
            return next.handle(authRquest).pipe(
                tap(
                    (event) => {
                        if (event instanceof HttpResponse) {
                            console.log('event--->>>', event);
                        }
                    },
                    (error: HttpErrorResponse) => {
                        this.loaderService.setMuestraCargando(false);
                    }
                ),
                finalize(
                    () => {
                        this.numeroPeticiones--;
                        if (this.numeroPeticiones == 0) {
                            this.loaderService.setMuestraCargando(false);
                        }
                    }
                )
            );
        }
    }
}