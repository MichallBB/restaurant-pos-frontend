import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private readonly authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

        const token = this.authService.getToken();
        if(token){
            const cloned = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + token)
            });

            return next.handle(cloned).pipe(
                catchError((error: HttpErrorResponse) => {
                    if(error.status === 401 || error.status === 403){
                        this.authService.logout();
                    }
                    throw error;
                })
            );
        } else {
            return next.handle(req);
        }
    }
}


export const noopInterceptorProvider: Provider =
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true };