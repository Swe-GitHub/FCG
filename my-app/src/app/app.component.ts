import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
const API_URL = 'https://hfr7mf42p3.execute-api.eu-north-1.amazonaws.com/';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public travelForm: FormGroup;
  public surveyData: any;
  public dynamicFormResult: any;
  isShow: boolean;
  isReset: boolean;
  dynamicFormData: Observable<any>[];
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
  }
  public ngOnInit(): void {
    this.http.get<any>(`${API_URL}surveys`).subscribe(data => {
      this.surveyData = data.items;
      console.log(this.surveyData);
    });
    this.travelForm = this.formBuilder.group({
      formId: [null, Validators.required],
      participantName: [null, Validators.required]
    });
    this.travelForm.get('formId').valueChanges.subscribe((val) => {
      if (val) {
        this.dynamicFormData = this.surveyData.filter(item => item.id === val)[0].fields;
        if (this.isShow) {
          this.isReset = true;
        }
        this.isShow = false;
        setTimeout(() => {
          this.isShow = true;
        }, 10);
        console.log(this.dynamicFormData)
      }
    });
  }
  public getDynamicFromData(event): void {
    this.dynamicFormResult = event;
  }
  public onPost(): void {
    console.log(this.travelForm.getRawValue());
    if (this.travelForm.valid) {
      const form = this.travelForm.getRawValue()
      const request = {
        participantName: form.participantName,
        formId: form.formId,
        formData: this.dynamicFormResult
      };
      this.http.post<any>(`${API_URL}submissions`, request).subscribe({
        next: data => {
          console.log(data)
        },
        error: error => {
          console.error(error);
        }
      })

    }

  }

}
