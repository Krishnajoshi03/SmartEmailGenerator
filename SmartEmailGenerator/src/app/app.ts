import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmailReplyGeneratorComponent } from './email-reply-generator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EmailReplyGeneratorComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'dragon';
}
