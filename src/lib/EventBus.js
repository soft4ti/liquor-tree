export default class EventBus {
  constructor() {
    this.events = {};
  }

  // Adiciona um ouvinte de evento
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  // Remove um ouvinte de evento
  off(event, listenerToRemove) {
    if (!this.events[event]) return;

    this.events[event] = this.events[event].filter(
      (listener) => listener !== listenerToRemove,
    );
  }

  // Adiciona um ouvinte de evento que será chamado apenas uma vez
  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }

  // Emite um evento
  emit(event, ...args) {
    if (!this.events[event]) return;

    this.events[event].forEach((listener) => listener(...args));
  }

  // Alias para o método emit
  $emit(event, ...args) {
    this.emit(event, ...args);
  }
}
