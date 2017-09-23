import { gl } from '../globals';

import { Loader } from './loader';

import { ShaderResource } from './shader-resource';
import { Material } from './material';
import { Transform } from './transform';
import { RenderingEngine } from './rendering-engine';
import { Matrix4 } from './matrix4';
import { Vector3 } from './vector3';
import { Util } from './util';
import { DirectionalLight } from './directional-light';
import { BaseLight } from './base-light';
import { PointLight } from './point-light';
import { SpotLight } from './spot-light';
import { Character } from './character';
import { GLSLStruct } from './glsl-struct';

export class Shader {
  private static loadedShaders: Map<string, ShaderResource> = new Map<string, ShaderResource>();

  private resource: ShaderResource;
  private fileName: string;

  constructor (fileName: string) {
    this.fileName = fileName;

    const oldResource: ShaderResource = Shader.loadedShaders.get(fileName);

    if (typeof oldResource !== 'undefined') {
      this.resource = oldResource;
      this.resource.addReference();
    } else {
      this.resource = new ShaderResource();

      const l = new Loader(); // Custom loader
      const p1 = l.getFile('/assets/' + fileName + '.fs'); // promise 1
      const p2 = l.getFile('/assets/' + fileName + '.vs'); // promise 2
      // we will want to wait until both files are loaded
      const datum: { fLoad: boolean, vLoad: boolean, f: string, v: string } = {
        fLoad: false, // is fragment shader loaded?
        vLoad: false, // is vertex shader loaded?
        f: '', // fragment shader source code
        v: '' // vertex shader source code
      };

      p1.then((value) => {
        datum.f = value;
        datum.fLoad = true;
      }).catch((error) => {
        console.log(error);
      }).then(() => {
        if (datum.fLoad && datum.vLoad) {
          this.constructor2(fileName, datum.v, datum.f);
        }
      });

      p2.then((value) => {
        datum.v = value;
        datum.vLoad = true;
      }).catch((error) => {
        console.log(error);
      }).then(() => {
        if (datum.fLoad && datum.vLoad) {
          this.constructor2(fileName, datum.v, datum.f);
        }
      });
      /****/// Moved to constructor2 /****************************************/
      /****/// const vertexShaderText: string = Shader.loadShader(fileName + '.vs');
      /****/// const fragmentShaderText: string = Shader.loadShader(fileName + '.fs');
      /****///
      /****/// this.addVertexShader(vertexShaderText);
      /****/// this.addFragmentShader(fragmentShaderText);
      /****///
      /****/// this.addAllAttributes(vertexShaderText);
      /****///
      /****/// this.compileShader();
      /****///
      /****/// this.addAllUniforms(vertexShaderText);
      /****/// this.addAllUniforms(fragmentShaderText);
      /****///
      /****/// Shader.loadedShaders.set(fileName, this.resource);
    }
  }

  private static loadShader (fileName: string): string {

    return '';
  }

  private constructor2 (fileName: string,
                        vertexShaderText: string,
                        fragmentShaderText: string) {
    this.addVertexShader(vertexShaderText);
    this.addFragmentShader(fragmentShaderText);

    this.addAllAttributes(vertexShaderText);

    this.compileShader();

    this.addAllUniforms(vertexShaderText);
    this.addAllUniforms(fragmentShaderText);

    Shader.loadedShaders.set(fileName, this.resource);
  }


  protected finalize (): void {
    if (this.resource.removeReference() && !!this.fileName) {
      Shader.loadedShaders.delete(this.fileName);
    }
  }

  public bind (): void {
    gl.useProgram(this.resource.getProgram());
  }

