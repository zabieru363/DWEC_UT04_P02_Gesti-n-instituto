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

    /**
     * Getter que permite obtener la propiedad name.
     */
    get name() {
        return this.#name;
    }

    /**
     * Hacemos que el nombre se pueda cambiar.
     */
    set name(value) {
        this.#name = value;
    }

    /**
     * Getter que permite obtener la propiedad dni.
     */
    get dni() {
        return this.#dni;
    }

    /**
     * Método que imprime el objeto en formato cadena.
     * @returns Una cadena con los datos de la persona.
     */
    toString() {
        return this.#dni + ": " + this.#name + " " + this.#birth;
    }
}
// Hacemos que los getters sean enumerables.
Object.defineProperty(Person.prototype, "name", {enumerable: true});
Object.defineProperty(Person.prototype, "dni", {enumerable: true});

/**
 * Clase Student que hereda de Person que permite crear estudiantes.
 * @author Javier López
 * @version 1.0
 */
class Student extends Person {
    // Campos privados:
    #name;
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

        this.#name = name;
        this.#degree = degree;
        this.#grade = grade;
    }

    /**
     * Getter que permite recuperar la propiedad degree.
     */
    get degree() {
        return this.#degree;
    }

    /**
     * Setter que permite establecer un nuevo valor para degree.
     */
    set degree(value) {
        if(value !== "bachelor" && value !== "vocacional" && value !== "others") 
            throw new InvalidDegreeException();
        
        this.#degree = value;
    }

    /**
     * Getter que permite recuperar la propiedad grade.
     */
    get grade() {
        return this.#grade;
    }

    /**
     * Setter que permite establecer un nuevo valor para grade.
     */
    set grade(value) {
        value = Math.trunc(Number.parseFloat(value));
        if(!value || value <= 0 || Number.isNaN(value))
            throw new EmptyValueException(value);
        
        if(value <= 0 || value > 10) throw InvalidGradeException();

        this.#grade = value;
    }

    /**
     * Imprime un objeto estudiante en formato cadena.
     * @returns Una cadena con los datos del objeto estudiante.
     */
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
 * @author Javier López
 * @version 1.0
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

    doApplication(student) {
        if(!(student instanceof Student)) throw new StudentException();

        // Comprobando que el estudiante está en el curso:
        const registered = this.#allStudents.some(elem => elem.dni === student.dni);
        if(registered) throw new RegisteredStudentException();

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

/**
 * Clase HighSchool que representa el objeto principal de
 * la aplicación. Este es un objeto único ya que implementa
 * el patrón Singleton.
 * @author Javier López
 * @version 1.0
 */
class HighSchool {
    // Campos privados:
    #name;
    #courses = [];
    constructor(name) {
        if(!HighSchool.instance) {  // Si la instancia no existe.
            HighSchool.instance = this; // Construimos el objeto.
            this.#name = name;
        }

        return HighSchool.instance; // Si ya existe simplemente lo devolvemos.
    }

    static getInstance() {
        return new HighSchool();
    }

    addCourse(course) {
        // Comprobamos si el curso no está registrado.
        const registered = this.#courses.some(elem => elem.name === course.name);
        if(registered) throw new CourseExistsException();

        this.#courses.push(course);
    }

    removeCourse(course) {
        // Comprobamos si el curso no está registrado.
        const pos = this.#courses.findIndex(elem => elem.name === course.name);
        if(pos === -1) throw new NotRegisteredCourseException();

        this.#courses.splice(pos, 1);
    }

    courses() {
        let array = this.#courses;

        // Devolvemos un objeto iterable:
        return {
            [Symbol.iterator]() {
                let nextIndex = 0;

                return {
                    next: function() {
                        return nextIndex < array.length ?
                            { value: array[nextIndex++].name, done: false } :
                            { done: true };
                    }
                }
            }
        }
        // for(const course of this.#courses) {
        //     yield course.name;
        // }
    }
}