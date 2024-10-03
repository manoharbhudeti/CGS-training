import { Component } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent {
  
  userName: string = '';
  email: string = '';

  constructor() {}

  onSubmit() {
    console.log('Form submitted with:', { userName: this.userName, email: this.email });
  }

  loadFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      console.log('File selected:', file.name);
    }
  }
}
