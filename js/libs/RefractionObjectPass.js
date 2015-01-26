/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.RefractionObjectPass = function ( scene, camera, overrideMaterial, clearColor, clearAlpha ) {

	this.scene = scene;
	this.camera = camera;
    
    this.refractScene = new THREE.Scene();

	this.overrideMaterial = overrideMaterial;

	this.clearColor = clearColor;
	this.clearAlpha = ( clearAlpha !== undefined ) ? clearAlpha : 1;

	this.oldClearColor = new THREE.Color();
	this.oldClearAlpha = 1;

	this.enabled = true;
	this.clear = true;
	this.needsSwap = false;
    
    for(var i in scene.children){
        var ch = scene.children[i];
        if(ch instanceof THREE.Mesh){
            if(ch.material.name == 'refract'){
                this.scene.remove(ch);
                this.refractScene.add(ch);
                
            }
            
        } 
    }

};

THREE.RefractionObjectPass.prototype = {

	render: function ( renderer, writeBuffer, readBuffer, delta ) {

		this.refractScene.overrideMaterial = this.overrideMaterial;

		if ( this.clearColor ) {

			this.oldClearColor.copy( renderer.getClearColor() );
			this.oldClearAlpha = renderer.getClearAlpha();

			renderer.setClearColor( this.clearColor, this.clearAlpha );

		}

		renderer.render( this.refractScene, this.camera, readBuffer, this.clear );

		if ( this.clearColor ) {

			renderer.setClearColor( this.oldClearColor, this.oldClearAlpha );

		}

		this.refractScene.overrideMaterial = null;

	}

};