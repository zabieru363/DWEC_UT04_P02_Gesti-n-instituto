"use strict";

/**
 * Clase abstracta Person que permite crear objetos de tipo persona.
 * @author Javier López
 * @version 1.0
 */
class Person {
    // Campos privados:
    #name;
    #dni;
    #birth;
    constructor(name, dni, birth) {
        // Hacer que la clase sea abstracta:
        if(new.target === Person) throw new AbstractClassException("Person");

        // Validación de campos de la clase:
        if(!name) throw new EmptyValueException();
        if(!dni) throw new EmptyValueException();
        if(!birth) throw new EmptyValueException();

        // Controlando que el dni sea válido:
        if(!/\d{8}[A-Z]/.test(dni)) throw InvalidDNIException();

        this.#name = name;
        this.#dni = dni;
        this.#birth = birth;
    }

    set name(value) {   // Hacemos que el nombre se pueda cambiar.
        this.#name = value;
    }

    // Métodos del objeto:
    toString() {
        return this.#dni + ": " + this.#name + " " + this.#birth;
    }
}
Object.defineProperty(Person.prototype, "name", {enumerable: true});    // Hacemos que el setter sea enumerable.

/**
 * Clase Student que hereda de Person que permite crear estudiantes.
 */
class Student extends Person {
    // Campos privados:
    #degree;
    #grade;
    constructor(name, dni, birth, degree, grade) {
        super(name, dni, birth);    // Llamamos al superconstructor.

        // El constructor se debe de invocar con new:
        if(!new.target) throw new InvalidAccessConstructorException();

        // Validación de campos:
        if(degree !== "bachelor" && degree !== "vocacional" && degree !== "others")
            throw new InvalidDegreeException();
        
        grade = Math.trunc(Number.parseFloat(grade)); // Convertimos la nota media a number.
        if(!grade || grade <= 0 || Number.isNaN(grade))
            throw new EmptyValueException(grade);

        if(grade <= 0 || grade > 10) throw InvalidGradeException();

        this.#degree = degree;
        this.#grade = grade;
    }

    set degree(value) {
        if(value !== "bachelor" && value !== "vocacional" && value !== "others") 
            throw new InvalidDegreeException();
        
        this.#degree = value;
    }

    set grade(value) {
        value = Math.trunc(Number.parseFloat(value));
        if(!value || value <= 0 || Number.isNaN(value))
            throw new EmptyValueException(value);
        
        if(value <= 0 || value > 10) throw InvalidGradeException();

        this.#grade = value;
    }

    toString() {
        return super.toString() 
        + " Modalidad de estudios: " + this.#degree
        + " Nota media: " + this.#grade;
    }
}
// Hacemos que estas propiedades sean enumerables.
Object.defineProperty(Student.prototype, "degree", {enumerable: true});
Object.defineProperty(Student.prototype, "grade", {enumerable: true});

/**
 * Clase Professor que hereda de Person. Es una clase sin
 * funcionalidad nueva ya que obtiene todo lo que necesita
 * de Person.
 */
class Professor extends Person {
    constructor(name, dni, birth) {
        super(name, dni, birth);    // Llamamos al superconstructor.
    }
}

/**
 * Clase Course que permite crear cursos en los que los
 * estudiantes se pueden matricular.
 * @author Javier López
 * @version 1.0
 */
class Course {
    // Campos privados:
    #name;
    #students;
    #tutor;
    // Listas para encuadrar a alumnos:
    #bachelorStudents = [];
    #vocacionalStudents = [];
    #others = [];
    #allStudents = [];  // Colección para guardar todos los estudiantes preinscritos.

    constructor(name, students, tutor) {
        // Validación de campos:
        if(!name) throw new EmptyValueException(name);
        if(!students) throw new EmptyValueException(students);
        if(!tutor) throw new EmptyValueException(tutor);

        // Comprobando que tutor sea un profesor:
        if(!(tutor instanceof Professor)) throw new TutorException();
        
        this.#name = name;
        this.#students = students;
        this.#tutor = tutor;
    }

    /**
     * Necesitamos hacer esta propiedad accesible ya que se
     * utiliza en el método addCourse del objeto HighSchool.
     */
    get name() {
        return this.#name;
    }

