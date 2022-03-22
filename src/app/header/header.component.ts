import { Component, OnInit } from '@angular/core';
import { DEFAULT_AVATAR } from '../common/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  DEFAULT_AVATAR = DEFAULT_AVATAR;
  constructor() { }

  ngOnInit(): void {
  }

}
