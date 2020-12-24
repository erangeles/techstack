import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { logos } from "./data/logos.data";
import { samplePackageJson } from "./data/sampleInput.data";
import { fuzzyMatch } from "./utility/fuzzyMatch.function";
import { validateJSON } from "./validators/json.function";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styles: ["::ng-deep { div .CodeMirror.cm-s-idea { height:100%; } } "],
})
export class AppComponent implements OnInit {
  public baseCodeMirrorRules: any = {
    mode: "application/json",
    theme: "material",
    lineWrapping: true,
    foldGutter: true,
    gutters: ["CodeMirror-foldgutter"],
    autoCloseBrackets: true,
    matchBrackets: true,
  };
  public packageJsonEditor: any = {
    ...this.baseCodeMirrorRules,
    mode: "application/json",
  };
  public markDownEditor = {
    ...this.baseCodeMirrorRules,
    mode: "gfm",
  };
  public form: FormGroup;
  public techStack: string[] = [];
  public markdown: string;
  breakpoint: number;
  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  onResize(event: any) {
    this.breakpoint = event.target.innerWidth <= 400 ? 1 : 2;
  }

  ngOnInit() {
    this.breakpoint = window.innerWidth <= 400 ? 1 : 2;

    this.form = this.formBuilder.group({
      dependancies: [samplePackageJson, validateJSON],
    });
    this.extractLogos();
    this.form
      .get("dependancies")
      .valueChanges.subscribe(() => this.extractLogos());
  }

  deleteLogo(imagePath: string) {
    const index = this.techStack.indexOf(imagePath);
    if (index > -1) {
      this.techStack.splice(index, 1);
    }
    this.createMarkdown();
  }

  extractLogos() {
    if (
      !this.form.get("dependancies").value ||
      this.form.get("dependancies").invalid
    ) {
      return;
    }
    this.techStack = [];
    let s = Object.keys(
      JSON.parse(this.form.get("dependancies").value).devDependencies
    ).concat(
      Object.keys(JSON.parse(this.form.get("dependancies").value).dependencies)
    );

    logos.forEach((element: string) => {
      s.filter((d) => {
        if (fuzzyMatch(d, element) > 0.5) {
          this.techStack.push(
            `https://raw.githubusercontent.com/gilbarbara/logos/master/logos/${element}.svg`
          );
        }
      });
    });
    this.createMarkdown();
  }

  showToast() {
    this.snackBar.open("Copied to clipboard", null, {
      duration: 3000,
    });
  }

  createMarkdown() {
    this.markdown = "";
    this.markdown = '<div align="center">';
    this.techStack.forEach((element: any) => {
      this.markdown += `<img width="55" src="${element}"/>`;
    });
    this.markdown += "</div>";
  }
  clear() {
    this.form.get("dependancies").patchValue("");
  }
}
