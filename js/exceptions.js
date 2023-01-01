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