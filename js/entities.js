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

        this.#degree = degree;
        this.#grade = grade;
    }

    toString() {
        return super.toString() 
        + " Modalidad de estudios: " + this.#degree
        + " Nota media: " + this.#grade;
    }
}
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