    /**
     * Getter para obtener el nombre del tutor.
     */
    get tutor() {
        return this.#tutor.name;
    }

    /**
     * Setter para cambiar el tutor.
     */
    set tutor(value) {
        if(!(value instanceof Professor)) throw new TutorException();
        this.#tutor = value;
    }

    /**
     * Método privado que permite ordenar una colección de estudiantes
     * por el campo de la nota.
     * @param {*} array La colección a ordenar.
     */
    #sortStudents(array) {
        array.sort((b, a) => a.grade - b.grade);
    }

    /**
     * Recibe la aplicación de un alumno para el curso. El
     * alumno quedará encuadrado en una lista en
     * función de sus estudios previos y ordenado por la nota.
     * El alumno no puede estar preinscrito en el curso
     * previamente. En caso de estarlo el método lanzará
     * una excepción.
     * @param {*} student El estudiante a matricular en el curso.
     */
    doApplication(student) {
        if(!(student instanceof Student)) throw new StudentException();

        // Comprobando que el estudiante está en el curso:
        const registered = this.#allStudents.some(elem => elem.dni === student.dni);
        if(registered) throw new RegisteredStudentException();

        // También hay que controlar si el curso está lleno y no puede admitir más alumnos.
        if(this.#allStudents.length === this.#students) throw new CourseIsFullException();
        this.#allStudents.push(student);

        switch(student.degree) {
          case "bachelor":
            this.#bachelorStudents.push(student);
            this.#sortStudents(this.#bachelorStudents);
            break;
          case "vocacional":
            this.#vocacionalStudents.push(student);
            this.#sortStudents(this.#vocacionalStudents);
            break;
          case "others":
            this.#others.push(student);
            this.#sortStudents(this.#others);
            break;
        }
    }

    /**
     * Muestra los alumnos admitidos de un curso.
     * @returns Un objeto iterable que permite recuperar los alumnos admitidos de un curso.
     */
    admittedStudents() {
        // 40% de los alumnos de bachillerato.
        const bachelorStudentsLength = this.#students * 40 / 100;
        // 40% de los alumnos de grado medio o superior.
        const vocacionalStudentsLength = this.#students * 40 / 100;
        // 20% de los alumnos con otro tipo de modalidad de estudios.
        const othersStudentsLength = this.#students * 20 / 100;

        const list1 = new List(this.#bachelorStudents.filter(student => student.grade >= 5), bachelorStudentsLength);   // Almacena los alumnos admitidos de bachillerato.
        const list2 = new List(this.#vocacionalStudents.filter(student => student.grade >= 5), vocacionalStudentsLength);   // Almacena los alumnos admitidos de vocacional.
        const list3 = new List(this.#others.filter(student => student.grade >= 5), othersStudentsLength);   // Almacena los alumnos admitidos de others.

        const admittedStudents = [];    // Aquí utilizo un array porque es el objeto iterable.

        for(let i = 0; i < list1.capacity(); i++) admittedStudents.push(list1.get(i)); // Añadimos todos los alumnos admitidos de bachillerato.
        for(let i = 0; i < list2.capacity(); i++) admittedStudents.push(list2.get(i)); // Añadimos todos los alumnos admitidos de vocacional.
        for(let i = 0; i < list3.capacity(); i++) admittedStudents.push(list3.get(i)); // Añadimos todos los alumnos admitidos de others.

        // Ahora devolvemos un objeto iterable que permita recuperar los alumnos admitidos:
        return {
            [Symbol.iterator]() {
                let nextIndex = 0;

                return {
                    next: function() {
                        return nextIndex < admittedStudents.length ?
                            { value: admittedStudents[nextIndex++], done: false } :
                            { done: true };
                    }
                }
            }
        }
    }

    // Hacemos accesibles las listas para probar que se añaden donde deberian.

    get bachelorStudents() {
        return this.#bachelorStudents;
    }

    get vocacionalStudents() {
        return this.#vocacionalStudents;
    }

    get others() {
        return this.#others;
    }
}
Object.defineProperty(Course.prototype, "name", {enumerable: true});