  public updateUniforms (transform: Transform, material: Material, renderingEngine: RenderingEngine) {
    const worldMatrix: Matrix4 = transform.getTransformation();
    const mvpMatrix: Matrix4 = renderingEngine.getMainCamera().getViewProjection().Mul(worldMatrix);

    for (let i = 0; i < this.resource.getUniformNames().length; i++) {
      const uniformName: string = this.resource.getUniformNames()[i];
      const uniformType: string = this.resource.getUniformTypes()[i];

      if (uniformType === 'sampler2D') {
        const samplerSlot: number = renderingEngine.getSamplerSlot(uniformName);
        material.getTexture(uniformName).bind(samplerSlot);
        this.setUniformi(uniformName, samplerSlot);
      } else if (uniformName.startsWith('T_')) {
        if (uniformName === 'T_MVP') {
          this.setUniform(uniformName, mvpMatrix);
        } else if (uniformName === 'T_model') {
          this.setUniform(uniformName, worldMatrix);
        } else {
          throw new Error(uniformName + ' is not a valid component of Transform');
        }
      } else if (uniformName.startsWith('R_')) {
        const unprefixedUniformName: string = uniformName.substring(2);
        if (uniformType === 'vec3') {
          this.setUniform(uniformName, renderingEngine.getVector3(unprefixedUniformName));
        } else if (uniformType === 'float') {
          this.setUniformf(uniformName, renderingEngine.getFloat(unprefixedUniformName));
        } else if (uniformType === 'DirectionalLight') {
          this.setUniformDirectionalLight(uniformName, <DirectionalLight>renderingEngine.getActiveLight());
        } else if (uniformType === 'PointLight') {
          this.setUniformPointLight(uniformName, <PointLight>renderingEngine.getActiveLight());
        } else if (uniformType === 'SpotLight') {
          this.setUniformSpotLight(uniformName, <SpotLight>renderingEngine.getActiveLight());
        } else {
          renderingEngine.updateUniformStruct(transform, material, this, uniformName, uniformType);
        }
      } else if (uniformName.startsWith('C_')) {
        if (uniformName === 'C_eyePos') {
          this.setUniform(uniformName, renderingEngine.getMainCamera().getTransform().getTransformedPos());
        } else {
          throw new Error('IllegalArgument: ' + uniformName + ' is not a valid component of Camera');
        }
      } else {
        if (uniformName === 'vec3') {
          this.setUniform(uniformName, material.getVector3(uniformName));
        } else if (uniformName === 'float') {
          this.setUniformf(uniformName, material.getFloat(uniformName));
        } else {
          throw new Error('IllegalArgument: ' + uniformName + ' is not a valid component of Material');
        }
      }
    }
  }

  private addAllAttributes (shaderText: string): void {
    const ATTRIBUTE_KEYWORD = 'attribute';
    let attributeStartLocation: number = shaderText.indexOf(ATTRIBUTE_KEYWORD);
    let attribNumber = 0;

    while (attributeStartLocation !== -1) {
      if (!(attributeStartLocation !== 0)
        && (Character.isWhitespace(shaderText.charAt(attributeStartLocation - 1)) || shaderText.charAt(attributeStartLocation - 1) === ';')
        && Character.isWhitespace(shaderText.charAt(attributeStartLocation + ATTRIBUTE_KEYWORD.length))) {
        continue;
      }

      const begin: number = attributeStartLocation + ATTRIBUTE_KEYWORD.length + 1;
      const end: number = shaderText.indexOf(';', begin);

      const attributeLine_: string = shaderText.substring(begin, end).trim();
      const attributeName: string = attributeLine_.substring(attributeLine_.indexOf(' ') + 1, attributeLine_.length).trim();

      this.setAttribLocation(attributeName, attribNumber);
      attribNumber++;

      attributeStartLocation = shaderText.indexOf(ATTRIBUTE_KEYWORD, attributeStartLocation + ATTRIBUTE_KEYWORD.length);
    }
  }

