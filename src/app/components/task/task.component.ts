import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  protected collaborators!: FormArray // define an array to hold the collaborators

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

  protected addCollaborator() {
    // Create the collaborator FormGroup and add it to the array
    this.collaborators.push(this.createCollaborator())
  }

  protected isCtrlValid(attr: string) : boolean {
    return !!this.form.get(attr)?.valid
  }

  protected invalid() : boolean {
    return !this.form.valid && !this.collaborators.valid
  }
  
  protected updateUrgency(event: any) {
    this.urgency = event.target.value; // Should parseInt here
  }
  
  private createForm(): FormGroup {
    this.collaborators = this.fb.array([]) //Everytime we create the form, we recreate the collaborators array
    // NOTE: Cannot just add validator here to check for min length of array. Does not check if the collaborator inside is valid. 
    // Need to define another method to check for all validation. See invalid().
    return this.fb.group({
      taskName: this.fb.control<string>('', [Validators.required, Validators.minLength(3)]), // inside is initial value
      priority: this.fb.control<string>('2'),
      date: this.fb.control<string>('', [Validators.required]),
      urgency: this.fb.control<number>(3),
      comments: this.fb.control<string>(''),
      procrastinate: this.fb.control<boolean>(false),
      collaborators: this.collaborators
    })
  }

  private createCollaborator(): FormGroup {
    return this.fb.group({
      name: this.fb.control<string>(''),
      email: this.fb.control<string>('', [Validators.required])
    })
  }

  protected removeCollaborator(idx: number) {
    this.collaborators.removeAt(idx);
  }
}
