import { TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {
  ConfigurationService,
  FirebaseAppService,
  NotificationService,
  RouterService,
  ThemeService,
} from './core';

describe('AppComponent', () => {
  let routerServiceSpy: jasmine.SpyObj<RouterService>;
  let themeServiceSpy: jasmine.SpyObj<ThemeService>;
  let firebaseAppServiceSpy: jasmine.SpyObj<FirebaseAppService>;
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;
  let configurationServiceSpy: jasmine.SpyObj<ConfigurationService>;

  beforeEach(async () => {
    routerServiceSpy = jasmine.createSpyObj('RouterService', ['initialize']);
    themeServiceSpy = jasmine.createSpyObj('ThemeService', ['initialize']);
    firebaseAppServiceSpy = jasmine.createSpyObj('FirebaseAppService', [
      'initialize',
    ]);
    notificationServiceSpy = jasmine.createSpyObj('NotificationService', [
      'initialize',
    ]);
    configurationServiceSpy = jasmine.createSpyObj('ConfigurationService', [
      'initialize',
    ]);

    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule],
      providers: [
        { provide: RouterService, useValue: routerServiceSpy },
        { provide: ThemeService, useValue: themeServiceSpy },
        { provide: FirebaseAppService, useValue: firebaseAppServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy },
        { provide: ConfigurationService, useValue: configurationServiceSpy },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
