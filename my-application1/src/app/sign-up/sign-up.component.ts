import { Component, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  title = 'Register'
  // userDetails: RegisterDetails[] = [];

  matchPassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    let password = control.get('password');
    let confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password?.value != confirmPassword?.value) {
      return {
        passwordmatcherror: true
      }
    }
    return null;
  }

  //using reactive from in register form
  registerForm: FormGroup = new FormGroup({
    //creating empty control 
    username: new FormControl('', [Validators.minLength(4), Validators.required]),
    //we can also create it by giving 1st parameter as null 
    email: new FormControl('', [Validators.email, Validators.required]),
    phone: new FormControl(undefined, [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
    password: new FormControl('', [Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/), Validators.required]),//we can also use patterns to validate 
    confirmPassword: new FormControl('', [Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/), Validators.required])
  }
    , {
      validators: this.matchPassword
    }
  )

  constructor(private userService: UserService) { }

  registerUser() {
    const user = this.registerForm.value;
    this.userService.addUser(user)
    console.log(user);
  }

  updateBtn() {
    this.registerForm.patchValue({
      confirmPassword: "Bharath@1",
      email: "habsdh@gmail.com",
      password: "Bharath@1",
      phone: "8976546789",
      username: "Bharath"
    })
  }

}
