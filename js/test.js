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

    // Probando el caso de que falte algún campo:
    try {
        const s = new Student("05722054E", new Date(2000, 8, 6), "vocacional", 7);
        console.log(s);
    }catch(error) {
        console.error(error);   // ! El parametro name no puede estar vacío.
    }

    // Si el DNI no es válido arroja un error:
    try {
        const s1 = new Student("Javier", "aaaaaa", new Date(2000, 8, 6), "vocacional", 7);
        console.log(s1);
    }catch(error) {
        console.error(error);   // ! El DNI no es válido.
    }
    
    // Solo se pueden elegir 3 modalidades de estudios:
    try {
        const s2 = new Student("Javier", "05722054E", new Date(2000, 8, 6), "unknown", 7);
        console.log(s2);
    }catch(error) {
        console.error(error);   // ! La modalidad de estudios solo puede ser bachelor, vocacional o others.
    }

    // Usando el método toString de la clase Student:
    console.log(student.toString());
    
    // Cambiando el nombre
    student.name = "Antonio";
    console.log(student.toString());
    student.name = "Javier";
    
    // Cambiando degree.
    student.degree = "others";
    console.log(student.toString());
    
    // Cambiando grade.
    student.grade = 8.5;
    console.log(student.toString());
    
    // Comprobando el rango de la nota media:
    try {
        student.grade = 120;
    }catch(error) {
        console.error(error);   // ! Nota media no válida.
    }

    // Creando objeto Professor:
    const professor = new Professor("Pablo", "12345678A", new Date(1990, 3, 1));
    console.log(professor);

    professor.name = "Jose Antonio";
    console.log(professor.toString());
})();