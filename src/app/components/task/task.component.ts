import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../models';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  urgency = 3;

  private fb = inject(FormBuilder)

  // Form model
  // Generally, the top-level form is a form group
  protected form!: FormGroup

  ngOnInit(): void {
    console.info("In ngOnInit")
    this.form = this.createForm()
  }

  protected processForm(): void {
    const values: Task = this.form.value // Variable names must be the same, else need to set manually by creating 

    // const formValue = this.form.value
    // const values2 :Task = {
    //   ...formValue, //Quick way to do deep copy
    //   priority: parseInt(formValue.priority) + 1
    // }

    
    console.info("form: ", values)
  }

  protected isCtrlValid(attr: string) : boolean {
    return !!this.form.get(attr)?.valid
  }
  
  protected updateUrgency(event: any) {
    this.urgency = event.target.value; // Should parseInt here
  }
  
  private createForm(): FormGroup {
    return this.fb.group({
      taskName: this.fb.control<string>('', [Validators.required, Validators.minLength(3)]), // inside is initial value
      priority: this.fb.control<string>('2'),
      date: this.fb.control<string>('', [Validators.required]),
      urgency: this.fb.control<number>(3),
      comments: this.fb.control<string>(''),
      procrastinate: this.fb.control<boolean>(false)
    })
  }
}
