import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userDetails!: FormGroup;
  userCredentials!: FormGroup;
  stepperStatus1: boolean = false;
  stepperStatus2: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.userDetails = this.fb.group({
      name: ['', Validators.required],
      age: [undefined, Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: [undefined, Validators.required],
    });

    this.userCredentials = this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        // validators: this.passwordValidator(),
        validator: this.matchPassword,
      }
    );
  }

  matchPassword: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    let password = control.get('password');
    let confirmPassword = control.get('confirmPassword');
    return password?.value === confirmPassword?.value
      ? null
      : { passwordNotMatch: true };
  };

  getUserDetails() {
    this.stepperStatus1 = !this.stepperStatus1;
    console.log(this.stepperStatus1);
    return this.userDetails.value;
  }
  getUserCredentials() {
    this.stepperStatus1 = !this.stepperStatus1;
    return this.userCredentials.value;
  }

  userRegisteration() {
    let user = { ...this.getUserDetails(), ...this.getUserCredentials() };
    console.log(user);
    return this.userService.createUser(user).subscribe(
      (user) => {
        user;
        this.snackBar.toastMessage(
          'Register sucessful ,login to continue',
          'OK'
        );
        this.userDetails.reset();
        this.userCredentials.reset();
        this.router.navigate(['./login']);
      },
      (error) => {
        this.snackBar.toastMessage(error, 'OK');
      }
    );
  }
}
