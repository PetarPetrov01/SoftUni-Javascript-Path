import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

export const IsUserGuard = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.isLogged) {
    return true;
  } else {
    router.navigate(['/login'])
    return false;
  }
};
