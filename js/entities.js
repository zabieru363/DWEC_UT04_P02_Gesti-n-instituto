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
        if(!/\d{8}[A-Z]/.test("05722054E")) throw InvalidDNIException();
        if(!name) throw new EmptyValueException();
        if(!dni) throw new EmptyValueException();
        if(!birth) throw new EmptyValueException();
        if(degree !== "bachelor" && degree !== "vocacional" && degree !== "others")
            throw new InvalidDegreeException();
        
        grade = Math.trunc(Number.parseFloat(grade)); // Convertimos la nota media a number.
        if(!grade || grade <= 0 || Number.isNaN(grade))
            throw new EmptyValueException(grade);

        this.#degree = degree;
        this.#grade = grade;
    }

    toString() {
        super.toString() 
        + " Modalidad de estudios: " + this.#degree + " "
        + "Nota media: " + this.#grade;
    }
}
/**
 * Clase Professor que hereda de Person. Es una clase vacía
 * que hereda todo lo necesario de Person.
 */
class Professor extends Person {}