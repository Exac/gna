export abstract class Number {
  public abstract intValue (): number;
  public abstract longValue(): number;
  public abstract floatValue(): number;
  public abstract doubleValue(): number;
  public byteValue () {
    return this.intValue();
  }
  public shortValue () {
    return this.intValue();
  }
}
