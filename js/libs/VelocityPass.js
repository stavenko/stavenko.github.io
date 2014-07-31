/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.VelocityPass = function (scene, camera, renderTarget , clearColor, clearAlpha) {

    this.scene = scene;
    this.camera = camera;
	velocityMat = new THREE.ShaderMaterial( THREE.VelocityShader );
    
    velocityMat.customUniformUpdate = function(obj, mat, _gl){
        
        // console.log("gotcha");
        var new_m = obj.matrixWorld;
        var p_uniforms = mat.program.uniforms;
        var mvMatrix = camera.matrixWorldInverse.clone().multiplyMatrices(camera.matrixWorldInverse, obj._oldMatrix );
        
        _gl.uniformMatrix4fv( p_uniforms.prevModelViewMatrix, false,  mvMatrix.elements );
        _gl.uniformMatrix4fv( p_uniforms.prevProjectionMatrix, false, camera.projectionMatrix.elements );
        obj._pass_complete = true; // Необходимо сохранять состояние старой матрицы пока не отрисуется этот пасс. 
                                   // А то матрицы обновляются каждый рендеринг сцены.
    }
    
	this.renderTarget = renderTarget;

	if ( this.renderTarget === undefined ) {

		this.renderTargetParameters = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat, stencilBuffer: false };
		this.renderTarget = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, this.renderTargetParameters );

	}
    

	this.overrideMaterial = velocityMat;

	this.clearColor = 0x000000;
	this.clearAlpha = ( clearAlpha !== undefined ) ? clearAlpha : 1;

	this.oldClearColor = new THREE.Color();
	this.oldClearAlpha = 1;

	this.enabled = true;
	this.clear = true;
	this.needsSwap = false;

};

THREE.VelocityPass.prototype = {

	render: function ( renderer, writeBuffer, readBuffer, delta ) {

		this.scene.overrideMaterial = this.overrideMaterial;

		if ( this.clearColor ) {

			this.oldClearColor.copy( renderer.getClearColor() );
			this.oldClearAlpha = renderer.getClearAlpha();

			renderer.setClearColor( this.clearColor, this.clearAlpha );

		}
       	renderer.render( this.scene, this.camera, this.renderTarget, this.clear );

		if ( this.clearColor ) {

			renderer.setClearColor( this.oldClearColor, this.oldClearAlpha );

		}

		this.scene.overrideMaterial = null;

	}

};