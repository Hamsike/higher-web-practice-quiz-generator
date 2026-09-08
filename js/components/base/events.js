export class EventEmitter {
  constructor() {
    this._events = new Map();
  }

  on(eventName, callback) {
    if (!this._events.has(eventName)) {
      this._events.set(eventName, new Set());
    }
    this._events.get(eventName).add(callback);
  }

  emit(eventName, context) {
    if (this._events.has(eventName)) {
      this._events.get(eventName).forEach(callback => {
        try {
          callback(context);
        } catch (error) {
          console.error(`Error in event handler for ${eventName}:`, error);
        }
      });
    }

    if (this._events.has('*')) {
      this._events.get('*').forEach(callback => {
        try {
          callback(eventName, context);
        } catch (error) {
          console.error('Error in universal event handler:', error);
        }
      });
    }
  }

  onAll(callback) {
    this.on('*', callback);
  }
}
