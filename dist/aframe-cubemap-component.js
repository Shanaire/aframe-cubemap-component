/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	if (typeof AFRAME === 'undefined') {
	  throw new Error('Component attempted to register before AFRAME was available.');
	}

	/**
	 * Cubemap component for A-Frame.
	 */
	AFRAME.registerComponent('cubemap', {
	  schema: {
	    type: "string"
	  },

	  /**
	   * Called once when component is attached. Generally for initial setup.
	   */
	  init: function () {
	    // entity data
	    var el = this.el;
	    var data = this.data;

	    // Path to the folder containing the 6 cubemap images
	    var srcPath = data;

	    // Cubemap image files must follow this naming scheme
	    // from: http://threejs.org/docs/index.html#Reference/Textures/CubeTexture
	    var urls = [
	      'posx.jpg', 'negx.jpg',
	      'posy.jpg', 'negy.jpg',
	      'posz.jpg', 'negz.jpg'
	    ];


	    // Code that follows is adapted from "Skybox and environment map in Three.js" by Roman Liutikov
	    // http://blog.romanliutikov.com/post/58705840698/skybox-and-environment-map-in-threejs

	    // Create loader, set folder path, and load cubemap textures
	    var loader = new THREE.CubeTextureLoader();
	    loader.setPath( srcPath );

	    var cubemap = loader.load( urls );
	    cubemap.format = THREE.RGBFormat;

	    var shader = THREE.ShaderLib['cube']; // init cube shader from built-in lib
	    shader.uniforms['tCube'].value = cubemap; // apply textures to shader

	    // create shader material
	    var skyBoxMaterial = new THREE.ShaderMaterial( {
	      fragmentShader: shader.fragmentShader,
	      vertexShader: shader.vertexShader,
	      uniforms: shader.uniforms,
	      depthWrite: false,
	      side: THREE.BackSide
	    });

	    // Skybox dimensions arbitrarily set to 1000x1000x1000
	    var skyboxGeometry = new THREE.CubeGeometry(1000, 1000, 1000);

	    // Set entity's object3D
	    el.setObject3D('mesh', new THREE.Mesh(skyboxGeometry,skyBoxMaterial));

	  }
	});


/***/ }
/******/ ]);