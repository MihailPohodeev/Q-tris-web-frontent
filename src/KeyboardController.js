export class KeyboardController {
  constructor() {
    // Состояние клавиш
    this.keys = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
      Space: false
    };

    // Привязка контекста для обработчиков
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    // Инициализация
    this.init();
  }

  init() {
    // Подписываемся на события клавиатуры
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  handleKeyDown(event) {
    switch(event.code) {
      case 'ArrowUp':
        this.keys.ArrowUp = true;
        break;
      case 'ArrowDown':
        this.keys.ArrowDown = true;
        break;
      case 'ArrowLeft':
        this.keys.ArrowLeft = true;
        break;
      case 'ArrowRight':
        this.keys.ArrowRight = true;
        break;
      case 'Space':
        this.keys.Space = true;
        break;
    }
  }

  handleKeyUp(event) {
    switch(event.code) {
      case 'ArrowUp':
        this.keys.ArrowUp = false;
        break;
      case 'ArrowDown':
        this.keys.ArrowDown = false;
        break;
      case 'ArrowLeft':
        this.keys.ArrowLeft = false;
        break;
      case 'ArrowRight':
        this.keys.ArrowRight = false;
        break;
      case 'Space':
        this.keys.Space = false;
        break;
    }
  }

  // Проверка состояния клавиш
  isKeyPressed(key) {
    return this.keys[key] || false;
  }

  // Уничтожение контроллера
  destroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }
}