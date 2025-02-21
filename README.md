# CSF_32L

# Notes

## Different ways to do ngClass
1. `[ngClass]="{'valid': form.get('taskName')?.valid, 'invalid':form.get('taskName')?.invalid}"`
2. `[ngClass]="isCtrlValid('date') ? 'valid' : 'invalid'"` 
    - Only works for one class?
3. Use variables: `[ngClass]="{'red': !lesson.isComplete, 'black': lesson.isComplete }"`

## Truthy or falsey
If a string is empty or null, it will be treated as false. Essentially how Python treats objects/classes as T/F.

With reference to the TaskComponent `isCtrlValid()` method, the `.get()` method returns either an `any` type or `null`. And `.valid` returns boolean or undefined. 

By placing `!!` in front, it converts the values into a boolean, that can be returned and used. 

# Questions
- [ ] FormControl
- [ ] FormGroup
- [ ] Validators in typescript
- [ ] Is there an easier way to do classes for valid/invalid fields? Can we do an if-else, rather than manually check each property (whether valid or invalid)? 
