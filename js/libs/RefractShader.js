/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Blend two textures
 */

THREE.RefractShader = {

	uniforms: {

		"tDiffuse1": { type: "t", value: null },
		"tDiffuse2": { type: "t", value: null },
		"mixRatio":  { type: "f", value: 0.4 },
		"opacity":   { type: "f", value: 1.0 }

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform float opacity;",
		"uniform float mixRatio;",

		"uniform sampler2D tDiffuse1;",
		"uniform sampler2D tDiffuse2;",

		"varying vec2 vUv;",

		"void main() {",
            //"vec2 pr = (gl_FragCoord.xy/gl_FragCoord.w);",
           
			"vec4 b = normalize(texture2D( tDiffuse1,  vUv));",
            "float bb = b.a;",
            "if(length(b.rgb) < 0.001){bb = 1.0;}",
            "else{bb = 1.0 + length (b.rgb)/10.0;}",
            
            
            "vec2 uv = bb *vUv; //*(vUv * 2.0 - vec2(1.0));",
            // "uv.x = -uv.x;",
            //"uv = 0.5*uv + vec2(0.5);",
			"vec4 texel2 = texture2D( tDiffuse2, uv );",
			// "vec4 texel3 = texture2D( tDiffuse2, vUv * 1.2 );",
            
            
			"gl_FragColor =  vec4(texel2.rgb , 1.0);",

		"}"

	].join("\n")

};
