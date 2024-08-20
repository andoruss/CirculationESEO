import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../layouts/navbar/navbar.component';
import { NgIconComponent } from '@ng-icons/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticateService } from '../../services/authenticate.service';
import { UserDTO } from '../../models/DTOs/UserDTO';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, NgIconComponent, ButtonComponent, SpinnerComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  processing = false;
  valid = true;

  constructor(private authenticateService: AuthenticateService, private router: Router){}

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  login() { 
    var userConexion: UserDTO = {
      email: this.loginForm.get('email')!.value,
      password: this.loginForm.get('password')!.value,
    };

    this.authenticateService.authentication(userConexion).subscribe((data) => {
      this.processing = true;
      if (data){ 
        localStorage.setItem('jwt', data.token);
        this.valid = true;
        this.router.navigate(['home']);
      } else {
        this.valid = false;
      }
      this.processing = false;
    });
  }

}
