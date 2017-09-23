import { Vector2 } from './vector2';

// ENGINE.CORE

export class Input {
  /* tslint:disable:no-unused-variables */
  public static NUM_KEYCODES = 256;
  public static NUM_MOUSEBUTTONS = 5;

  public static KEY_MOUSE = 200;
  public static KEY_MOUSERIGHT = 201;

  public static KEY_ESCAPE = 0x1B;

  public static KEY_ALT_ENTER = 10;

  public static KEY_BACKSPACE = 8;
  public static KEY_TAB = 9;
  public static KEY_ENTER = 13;
  public static KEY_SHIFT = 16;
  public static KEY_CTRL = 17;
  public static KEY_ALT = 18;
  public static KEY_PAUSE = 19;
  public static KEY_SPACE = 32;
  public static KEY_PGUP = 33;
  public static KEY_PGDN = 34;
  public static KEY_END = 35;
  public static KEY_HOME = 36;

  public static KEY_LEFT = 37;
  public static KEY_UP = 38;
  public static KEY_RIGHT = 39;
  public static KEY_DOWN = 40;

  public static KEY_INSERT = 45;
  public static KEY_DELETE = 46;

  public static KEY_0 = 48;
  public static KEY_1 = 49;
  public static KEY_2 = 50;
  public static KEY_3 = 51;
  public static KEY_4 = 52;
  public static KEY_5 = 53;
  public static KEY_6 = 54;
  public static KEY_7 = 55;
  public static KEY_8 = 56;
  public static KEY_9 = 57;

  public static KEY_A = 65;
  public static KEY_B = 66;
  public static KEY_C = 67;
  public static KEY_D = 68;
  public static KEY_E = 69;
  public static KEY_F = 70;
  public static KEY_G = 71;
  public static KEY_H = 72;
  public static KEY_I = 73;
  public static KEY_J = 74;
  public static KEY_K = 75;
  public static KEY_L = 76;
  public static KEY_M = 77;
  public static KEY_N = 78;
  public static KEY_O = 79;
  public static KEY_P = 80;
  public static KEY_Q = 81;
  public static KEY_R = 82;
  public static KEY_S = 83;
  public static KEY_T = 84;
  public static KEY_U = 85;
  public static KEY_V = 86;
  public static KEY_W = 87;
  public static KEY_X = 88;
  public static KEY_Y = 89;
  public static KEY_Z = 90;

  public static KEY_NUMPAD0 = 96;
  public static KEY_NUMPAD1 = 97;
  public static KEY_NUMPAD2 = 98;
  public static KEY_NUMPAD3 = 99;
  public static KEY_NUMPAD4 = 100;
  public static KEY_NUMPAD5 = 101;
  public static KEY_NUMPAD6 = 102;
  public static KEY_NUMPAD7 = 103;
  public static KEY_NUMPAD8 = 104;
  public static KEY_NUMPAD9 = 105;
  public static KEY_NUMPADMULTIPLY = 106;
  public static KEY_NUMPADADD = 107;
  public static KEY_NUMPADDIVIDE = 111;
  public static KEY_NUMPADSUBTRACT = 109;

  public static KEY_SUBTACT = 189;

  public static KEY_F1 = 112;
  public static KEY_F2 = 113;
  public static KEY_F3 = 114;
  public static KEY_F4 = 115;
  public static KEY_F5 = 116;
  public static KEY_F6 = 117;
  public static KEY_F7 = 118;
  public static KEY_F8 = 119;
  public static KEY_F9 = 120;
  public static KEY_F10 = 121;
  public static KEY_F11 = 122;
  public static KEY_F12 = 123;

  public static lastKeys: Array<boolean>;
  public static lastMouse: Array<boolean>;
  /* tslint:enable:no-unused-variables */

  constructor () {
    Input.lastKeys = new Array<boolean>(Input.NUM_KEYCODES);
    Input.lastMouse = new Array<boolean>(Input.NUM_MOUSEBUTTONS);
    // TODO: Implement static event listeners in this file
  }

  public static update (): void {
    for (let i = 0; i < Input.NUM_KEYCODES; i++) {
      Input.lastKeys[i] = Input.getKey(i);
    }
    for (let i = 0; i < Input.NUM_MOUSEBUTTONS; i++) {
      Input.lastMouse[i] = Input.getMouse(i);
    }
  }

  public static getKey (keyCode: number): boolean {
    // TODO: Implement
    return false;
  }

  public static getKeyDown (keyCode: number): boolean {
    // TODO: Implement
    return false;
  }

  public static getKeyUp (keyCode: number): boolean {
    // TODO: Implement
    return false;
  }

  public static getMouse (mouseButton: number): boolean {
    // TODO: Implement
    return false;
  }

  public static getMouseDown (mouseButton: number): boolean {
    // TODO: Implement
    return false;
  }

  public static getMouseUp (mouseButton: number): boolean {
    // TODO: Implement
    return false;
  }

  public static getMousePosition (): Vector2 {
    // TODO: Implement
    return new Vector2(0, 0);
  }

  public static setMousePosition (pos: Vector2):void {
    // TODO: Implement? Impossible in JS?

  }

  public static setCursor (enabled: boolean): void {
    // TODO: Implement

  }
}
