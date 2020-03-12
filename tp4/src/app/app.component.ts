import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Note {
  title: string;
  content: string;
  isDone: boolean;
  date: Date;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private notes: Note[] = [];
  private noteForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.noteForm = this.formBuilder.group({
      title: this.formBuilder.control('', [ Validators.required ]),
      content: this.formBuilder.control('', [ Validators.required ])
    });
  }

  onSubmit() {
    if (this.noteForm.valid) {
      const values = this.noteForm.value;
      values.isDone = false;
      values.date = new Date();
      this.notes.push(values);
      this.noteForm.reset();
    }
  }

  done(index: number) {
    this.notes[index].isDone = true;
  }

  delete(index: number) {
    this.notes.splice(index, 1);
  }

  getSortedNotes(notes: Note[]) {
    return notes.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
  }
}
