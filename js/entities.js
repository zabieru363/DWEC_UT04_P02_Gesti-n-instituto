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
 * Clase Professor que hereda de Person. Es una clase sin
 * funcionalidad nueva ya que obtiene todo lo que necesita
 * de Person.
 * @author Javier López
 * @version 1.0
 */
class Professor extends Person {
    constructor(name, dni, birth) {
        super(name, dni, birth);    // Llamamos al superconstructor.
    }
}

/**
 * Clase Course que permite crear cursos en los que los
 * estudiantes se pueden matricular.
 * @author Javier López
 * @version 1.0
 */
class Course {
    // Campos privados:
    #name;
    #students;
    #tutor;
    // Listas para encuadrar a alumnos:
    #bachelorStudents = [];
    #vocacionalStudents = [];
    #others = [];
    #allStudents = [];  // Colección para guardar todos los estudiantes preinscritos.

    constructor(name, students, tutor) {
        // Validación de campos:
        if(!name) throw new EmptyValueException(name);
        if(!students) throw new EmptyValueException(students);
        if(!tutor) throw new EmptyValueException(tutor);

        // Comprobando que tutor sea un profesor:
        if(!(tutor instanceof Professor)) throw new TutorException();
        
        this.#name = name;
        this.#students = students;
        this.#tutor = tutor;
    }

    /**
     * Necesitamos hacer esta propiedad accesible ya que se
     * utiliza en el método addCourse del objeto HighSchool.
     */
    get name() {
        return this.#name;
    }

    /**
     * Getter para obtener el nombre del tutor.
     */
    get tutor() {
        return this.#tutor.name;
    }

    /**
     * Setter para cambiar el tutor.
     */
    set tutor(value) {
        if(!(value instanceof Professor)) throw new TutorException();
        this.#tutor = value;
    }

    /**
     * Método privado que permite ordenar una colección de estudiantes
     * por el campo de la nota.
     * @param {*} array La colección a ordenar.
     */
    #sortStudents(array) {
        array.sort((b, a) => a.grade - b.grade);
    }

    /**
     * Recibe la aplicación de un alumno para el curso. El
     * alumno quedará encuadrado en una lista en
     * función de sus estudios previos y ordenado por la nota.
     * El alumno no puede estar preinscrito en el curso
     * previamente. En caso de estarlo el método lanzará
     * una excepción.
     * @param {*} student El estudiante a matricular en el curso.
     */
    doApplication(student) {
        if(!(student instanceof Student)) throw new StudentException();

        // Comprobando que el estudiante está en el curso:
        const registered = this.#allStudents.some(elem => elem.dni === student.dni);
        if(registered) throw new RegisteredStudentException();

        // También hay que controlar si el curso está lleno y no puede admitir más alumnos.
        if(this.#allStudents.length === this.#students) throw new CourseIsFullException();
        this.#allStudents.push(student);

        switch(student.degree) {
          case "bachelor":
            this.#bachelorStudents.push(student);
            this.#sortStudents(this.#bachelorStudents);
            break;
          case "vocacional":
            this.#vocacionalStudents.push(student);
            this.#sortStudents(this.#vocacionalStudents);
            break;
          case "others":
            this.#others.push(student);
            this.#sortStudents(this.#others);
            break;
        }
    }

    /**
     * Muestra los alumnos admitidos de un curso.
     * @returns Un objeto iterable que permite recuperar los alumnos admitidos de un curso.
     */
    admittedStudents() {
        // 40% de los alumnos de bachillerato.
        const bachelorStudentsLength = this.#students * 40 / 100;
        // 40% de los alumnos de grado medio o superior.
        const vocacionalStudentsLength = this.#students * 40 / 100;
        // 20% de los alumnos con otro tipo de modalidad de estudios.
        const othersStudentsLength = this.#students * 20 / 100;

        const bachelor = this.#bachelorStudents.filter(student => student.grade >= 5);
        const vocacional = this.#vocacionalStudents.filter(student => student.grade >= 5);
        const others = this.#others.filter(student => student.grade >= 5);

        const list1 = new List(bachelor, bachelorStudentsLength);   // Almacena los alumnos admitidos de bachillerato.
        const list2 = new List(vocacional, vocacionalStudentsLength);   // Almacena los alumnos admitidos de vocacional.
        const list3 = new List(others, othersStudentsLength);   // Almacena los alumnos admitidos de others.

        const admittedStudents = [];    // Aquí utilizo un array porque es el objeto iterable.

        for(let i = 0; i < list1.capacity(); i++) {
            if(typeof list1.get(i) !== "undefined")
                admittedStudents.push(list1.get(i)); // Añadimos todos los alumnos admitidos de bachillerato.
        }

        for(let i = 0; i < list2.capacity(); i++) {
            if(typeof list2.get(i) !== "undefined")
                admittedStudents.push(list2.get(i)); // Añadimos todos los alumnos admitidos de vocacional.
        }

        for(let i = 0; i < list3.capacity(); i++) {
            if(typeof list3.get(i) !== "undefined")
                admittedStudents.push(list3.get(i)); // Añadimos todos los alumnos admitidos de others.
        }

        // Ahora devolvemos un objeto iterable que permita recuperar los alumnos admitidos:
        return {
            [Symbol.iterator]() {
                let nextIndex = 0;

                return {
                    next: function() {
                        return nextIndex < admittedStudents.length ?
                            { value: admittedStudents[nextIndex++], done: false } :
                            { done: true };
                    }
                }
            }
        }
    }

    // Hacemos accesibles las listas para probar que se añaden donde deberian.

    get bachelorStudents() {
        return this.#bachelorStudents;
    }

    get vocacionalStudents() {
        return this.#vocacionalStudents;
    }

    get others() {
        return this.#others;
    }
}
Object.defineProperty(Course.prototype, "name", {enumerable: true});

