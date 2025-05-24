import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CardModule, GridModule} from '@coreui/angular';
import {ChartjsModule} from '@coreui/angular-chartjs';
import {IconSetService} from '@coreui/icons-angular';
import {iconSubset} from '../../icons/icon-subset';
import {DashboardComponent} from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let iconSetService: IconSetService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [GridModule, CardModule, ChartjsModule, DashboardComponent],
      providers: [IconSetService]
    }).compileComponents();
  }));

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = {...iconSubset};

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
