"use strict";

// * En este archivo iré probando las funcionalidades de la práctica.

(function() {
    // Comprobando que Person es una clase abstracta y no se puede instanciar:
    try {
        const p = new Person("Me", "12345678A", new Date(2000, 8, 6));
    }catch(error) {
        console.error(error);   // ! La clase Person es abstracta.
    }

    // * CREANDO OBJETO STUDENT:
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

    // * CREANDO OBJETO PROFESSOR:
    const professor = new Professor("Pablo", "12345678A", new Date(1990, 3, 1));
    console.log(professor);

    professor.name = "Jose Antonio";
    console.log(professor.toString());

    // * CREANDO UN CURSO

    const c1 = new Course("DWEC", 20, professor);
    console.log(c1);
    
    // Si el objeto no es un profesor.
    
    try {
        const c1 = new Course("DWEC", 20, student);
    }catch(error) {
        console.error(error);   // ! El objeto que se está pasado no es un profesor.
    }

    // * CREANDO OBJETO HIGHSCHOOL

    const highSchool = HighSchool.getInstance("MaestreCalatrava");

    // Añadiendo un curso al centro:
    highSchool.addCourse(c1);
    
    // ¿ Que pasa si añadimos un curso que ya está en el highSchool?
    try {
        highSchool.addCourse(c1);
    }catch(error) {
        console.error(error);   // ! El curso ya existe en el centro.
    }
    
    // Eliminando un curso:
    highSchool.removeCourse(c1);
    
    // ¿Que pasa si eliminamos un curso que no está registrado en el centro?
    try {
        highSchool.removeCourse(c1);
    }catch(error) {
        console.error(error);   // ! El curso no está registrado en el centro.
    }
    
    highSchool.addCourse(c1);   // Volvemos a añadir el curso al objeto.

    // Comprobando que el patrón Singleton funciona:
    console.log("Singleton");

    const self = HighSchool.getInstance("Copia");

    console.log(highSchool === self);
    console.log(Object.is(highSchool, self));
    
    // Esto ocurre porque se trata del mismo objeto.
    try {
        self.addCourse(c1);
    }catch(error) {
        console.error(error);   // ! El curso ya existe en el centro.
    }

    // * UTILIZANDO EL MÉTODO DOAPPLICATION()

    console.log("Método doAplication");
    c1.doApplication(student);
    console.log(c1.bachelorStudents);
    console.log(c1.vocacionalStudents);
    console.log(c1.others);
})();