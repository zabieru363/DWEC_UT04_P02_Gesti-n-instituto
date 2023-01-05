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
}

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

    /**
     * Método estático que devuelve la instancia única del objeto.
     * @returns La instancia del objeto.
     */
    static getInstance() {
        return new HighSchool();
    }

    /**
     * Añade un curso al instituto. Si está registrado genera
     * una excepción.
     * @param {*} course El curso a añadir al instituto.
     */
    addCourse(course) {
        // Comprobamos si el curso no está registrado.
        const registered = this.#courses.some(elem => elem.name === course.name);
        if(registered) throw new CourseExistsException();

        this.#courses.push(course);
    }

    /**
     * Elimina un curso del instituto. Si no está registrado
     * genera una excepción.
     * @param {*} course El curso a eliminar.
     */
    removeCourse(course) {
        // Comprobamos si el curso no está registrado.
        const pos = this.#courses.findIndex(elem => elem.name === course.name);
        if(pos === -1) throw new NotRegisteredCourseException();

        this.#courses.splice(pos, 1);
    }

    /**
     * Método que devuelve un iterador con todos los cursos.
     * @returns Un objeto iterable que permite recuperar todos los cursos.
     */
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

        // Esta es la forma de hacerlo con un generador.
        // for(const course of this.#courses) {
        //     yield course.name;
        // }
    }
}