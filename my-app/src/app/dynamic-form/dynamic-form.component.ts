import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControlService } from '../form-control.service'

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [ FormControlService ]
})
export class DynamicFormComponent implements OnChanges {
  @Input() obj: any;
  @Input() form: FormGroup;
  @Input() isReset: boolean;
 
  constructor() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if ('isReset' in changes && this.isReset) {
      this.form.reset();
      this.isReset = false;
    }
  }
}
