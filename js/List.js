"use strict";

/**
 * Clase List que crea una colección que permite
 * trabajar con cualquier tipo de valor.
 * @author Javier López
 * @version 1.0
 */
class List {
    // * PROPIEDADES PRIVADAS
    #list;
    #capacity;  // Tamaño máximo de la lista.

    /**
     * Constructor de la clase.
     * @param {*} list Una colección de elementos,
     * si no se le especifica ninguna por defecto será
     * un array.
     */
    constructor(list = [], capacity) {
        if(!new.target) throw new InvalidAccessConstructorException();  // El constructor se crea con new.
        this.#list = list;
        this.#capacity = capacity;
    }

    // * MÉTODOS PÚBLICOS DEL OBJETO

    /**
     * Método que comprueba si la lista está vacía.
     * @returns True si está vacía, false si no es así.
     */
    isEmpty() {
        return this.#list.length === 0;
    }

    /**
     * Método que comprueba si la lista está llena.
     * @returns True si está llena, false si no es así.
     */
    isFull() {
        return this.#list.length === this.#capacity;
    }

    /**
     * Método que devuelve el número de elementos que tiene la lista.
     * @returns El número de elementos que tiene la lista.
     */
    size() {
        return this.#list.length;
    }

    /**
     * Método que añade un elemento a la lista.
     * @param {*} element El elemento a añadir.
     */
    add(element) {
        if(this.isFull()) {
            throw new ListIsFullException();
        }
        
        return this.#list.push(element);
    }

    /**
     * Método que añade un elemento a la lista en la posición especificada.
     * @param {*} element El elemento a añadir.
     * @param {*} index La posición donde se va a añadir el elemento.
     * @returns El número de elementos de la lista.
     */
    addAt(element, index) {
        if(this.isFull()) {
            throw new ListIsFullException();
        }

        if(index < 0 || index > this.#capacity) {
            throw new IndexOutOfBoundsListException();
        }

        this.#list.splice(index, 0, element);
        return this.size();
    }

    /**
     * Método que devuelve el elemento de la lista de
     * la posición indicada.
     * @param {*} index La posición del elemento a obtener.
     * @returns El elemento en base a la posición.
     */
    get(index) {
        if(this.isEmpty()) {
            throw new ListIsEmptyException();
        }
        
        if(index < 0 || index > this.#capacity) {
            throw new IndexOutOfBoundsListException();
        }

        return this.#list.find(function(elem, pos) {
            if(index === pos) return elem;
        });
    }

    /**
     * Método que imprime la lista en formato cadena.
     * @returns La lista en formato cadena.
     */
    toString() {
        if(this.isEmpty()) {
            throw new ListIsEmptyException();
        }

        return this.#list.reduce(function(str, elem, index) {
            if(!(elem instanceof Object)) {
                return index !== 0 ? 
                    str + " - " + elem.toString() :
                    str + " " + elem.toString();
            } else {
                return index !== 0 ? 
                    str + " - " +  elem :
                    str + " " + elem;
            }
        }, "");
    }

    /**
     * Método que devuelve la posición del elemento que se
     * le pasa cómo parametro.
     * @param {*} element El elemento del cuál se quiere obtener su posición.
     * @returns La posición del elemento, -1 si no lo encuentra.
     */
    indexOf(element) {
        if(this.isEmpty()) {
            throw new ListIsEmptyException();
        }

        return this.#list.findIndex(elem => elem === element);
    }

    /**
     * Método que devuelve la posición del elemento que se
     * le pasa cómo parametro pero comenzando por el final.
     * @param {*} element El elemento del cuál se quiere obtener su posición.
     * @returns La posición del elemento, -1 si no lo encuentra.
     */
    lastIndexOf(element) {
        if(this.isEmpty()) {
            throw new ListIsEmptyException();
        }

        return this.#list.findLastIndex(elem => elem === element);
    }

    /**
     * Devuelve el número máximo de elementos que podemos tener en la lista.
     * @returns El número máximo de elementos que podemos tener en la lista.
     */
    capacity() {
        return this.#capacity;
    }

    /**
     * Método que vacía la lista.
     */
    clear() {
        this.#list.length = 0;
    }

    /**
     * Método que devuelve el primer elemento de la lista.
     * @returns El primer elemento de la lista.
     */
    firstElement() {
        if(this.isEmpty()) {
            throw new ListIsEmptyException();
        }

        return this.#list[0];
    }

    /**
     * Método que devuelve el último elemento de la lista.
     * @returns El último elemento de la lista.
     */
    lastElement() {
        if(this.isEmpty()) {
            throw new ListIsEmptyException();
        }

        return this.#list[this.#list.length - 1];
    }

    /**
     * Método que elimina el elemento de la posición indicada.
     * @param {*} index La posición del elemento a eliminar.
     * @returns El elemento borrado.
     */
    remove(index) {
        if(this.isEmpty()) {
            throw new ListIsEmptyException();
        }

        if(index < 0 || index > this.#capacity) {
            throw new IndexOutOfBoundsListException();
        }

        return this.#list.splice(index, 1);
    }

    /**
     * Método que elimina el elemento que se le pasa cómo parametro
     * de la lista.
     * @param {*} element El elemento que se quiere eliminar.
     * @returns True si se ha podido eliminar, false si no es así.
     */
    removeElement(element) {
        if(this.isEmpty()) {
            throw new ListIsEmptyException();
        }

        let removed = false;
        const pos = this.indexOf(element);

        if(pos !== -1) {
            this.#list.splice(pos, 1);
            removed = true;
        }

        return removed;
    }

    /**
     * Método que reemplaza un elemento de la lista por
     * otro que se le pase cómo parametro en base a su indice.
     * @param {*} element El elemento nuevo.
     * @param {*} index La posición donde se quiere empezar a cambiar.
     * @returns El elemento anterior.
     */
    set(element, index) {
        if(this.isEmpty()) {
            throw new ListIsEmptyException();
        }

        if(index < 0 || index > this.#capacity) {
            throw new IndexOutOfBoundsListException();
        }

        return this.#list.splice(index, 1, element);
    }
}