"use strict";

/**
 * Clase de excepción base para crear correctamente
 * objetos Error. Esta tiene acceso al callstack.
 */
class BaseException extends Error {
  constructor(message = "", fileName, lineNumber) {
    super(message, fileName, lineNumber);
    this.name = "BaseException";
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BaseException);
    }
  }
}

/**
 * Clase de excepción que genera un error cada vez que
 * llamamos a un constructor sin el operador new.
 */
class InvalidAccessConstructorException extends BaseException {
  constructor(fileName, lineNumber) {
    super("El constructor se debe de invocar con new.", fileName, lineNumber);
    this.name = "InvalidAccessConstructorException";
  }
}

/**
 * Clase de excepción que genera un error cada vez que intentamos
 * instanciar una clase abstracta.
 */
class AbstractClassException extends BaseException {
  constructor(className, fileName, lineNumber) {
    super(`La clase ${className} es abstracta.`, fileName, lineNumber);
    this.className = className;
    this.name = "AbstractClassException";
  }
}

/**
 * Clase de excepción que genera un error si un campo o
 * parametro está vacío.
 */
class EmptyValueException extends BaseException {
  constructor(param, fileName, lineNumber) {
    super("El campo  " + param + " no puede estar vacío.", fileName, lineNumber);
    this.param = param;
    this.name = "EmptyValueException";
  }
}

/**
 * Clase de excepción que genera un error si el DNI no es válido.
 */
class InvalidDNIException extends BaseException {
    constructor(fileName, lineNumber) {
      super("El DNI no es válido.", fileName, lineNumber);
      this.name = "InvalidDNIException";
    }
}

/**
 * Clase de excepción que genera un error si el degree no es válido.
 */
class InvalidDegreeException extends BaseException {
    constructor(fileName, lineNumber) {
      super("La modalidad de estudios solo puede ser bachelor, vocacional o others.", fileName, lineNumber);
      this.name = "InvalidDegreeException";
    }
}

/**
 * Clase de excepción que genera un error si el degree no es válido.
 */
class InvalidGradeException extends BaseException {
  constructor(fileName, lineNumber) {
    super("La nota media no es válida.", fileName, lineNumber);
    this.name = "InvalidGradeException";
  }
}

/**
 * Clase de excepción que genera un error si el degree no es válido.
 */
class TutorException extends BaseException {
  constructor(fileName, lineNumber) {
    super("El objeto que se está pasando no es un profesor.", fileName, lineNumber);
    this.name = "TutorException";
  }
}

/**
 * Clase de excepción que genera un error si el curso ya existe en el centro.
 */
class CourseExistsException extends BaseException {
  constructor(fileName, lineNumber) {
    super("El curso ya existe en el centro.", fileName, lineNumber);
    this.name = "CourseExistsException";
  }
}

/**
 * Clase de excepción que genera un error si el curso no está registrado en el centro.
 */
class NotRegisteredCourseException extends BaseException {
  constructor(fileName, lineNumber) {
    super("El curso no está registrado en el centro", fileName, lineNumber);
    this.name = "NotRegisteredException";
  }
}

/**
 * Clase de excepción que genera un error si el objeto que se le pasa
 * no es un objeto Student.
 */
class StudentException extends BaseException {
  constructor(fileName, lineNumber) {
    super("El objeto que se está pasando no es un estudiante.", fileName, lineNumber);
    this.name = "StudentException";
  }
}

/**
 * Clase de excepción que genera un error si el estudiante ya está
 * preinscrito en algún curso.
 */
class RegisteredStudentException extends BaseException {
  constructor(fileName, lineNumber) {
    super("El estudainte ya está preinscrito", fileName, lineNumber);
    this.name = "RegisteredStudentException";
  }
}

/**
 * Clase de excepción que genera un error si el curso no
 * puede admitir más alumnos.
 */
class CourseIsFullException extends BaseException {
  constructor(fileName, lineNumber) {
    super("El curso ya está lleno.", fileName, lineNumber);
    this.name = "CourseIsFullException";
  }
}

// * EXCEPCIONES OBJETO LIST

/**
 * Clase de excepción personalizada para mostrar un
 * mensaje de error en el case de que la lista esté llena.
 */
class ListIsFullException extends BaseException {
  constructor(fileName, lineNumber) {
      super("La lista está llena.", fileName, lineNumber);
      this.name = "ListIsFullException";
  }
}

/**
* Clase de excepción personalizada para mostrar un
* mensaje de error en el case de que la lista esté vacía.
*/
class ListIsEmptyException extends BaseException {
  constructor(fileName, lineNumber) {
      super("La lista está vacía.", fileName, lineNumber);
      this.name = "ListIsEmptyException";
  }
}

/**
* Clase de excepción personalizada para mostrar un
* mensaje de error en el case de que los limites de
* la capacidad de la lista hayan sido superados a la hora
* de invocar métodos que trabajen con los index.
*/
class IndexOutOfBoundsListException extends BaseException {
  constructor(fileName, lineNumber) {
      super("El indice está fuera de los limites de la lista.", fileName, lineNumber);
      this.name = "IndexOutOfBoundsListException";
  }
}