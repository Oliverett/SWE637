import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { CartService } from './app/cart/cart.service';
import { ShoeService } from './app/services/shoe.service';
import { NotificationService } from './app/services/notification.service';
import { provideClientHydration } from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    provideClientHydration(),
    CartService,
    ShoeService,
    NotificationService
  ]
}).catch(err => console.error(err));