"use strict";

// * En este archivo iré probando las funcionalidades de la práctica.

(function() {
    // Comprobando que Person es una clase abstracta y no se puede instanciar:
    try {
        const p = new Person("Me", "12345678A", new Date(2000, 8, 6));
    }catch(error) {
        console.error(error);   // ! La clase Person es abstracta.
    }

    // Creando objeto Student:
    const student = new Student("Javier", "05722054E", new Date(2000, 8, 6), "others", 7);
    console.log(student);
})();