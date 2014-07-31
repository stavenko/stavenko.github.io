/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Full-screen textured quad shader
 */
console.log(">>");

THREE.VelocityShader = {

	uniforms: {

		"prevModelViewMatrix": { type: "m4", value: new THREE.Matrix4() },
		"prevProjectionMatrix": { type: "m4", value: new THREE.Matrix4() },
		//"modelViewMatrix": { type: "m4", value: new THREE.Matrix4() },
		//"projectionMatrix": { type: "m4", value: new THREE.Matrix4() }

	},

	vertexShader: [

        "uniform mat4 prevModelViewMatrix;",
        "uniform mat4 prevProjectionMatrix;",
        
        //"uniform mat4 modelViewMatrix;",
        //"uniform mat4 projectionMatrix;",
        
		// "varying vec2 vUv;",
        "varying vec4 pos;",
        
        "varying vec4 prevPos;",
        
		"void main() {",

			//"vUv = uv;",
            "pos = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
            
            "prevPos = prevProjectionMatrix * prevModelViewMatrix * vec4( position, 1.0 );",
            
			"gl_Position = prevPos;",

		"}"

	].join("\n"),

	fragmentShader: [

		//"uniform float opacity;",

		//"uniform sampler2D tDiffuse;",

		//"varying vec2 vUv;",
        
        "varying vec4 pos;",
        "varying vec4 prevPos;",
        
		"void main() {",
        
            "vec2 a = (pos.xy / pos.w) * 0.5 + 0.5;",
            "vec2 b = (prevPos.xy / prevPos.w) * 0.5 + 0.5;",
            "vec2 oVelocity = a - b;",

			"gl_FragColor = vec4(oVelocity, 0.0, 1.);",
			//"gl_FragColor = vec4(1.,0.,0.,1.);",

		"}"

	].join("\n")

};