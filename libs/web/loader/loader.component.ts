import { Component, HostBinding } from '@angular/core';
import { LoaderService } from '@ServiciosLogica';
@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  textoLoader: String = 'Cargando...';
  mostrar: boolean | null;
  @HostBinding('class') claseRaiz: string = '';
  constructor(private loaderService: LoaderService) {
    this.mostrar = false;
    this.loaderService.$muestraLoader.subscribe(res => {
      this.mostrar = res;
      if (this.mostrar) {
        this.claseRaiz = 'mostrar-loader';
      } else {
        this.claseRaiz = 'ocultar-loader';
      }
    });
  }

}