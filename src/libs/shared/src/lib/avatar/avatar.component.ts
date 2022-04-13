import { Component, Input, OnInit } from '@angular/core';
import { Person } from '@tripplanner/people';
import { DEFAULT_AVATAR } from '../../../../common/src/lib/constants';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() person: Person = null;

  DEFAULT_AVATAR = DEFAULT_AVATAR;
  constructor() { }

  ngOnInit(): void {
  }

}
