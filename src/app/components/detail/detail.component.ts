import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {UserAdminService} from "../../core/services/user-admin.service";
import {UserInterface} from "../../interfaces/user.interface";
import {UserFormComponent} from "../user-form/user-form.component";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailComponent implements OnInit, OnDestroy {

  @ViewChild('form') form!: UserFormComponent;

  public user!: UserInterface | undefined;
  public isDetail = false;

  private subscription!: Subscription;

  constructor(private router: ActivatedRoute,
              private r: Router,
              private adminService: UserAdminService) {
  }

  ngOnInit(): void {
    this.subscription = this.router.paramMap.subscribe(data => {
      try {
        const userId = Number(data.get('id'));
        this.user = this.adminService.users.find(({id}) => id === userId);
        this.isDetail = Boolean(this.user);
      } catch (e: any) {
        console.log('Can not get user: ', e.message);
      }
    })
  }

  public create(): void {
    this.adminService.add({
      id: new Date().getMilliseconds(),
      email: this.form.form.get('email')?.value,
      description: this.form.form.get('description')?.value,
      name: this.form.form.get('name')?.value
    });
    this.form.form.reset();
  }

  public delete(): void {
    console.log('delete')
    this.adminService.delete(this.user?.id);
    this.form.form.reset();
    this.r.navigate(['']);
  }

  public update(): void {
    this.adminService.update({
      id: this.user?.id || 0,
      email: this.form.form.get('email')?.value,
      description: this.form.form.get('description')?.value,
      name: this.form.form.get('name')?.value
    });
    this.form.form.reset();
    this.r.navigate(['']);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