  private findUniformStructs (shaderText: string): Map<string, Array<GLSLStruct>> {
    const result: Map<string, Array<GLSLStruct>> = new Map<string, Array<GLSLStruct>>();

    const STRUCT_KEYWORD = 'struct';
    let structStartLocation: number = shaderText.indexOf(STRUCT_KEYWORD);
    while (structStartLocation !== -1) {
      if (!(structStartLocation !== 0
          && (Character.isWhitespace(shaderText.charAt(structStartLocation - 1)) || shaderText.charAt(structStartLocation - 1) === ';')
          && Character.isWhitespace(shaderText.charAt(structStartLocation + STRUCT_KEYWORD.length)))) {
        structStartLocation = shaderText.indexOf(STRUCT_KEYWORD, structStartLocation + STRUCT_KEYWORD.length);
        continue;
      }

      const nameBegin: number = structStartLocation + STRUCT_KEYWORD.length + 1;
      const braceBegin: number = shaderText.indexOf('{', nameBegin);
      const braceEnd: number = shaderText.indexOf('}', braceBegin);

      const structName: string = shaderText.substring(nameBegin, braceBegin).trim();
      const glslStructs: Array<GLSLStruct> = new Array<GLSLStruct>();

      let componentSemicolonPos = shaderText.indexOf(';', braceBegin);
      while (componentSemicolonPos !== -1 && componentSemicolonPos < braceEnd) {
        let componentNameEnd: number = componentSemicolonPos + 1;

        while (Character.isWhitespace(shaderText.charAt(componentNameEnd - 1)) || shaderText.charAt(componentNameEnd - 1) === ';') {
          componentNameEnd--;
        }

        let componentNameStart: number = componentSemicolonPos;

        while (!Character.isWhitespace(shaderText.charAt(componentNameStart - 1))) {
          componentNameStart--;
        }

        let componentTypeEnd: number = componentNameStart;

        while (Character.isWhitespace(shaderText.charAt(componentTypeEnd - 1))) {
          componentTypeEnd--;
        }

        let componentTypeStart: number = componentTypeEnd;

        while (!Character.isWhitespace(shaderText.charAt(componentTypeStart - 1))) {
          componentTypeStart--;
        }

        const componentName: string = shaderText.substring(componentNameStart, componentNameEnd);
        const componentType: string = shaderText.substring(componentTypeStart, componentTypeEnd);

        const glslStruct: GLSLStruct = new GLSLStruct();
        glslStruct.name = componentName;
        glslStruct.type = componentType;

        glslStructs.push(glslStruct);

        componentSemicolonPos = shaderText.indexOf(';', componentSemicolonPos + 1);
      }

      result.set(structName, glslStructs);

      structStartLocation = shaderText.indexOf(STRUCT_KEYWORD, structStartLocation + STRUCT_KEYWORD.length);
    }

    return result;
  }

  private addAllUniforms (shaderText: string): void {
    const structs: Map<string, Array<GLSLStruct>> = this.findUniformStructs(shaderText);

    const UNIFORM_KEYWORD = 'uniform';
    let uniformStartLocation = shaderText.indexOf(UNIFORM_KEYWORD);
    while (uniformStartLocation !== -1) {
      if (!(uniformStartLocation !== 0
          && (Character.isWhitespace(shaderText.charAt(uniformStartLocation - 1)) || shaderText.charAt(uniformStartLocation - 1) === ';')
          && Character.isWhitespace(shaderText.charAt(uniformStartLocation + UNIFORM_KEYWORD.length)))) {
        uniformStartLocation = shaderText.indexOf(UNIFORM_KEYWORD, uniformStartLocation + UNIFORM_KEYWORD.length);
        continue;
      }

      const begin: number = uniformStartLocation + UNIFORM_KEYWORD.length + 1;
      const end: number = shaderText.indexOf(';', begin);

      const uniformLine: string = shaderText.substring(begin, end).trim();

      const whiteSpacePos: number = uniformLine.indexOf(' ');
      const uniformName: string = uniformLine.substring(whiteSpacePos + 1, uniformLine.length).trim();
      const uniformType: string = uniformLine.substring(0, whiteSpacePos).trim();

      this.resource.getUniformNames().push(uniformName);
      this.resource.getUniformTypes().push(uniformType);
      this.addUniform(uniformName, uniformType, structs);

      uniformStartLocation = shaderText.indexOf(UNIFORM_KEYWORD, uniformStartLocation + UNIFORM_KEYWORD.length);
    }
  }

  private addUniform (uniformName: string, uniformType: string, structs: Map<string, Array<GLSLStruct>>): void {
    let addThis = true;
    const structsComponents: Array<GLSLStruct> = structs.get(uniformType);

    if (structsComponents) {
      addThis = false;
      for (const struct of structsComponents) {
        this.addUniform(uniformName + '.' + struct.name, struct.type, structs);
      }
    }

    if (!addThis) {
      return;
    }

    const uniformLocation: WebGLUniformLocation = gl.getUniformLocation(this.resource.getProgram(), uniformName);

    if (uniformLocation === 0xFFFFFFFF || typeof uniformLocation === 'undefined') {
      console.error('Error: Could not find uniform');
      throw new Error('UniformNotFoundError');
    }

    this.resource.getUniforms().set(uniformName, uniformLocation);
  }

  private addVertexShader (text: string): void {
    this.addProgram(text, gl.VERTEX_SHADER);
  }

  private addGeometryShader (text: string): void {
    // WARNING: Geometry shaders do not exist in WebGL yet.
    // this.addProgram(text, gl.GEOMETRY_SHADER);
  }

