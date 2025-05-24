import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from "@angular/common";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.settingsForm = this.fb.group({
      virustotalApiKey: ['', Validators.required],
      wantBigFiles: [false],
      maximumMbForBigFile: [
        0,
        [Validators.required, Validators.min(0), Validators.max(200)]
      ]
    });

    // Reset value to 0 when checkbox is unchecked
    this.wantBigFiles!.valueChanges.subscribe(checked => {
      if (!checked) {
        this.maximumMbForBigFile!.setValue(0);
      }
    });
  }

  get wantBigFiles() {
    return this.settingsForm.get('wantBigFiles')!;
  }

  get maximumMbForBigFile() {
    return this.settingsForm.get('maximumMbForBigFile')!;
  }

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings(): void {
    this.http.get<string[]>('http://localhost:8080/api/config').subscribe({
      next: (data) => {
        console.log(data)
        if (data && data.length === 3) {
          this.settingsForm.patchValue({
            virustotalApiKey: data[0],
            wantBigFiles: data[1] === 'true', // Convert string to boolean
            maximumMbForBigFile: parseInt(data[2], 10) // Convert string to number
          });
        }
      },
      error: (err) => {
        console.error('Failed to load settings:', err);
        this.errorMessage = "An error occurred. Is the application running?";
      }
    });
  }

  onSubmit() {
    if (this.settingsForm.invalid) {
      console.warn('Form is invalid');
      return;
    }

    const updatedConfig = [this.settingsForm.value.virustotalApiKey, this.settingsForm.value.wantBigFiles, this.settingsForm.value.maximumMbForBigFile];

    console.log('Submitted config:', updatedConfig);
    // Replace with HTTP call to save the settings
    this.http.post('http://localhost:8080/api/config', updatedConfig).subscribe({
      next: () => console.log('Settings saved successfully'),
      error: (err) => {
        console.error('Failed to save settings:', err);
        this.errorMessage = "An error occurred. Is the application running?";
      }
    });
  }

  clearError() {
    this.errorMessage = null;
  }
}
