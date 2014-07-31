/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Blend two textures
 */

THREE.PerObjectBlurShader = {

	uniforms: {

		"tDiffuse1":      { type: "t", value: null },
		"tDiffuse2":      { type: "t", value: null },
        "textureSize":    { type: "v2", value: null},
		"velocityScale":  { type: "f", value: 1 },
		

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform float velocityScale;",
		"uniform float opacity;",
        "uniform vec2 textureSize;",
		"uniform sampler2D tDiffuse1;",
		"uniform sampler2D tDiffuse2;",
        
        "float MAX_SAMPLES = 50.;",
        "const int MS = 10;",

		"varying vec2 vUv;",

		"void main() {",
                //"vec2 a = vec2(textureSize2D(tDiffuse1));",
              "vec2 texelSize = 1.0 / textureSize;",
              "vec2 screenTexCoords = vUv;",
              "vec2 velocity = texture2D(tDiffuse2, screenTexCoords).rg;",
              "velocity *= velocityScale;",
            
              "float speed = length(velocity / texelSize);",
              "float nSamples = clamp(speed, 1., MAX_SAMPLES);",
              "int inSamples = int(nSamples);",
            
              "vec4 oResult = texture2D(tDiffuse1, screenTexCoords);",
            
            
              "for (int i = 1; i < MS; ++i) {",
              "      vec2 offset = velocity * (float(i) / float(MS - 1) - 0.5);",
              "      oResult += texture2D(tDiffuse1, screenTexCoords + offset);",
              "   }",
              "oResult /= float(MS);",
            

			"gl_FragColor =   oResult; //texture2D(tDiffuse1, vUv);",
            
			//"gl_FragColor =  opacity * mix( texel1, texel2, 1. );",

		"}"

	].join("\n")

};
