import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHeart, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {

  faShoppingBag = faShoppingBag;
  faHeart = faHeart;
  hasLoggedIn: boolean;
  destroy$ = new Subject<boolean>();

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.getHasLoggedIn().pipe(
      takeUntil(this.destroy$)
    ).subscribe(hasLogged => this.hasLoggedIn = hasLogged);
  }
  onLogOut(): void {
    this.authService.logOut();
    this.router.navigate(['']);
  }
  onRedirect(path: string): void {
    this.router.navigate([path]);
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
