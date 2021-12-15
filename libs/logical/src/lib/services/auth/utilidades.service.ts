import { Injectable } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Reloj } from '../../models/reloj.model';
@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {
  clock: Observable<Date>;
  infofecha$ = new Subject<Reloj>();
  ampm: string;
  horas: number;
  constructor() {
    this.clock = timer(0, 1000).pipe(map(t => new Date()), shareReplay(1));
    this.ampm = '';
    this.horas = 0;
  }
  capturaDatosUrl(parametro: string, url: string) {
    if (!url) url = window.location.href;
    parametro = parametro.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?#&]' + parametro + '(=([^&#]*)|&|#|$)'),
      resultado = regex.exec(url);
    if (!resultado) return null;
    if (!resultado[2]) return '';
    return decodeURIComponent(resultado[2].replace(/\+/g, ' '));
  }
  getInfoReloj(): Observable<Reloj> {
    this.clock.subscribe(t => {
      this.horas = t.getHours() % 12;
      this.horas = this.horas ? this.horas : 12;
      const vr:Reloj = {
        hora: this.horas,
        minutos: (t.getMinutes() < 10) ? '0' + t.getMinutes() : t.getMinutes().toString(),
        ampm: t.getHours() > 11 ? 'P.M' : 'A.M',
        diaymes: t.toLocaleString('es-MX', { day: '2-digit', month: 'numeric', year: 'numeric' }).replace('.', '').replace('-', ' '),
        segundo: t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds().toString()
      }
      this.infofecha$.next(vr);
    });
    return this.infofecha$.asObservable();
  }
}