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

        this.#name = name;
        this.#dni = dni;
        this.#birth = birth;
    }

    // Métodos del objeto:
    toString() {
        return this.#dni + ": " + this.name + " " + this.birth;
    }
}