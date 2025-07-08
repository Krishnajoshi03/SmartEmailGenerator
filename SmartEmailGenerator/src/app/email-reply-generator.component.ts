import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import {CommonModule}from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-email-reply-generator',
    standalone: true,
    imports: [FormsModule, HttpClientModule, CommonModule],
    templateUrl: './email-reply-generator.component.html',
    styleUrls: ['./email-reply-generator.component.css']
})
export class EmailReplyGeneratorComponent {
    originalEmail: string = '';
    tone: string = '';
    isLoading: boolean = false;
    generatedReply: string = '';
    constructor(private http: HttpClient, private cdr: ChangeDetectorRef,private ngZone:NgZone) {}
    get isGenerateDisabled(): boolean {
        return !this.originalEmail.trim() || this.isLoading;
    }

    generateReply() {
        if (this.isGenerateDisabled) return;
        this.isLoading = true;
        this.generatedReply = '';
        this.http.post(
            'http://localhost:8080/api/email/generate',
            {
                emailContent: this.originalEmail,
                tone: this.tone
            }, { responseType: 'text' }
        ).subscribe({
            next: (data) => {
        this.generatedReply = data.toString();
        this.isLoading = false;

            },
            error: (e) => {
                this.generatedReply = 'Error generating reply.';
                this.isLoading = false;
            }
        });
    }
}
