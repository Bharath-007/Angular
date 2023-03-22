import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Register } from 'src/app/components/interface/register';
import { UserService } from 'src/app/service/user.service';

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

  user!: Register;
  registeredStatus: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userDetails = this.fb.group({
      Name: ['', Validators.required],
      Age: [undefined, Validators.required],
      City: ['', Validators.required],
      State: ['', Validators.required],
      Pincode: [undefined, Validators.required],
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

  passwordValidator() {
    return (formGroup: FormGroup) => {
      let password = formGroup.controls['password'];
      let confirmPassword = formGroup.controls['confirmPassword'];
      // console.log(password, confirmPassword);
      // console.log(password?.value === confirmPassword?.value);
      console.log(password.value);
      console.log(confirmPassword.value);

      return password?.value !== confirmPassword?.value
        ? confirmPassword?.setErrors({ passwordNotMatch: true })
        : '';
    };
  } //this won't working for this version

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
    this.user = { ...this.getUserDetails(), ...this.getUserCredentials() };
    if (this.user) {
      this.registeredStatus = true;
      this.userService.registerUser(this.user);
      this.snackbar.open('Registered Successfully');
      this.router.navigate(['./auth/login']);
    } else {
      this.registeredStatus = false;
      this.snackbar.open(
        'Registeration unsuccessfull! try again after some time'
      );
      this.router.navigate(['./auth/register']);
    }
  }
}