  private addFragmentShader (text: string): void {
    this.addProgram(text, gl.FRAGMENT_SHADER);
  }

  private setAttribLocation (attributeName: string, location: number): void {
    gl.bindAttribLocation(this.resource.getProgram(), location, attributeName);
  }

  private compileShader (): void {
    gl.linkProgram(this.resource.getProgram());

    if (!gl.getProgramParameter(this.resource.getProgram(), gl.LINK_STATUS)) {
      console.log('%cLINK_STATUS', 'background: red;color:white;font-weight:900;');
      console.log(gl.getProgramParameter(this.resource.getProgram(), gl.LINK_STATUS));
      console.error(gl.getProgramInfoLog(this.resource.getProgram()));
      throw new Error('PROGRAM FAILED TO LINK.');
    }

    gl.validateProgram(this.resource.getProgram());

    if (!gl.getProgramParameter(this.resource.getProgram(), gl.VALIDATE_STATUS)) {
      console.log('%cVALIDATE_STATUS', 'background: red;color:white;font-weight:900;');
      console.error(gl.getProgramInfoLog(this.resource.getProgram()));
      throw new Error('PROGRAM FAILED TO VALIDATE.');
    }
  }

  private addProgram (text: string, type: number): void {
    const shader: WebGLShader = gl.createShader(type);

    if (typeof shader === 'undefined') {
      console.error('Shader creation failed: Could not find valid memory location when adding shader.');
      throw new Error('SHADER CREATION FAILED. text: ' + text + ', type: ' + type);
    }

    gl.shaderSource(shader, text);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.log('SHADER COMPILATION FAILED, ERROR INCOMING',
        '\ngl.getShaderParameter(shader, gl.COMPILE_STATUS): ',
        gl.getShaderParameter(shader, gl.COMPILE_STATUS),
        '\ngl.getProgramInfoLog(shader): ',
        gl.getProgramInfoLog(this.resource.getProgram()) === '' ? 'true,' : 'false,',
        '\ngl.getError(): ',
        gl.getError(),
        '\nshader: ',
        shader,
        '\ntype: ',
        type,
        '\ntext: \n',
        text
      );
      throw new Error('SHADER COMPILATION FAILED');
    }

    gl.attachShader(this.resource.getProgram(), shader);
  }

  public setUniform (uniformName: string, value: Matrix4 | Vector3): void {
    if (value instanceof Matrix4) {
      gl.uniformMatrix4fv(this.resource.getUniforms()[uniformName], true, <Float32Array>Util.createFlippedBuffer(value));
    } else if (value instanceof Vector3) {
      gl.uniform3f(this.resource.getUniforms()[uniformName], value.x, value.y, value.z);
    }
  }

  public setUniformi (uniformName: string, value: number): void {
    gl.uniform1i(this.resource.getUniforms()[uniformName], value);
  }

  public setUniformf (uniformName: string, value: number): void {
    gl.uniform1f(this.resource.getUniforms()[uniformName], value);
  }

  public setUniformBaseLight (uniformName: string, baseLight: BaseLight): void {
    this.setUniform(uniformName + '.color', baseLight.getColor());
    this.setUniformf(uniformName + '.intensity', baseLight.getIntensity());
  }

  public setUniformDirectionalLight (uniformName: string, directionalLight: DirectionalLight): void {
    this.setUniformBaseLight(uniformName + '.base', directionalLight);
    this.setUniform(uniformName + '.direction', directionalLight.getDirection());
  }

  public setUniformPointLight (uniformName: string, pointLight: PointLight): void {
    this.setUniformBaseLight(uniformName + '.base', pointLight);
    this.setUniformf(uniformName + '.atten.constant', pointLight.getAttenuation().getConstant());
    this.setUniformf(uniformName + '.atten.linear', pointLight.getAttenuation().getLinear());
    this.setUniformf(uniformName + '.atten.exponent', pointLight.getAttenuation().getExponent());
    this.setUniform(uniformName + '.position', pointLight.getTransform().getTransformedPos());
    this.setUniformf(uniformName + '.range', pointLight.getRange());
  }

  public setUniformSpotLight (uniformName, spotLight: SpotLight) {
    this.setUniformPointLight(uniformName + '.pointLight', spotLight);
    this.setUniform(uniformName + '.direction', spotLight.getDirection());
    this.setUniformf(uniformName + '.cutoff', spotLight.getCutoff());
  }

}
