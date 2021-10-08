import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControlService } from '../form-control.service';

@Component({
  selector: 'app-form-wrapper',
  templateUrl: './form-wrapper.component.html',
  styleUrls: ['./form-wrapper.component.scss']
})
export class FormWrapperComponent implements OnInit {

  @Input() isReset: boolean;
  @Input() objects: any;
  form!: FormGroup;
  payLoad = '';

  @Output() public formData: EventEmitter<any[]> = new EventEmitter<any[]>();

  constructor(private formControlService: FormControlService) { }

  ngOnInit() {
    this.form = this.formControlService.toFormGroup(this.objects as any);
    console.log(this.objects)
    console.log(this.form)
    this.form.valueChanges.subscribe((val) => {
      this.formData.emit(this.form.getRawValue());
    });
  }

}
