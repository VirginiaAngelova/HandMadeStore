import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Injectable({
    providedIn: 'root'
})
export class NonAuthGuard implements CanActivate {
    constructor( private authService: AuthService,
                private router:Router){

    }
    canActivate():boolean{
        const user = this.authService.getLoggedUser();
        if(user) {
            this.router.navigate(['products']);

            return false;
        }
        return true;
    }
        
    
}