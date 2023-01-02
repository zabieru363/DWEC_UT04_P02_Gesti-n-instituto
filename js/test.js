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
    const student = new Student("Javier", "05722054E", new Date(2000, 8, 6), "vocacional", 7);
    console.log(student);

    // Si el DNI no es válido arroja un error:
    try {
        const s1 = new Student("Javier", "05722", new Date(2000, 8, 6), "others", 7);
        console.log(s1);
    }catch(error) {
        console.error(error);
    }
    
    // Solo se pueden elegir 3 modalidades de estudios:
    try {
        const s2 = new Student("Javier", "05722054E", new Date(2000, 8, 6), "unknown", 7);
        console.log(s2);
    }catch(error) {
        console.error(error);
    }
})();