const HighSchoolSingleton = (function() {
    let instantiated;

    function init() {
        /**
         * Clase HighSchool que representa el objeto principal de
         * la aplicación. Este es un objeto único ya que implementa
         * el patrón Singleton.
         * @author Javier López
         * @version 1.0
         */
        class HighSchool {
            // Campos privados:
            #name;
            #courses = [];
            constructor(name = "Default") {
                this.#name = name;
            }

            /**
             * Añade un curso al instituto. Si está registrado genera
             * una excepción.
             * @param {*} course El curso a añadir al instituto.
             */
            addCourse(course) {
                // Comprobamos si el curso no está registrado.
                const registered = this.#courses.some(elem => elem.name === course.name);
                if(registered) throw new CourseExistsException();

                this.#courses.push(course);
            }

            /**
             * Elimina un curso del instituto. Si no está registrado
             * genera una excepción.
             * @param {*} course El curso a eliminar.
             */
            removeCourse(course) {
                // Comprobamos si el curso no está registrado.
                const pos = this.#courses.findIndex(elem => elem.name === course.name);
                if(pos === -1) throw new NotRegisteredCourseException();

                this.#courses.splice(pos, 1);
            }

            /**
             * Método que devuelve un iterador con todos los cursos.
             * @returns Un objeto iterable que permite recuperar todos los cursos.
             */
            courses() {
                let array = this.#courses;

                // Devolvemos un objeto iterable:
                return {
                    [Symbol.iterator]() {
                        let nextIndex = 0;

                        return {
                            next: function() {
                                return nextIndex < array.length ?
                                    { value: array[nextIndex++].name, done: false } :
                                    { done: true };
                            }
                        }
                    }
                }

                // Esta es la forma de hacerlo con un generador.
                // for(const course of this.#courses) {
                //     yield course.name;
                // }
            }
        }
        return Object.freeze(new HighSchool());
    }

    return {
        getInstance() {
            if(!instantiated) instantiated = init();
            return instantiated;
        }
    }
})();