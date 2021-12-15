import { Injectable } from "@angular/core";
import jwt_decode from "jwt-decode";
import { UtilidadesService } from "./utilidades.service";
@Injectable({
    providedIn: 'root',
})
export class SesionService {
    constructor(private utilidadesService: UtilidadesService) { }
    //Permite almaenar el token de la ruta en LocalHost
    guardarJWT() {
        const id_token: string = this.utilidadesService.capturaDatosUrl('id_token', window.location.href) || "";
        const access_token: string = this.utilidadesService.capturaDatosUrl('access_token', window.location.href) || "";
        const expires_in: string = this.utilidadesService.capturaDatosUrl('expires_in', window.location.href) || "";
        if (id_token != "") localStorage.setItem('id_token', id_token);
        if (access_token != "") localStorage.setItem('access_token', access_token);
        if (expires_in != "") localStorage.setItem('expires_in', expires_in);
    }
    //Permite consultar el token almacenado en LocalHost
    recuperaToken() {
        return localStorage.getItem('id_token');
    }
    //Permite decodificar el token para obtener su información
    decodificarToken(token: string): string {
        try {
            return jwt_decode(token);
        } catch (error) {
            return 'No hay token';
        }
    }
    //Permite eliminar el token almacenado en LocalHost y redireccionar a la página de logout
    salida() {
        localStorage.clear();
        sessionStorage.clear();
    }
    //Permite recuperar la fecha de venciemiento del token
    recuperaVencimiento(token: string) {
        const decodificado: any = this.decodificarToken(token);
        if (!decodificado.exp) {
            return null;
        }
        const fechaVencimiento = new Date(0);
        fechaVencimiento.setUTCSeconds(decodificado.exp);
        return fechaVencimiento;
    }
    //Permite validar si el token está vencido
    expirado(token?: string): boolean {
        if (!token) token = this.recuperaToken() || '';
        if (!token) return true;
        const fechaVencimiento: any = this.recuperaVencimiento(token);
        if (fechaVencimiento === undefined) return false;
        return (fechaVencimiento.valueOf() >= new Date().valueOf());
    }
}