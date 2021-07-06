# Fundment Code Test

## Coding test specs

This Gitlab project includes Bootstrap and FontAwesome dependencies.  
The aim of this task is to demonstrate the ability to create forms that produce complex data structures, where properties of those objects are dependent on values of other properties. Additional forms should be dynamically produced specific to other object types.

- Display an array of DataTypeOne objects in a table using the TestDataService.
- Add functionality to add and edit DataTypeOne, using a reactive form.
- Create DataTypeTwo, DataTypeThree, ..., DataTypeX as needed and add reactive forms in order to add these to the database.
- Create conditional fields within each form along with validation.
- Please use form-one.component.spec.ts to gather an idea of the conditions that should be placed upon DataTypeOne and other data structures you create.  
  E.g. depending on the value of field2, field3 and field7, field10 should be either shown or hidden. If field10 is hidden its value should not be included in the form value.
- At least one form should be “optional”, meaning the user must either fill in **all** fields or **none**.
- Demonstrate usage of RxJs with Observables. Bonus points for data manipulation in Observabe stream, delayed responses, usage of Subject, reactive integration in templates, state management libraries, or mocking of state management principles.
- Demonstrate usage of angular lifecycle hooks: ngOnInit, ngOnChanges and ngAfterViewInit.
- Please feel free to refactor any files, templates and structures according to your best judgement and revised design.
- Adding unit tests is highly recommended.

Optional:

- Include a custom validator
- Include a custom pipe
- Have a nested data structure within one form e.g. `{ field1Group: { field1: '', field2Array: [{...}] } }`.
- Style appropriately

# Information on AngularCodingTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Jest](https://jestjs.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
