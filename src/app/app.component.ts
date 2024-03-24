import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistationComponent } from "./registation/registation.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, RegistationComponent]
})
export class AppComponent {
  title = 'RegistrationForm';
}
