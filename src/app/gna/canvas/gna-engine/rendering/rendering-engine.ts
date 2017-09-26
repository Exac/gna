import { BaseLight } from '../../java/base-light';

export class RenderingEngine {
  private samplerMap: object;
  private lights: Array<BaseLight>;
  private activeLights: BaseLight;
}
