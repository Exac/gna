
export class Integer extends Number {
  // public static MIN_VALUE = Number.MIN_SAFE_INTEGER;
  // public static MAX_VALUE = Number.MAX_SAFE_INTEGER;
  // public static TYPE = 'number';
  // public static digits: string[] = [
  //   '0', '1', '2', '3', '4', '5',
  //   '6', '7', '8', '9', 'a', 'b',
  //   'c', 'd', 'e', 'f', 'g', 'h',
  //   'i', 'j', 'k', 'l', 'm', 'n',
  //   'o', 'p', 'q', 'r', 's', 't',
  //   'u', 'v', 'w', 'x', 'y', 'z'
  // ];

  public Value: number;

  constructor (value: number | string | Integer) {
    super();
    if (value instanceof Integer && typeof value !== 'number' && typeof value !== 'string') {
      this.Value = parseInt(value.Value.toString(), 10);
    } else {
      this.Value = parseInt(value.toString(), 10);
    }

  }

  public static toString (i: number | string, radix?: number) {
    if (typeof radix !== 'undefined') {
      return parseInt(i.toString(), radix);
    } else {
      return parseInt(i.toString(), 10);
    }
  }
  public static toHexString (i: number) {
    return parseInt(i.toString(), 4);
  }
  public static toOctalString (i: number) {
    return parseInt(i.toString(), 3);
  }
  public static toBinaryString (i: number) {
    return parseInt(i.toString(), 1);
  }

  public byteValue (): number { return this.Value; }
  public shortValue (): number { return this.Value; }
  public longValue (): number { return this.Value; }
  public floatValue (): number { return this.Value; }
  public doubleValue (): number { return this.Value; }
  public intValue (): number { return this.Value; }
  public value (): number { return this.Value; }



  public equals (obj: any) {
    if (obj instanceof Integer) {
      return this.Value === obj.value();
    }
    return false;
  }

  public compareTo (i: number) {
    return this.Value > i;
  }

}
