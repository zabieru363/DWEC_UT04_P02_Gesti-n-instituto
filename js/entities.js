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
        if(!/\d{8}[A-Z]/.test("05722054E")) throw InvalidDNIException();

        this.#name = name;
        this.#dni = dni;
        this.#birth = birth;
    }

    // Métodos del objeto:
    toString() {
        return this.#dni + ": " + this.#name + " " + this.#birth;
    }
}

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
 * Clase Professor que hereda de Person. Es una clase vacía
 * que hereda todo lo necesario de Person.
 */
class Professor extends Person {}