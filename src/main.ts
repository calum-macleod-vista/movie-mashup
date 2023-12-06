import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [provideAnimations(), importProvidersFrom(HttpClientModule)] // Add HttpClientModule to providers
})
  .catch((err) => console.error(err));
