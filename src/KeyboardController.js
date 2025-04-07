export class KeyboardController {
  constructor() {
    // Состояние удержания клавиш
    this.keys = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
      Space: false,
      Escape: false
    };
    
    // Флаги однократных нажатий (для всех клавиш)
    this.keyPressedOnce = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
      Space: false,
      Escape: false
    };

    // Привязка контекста
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    this.init();
  }

  init() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  handleKeyDown(event) {
    const key = event.code;
    
    // Если клавиша есть в нашем списке
    if (this.keys.hasOwnProperty(key)) {
      if (!this.keys[key]) { // Если клавиша ещё не была нажата
        this.keyPressedOnce[key] = true; // Запоминаем однократное нажатие
      }
      this.keys[key] = true;
    }
  }

  handleKeyUp(event) {
    const key = event.code;
    
    if (this.keys.hasOwnProperty(key)) {
      this.keys[key] = false;
      this.keyPressedOnce[key] = false; // Сбрасываем флаг однократного нажатия
    }
  }

  // Проверка удержания клавиши
  isKeyPressed(key) {
    return this.keys[key] || false;
  }

  // Проверка однократного нажатия (автоматически сбрасывает флаг)
  isKeyPressedOnce(key) {
    if (this.keyPressedOnce[key]) {
      this.keyPressedOnce[key] = false; // Сброс флага после проверки
      return true;
    }
    return false;
  }

  // Уничтожение контроллера
  destroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }
}