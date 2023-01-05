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

    // * PROPIEDADES DEL OBJETO STUDENT

    console.log("Propiedades del objeto Student");

    // Usando el método toString de la clase Student:
    console.log(student.toString());
    
    // Cambiando el nombre
    student.name = "Antonio";
    console.log(student.name);
    student.name = "Javier";
    console.log(student.name);
    
    // Cambiando degree.
    student.degree = "others";
    console.log(student.degree);
    
    // Cambiando grade.
    student.grade = 8.5;
    console.log(student.grade); // Al convertirlo a number es un 8.
    
    // Comprobando el rango de la nota media:
    try {
        student.grade = 120;
    }catch(error) {
        console.error(error);   // ! Nota media no válida.
    }

    console.log(student.dni);   // El dni no puede ser cambiado.

    // * CREANDO OBJETO PROFESSOR:

    console.log("Propiedades del objeto Professor.");

    const professor = new Professor("Pablo", "12345678A", new Date(1990, 3, 1));
    console.log(professor);

    professor.name = "Jose Antonio";
    console.log(professor.name);
    professor.name = "Pablo";
    console.log(professor.name);
    
    console.log(professor.dni);

    // * CREANDO UN CURSO

    const c1 = new Course("DWEC", 20, professor);
    const c2 = new Course("DWES", 25, professor);
    console.log(c1);
    
    // Si el objeto no es un profesor.
    
    try {
        const c1 = new Course("DWEC", 20, student);
    }catch(error) {
        console.error(error);   // ! El objeto que se está pasado no es un profesor.
    }

    // * PROPIEDADES DEL OBJETO COURSE.

    console.log("Propiedades del objeto course");

    console.log(c1.name);
    console.log(c1.tutor);
    
    // Cambiando el tutor
    c1.tutor = new Professor("Alberto", "12348799O", new Date(1995, 2, 10));
    console.log(c1.tutor);

    // * AÑADIENDO CURSOS A HIGHSCHOOL

    console.log("Objeto HighSchool");

    const highSchool = HighSchool.getInstance("MaestreCalatrava");

    // Añadiendo cursos al centro:
    highSchool.addCourse(c1);
    highSchool.addCourse(c2);
    
    // ¿Que pasa si añadimos un curso que ya está en el highSchool?
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

    // * EL OBJETO HIGHSCHOOL ES ÚNICO.

    console.log("Probando que el Singleton funciona.");

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

    console.log("Añadir alumnos que aplican a un curso mediante doApplication().");
    c1.doApplication(student);  // Lo encuadra en la lista de others.
    c1.doApplication(new Student("Fernando", "24681077B", new Date(2001, 5, 23), "bachelor", 5.4));  // Lo encuadra en la lista de bachelor.
    c1.doApplication(new Student("Luis", "43683077J", new Date(2000, 8, 13), "vocacional", 7.5));  // Lo encuadra en la lista de vocacional.
    c1.doApplication(new Student("Mary", "23613266L", new Date(2002, 4, 28), "others", 9.5));  // Lo encuadra en la lista de others.
    // Un alumno también que no esté admitido, para probar:
    c1.doApplication(new Student("John", "63313966S", new Date(2002, 4, 28), "bachelor", 4.5));  // Lo encuadra en la lista de bachelor.

    console.log(c1.bachelorStudents);
    console.log(c1.vocacionalStudents);
    console.log(c1.others);

    // ¿Que ocurre si usamos un alumno que ya está matriculado?
    try {
        c1.doApplication(student);
    }catch(error) {
        console.error(error);   // ! El estudiante ya está preinscrito en el curso.
    }

    // Matriculando un estudiante en otro curso.
    c2.doApplication(student);

    try {
        c2.doApplication(student);
    }catch(error) {
        console.error(error);   // ! El estudiante ya está preinscrito en el curso.
    }

    // * UTILIZANDO ITERADOR DE CURSOS DE LA CLASE HIGHSCHOOL

    console.log("Recorrer objetos Course de HighSchool");

    const c3 = new Course("DIW", 20, professor);
    const c4 = new Course("DAW", 20, professor);

    // Añado más cursos para probar el iterador
    highSchool.addCourse(c3);
    highSchool.addCourse(c4);

    const coursesIterator = highSchool.courses();

    for(const course of coursesIterator) {
        console.log(course);    // Imprime solo el nombre de cada cursos que es en principio lo que interesa.
    }

    // * PUBLICACIÓN DE LISTA DE ADMITIDOS

    console.log("Recuperar alumnos admitidos de un curso");

    const admittedStudents = c1.admittedStudents();

    // Aparecen todos menos John que no estaría admitido.
    for(const student of admittedStudents) {
        console.log(student.name);  // Recuperamos la propiedad nombre de cada uno (en principio podríamos sacar el objeto entero)
    }
})();