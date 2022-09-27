import {Component, Input, OnInit} from '@angular/core';
import {UserInterface} from "../../interfaces/user.interface";

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss']
})
export class UserListItemComponent implements OnInit {

  @Input() user!: UserInterface;

  constructor() {
  }

  ngOnInit(): void {
  }

}
