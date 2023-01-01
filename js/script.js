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