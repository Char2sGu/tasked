import {
  Component,
  EventEmitter,
  HostBinding,
  OnInit,
  Output,
} from '@angular/core';

import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @HostBinding('class') class = 'flex grow items-center';
  @Output() menuToggle = new EventEmitter();
  theme$ = this.themeService.current.value$$;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {}
}
