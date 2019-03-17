const path = require('path')
navigator.serviceWorker.getRegistrations().then(registrations => {
   for(let registration of registrations) {
      registration.unregister();
   }
});
onload = ()=>{
	const titleEl = document.querySelector('.window-title');
	if (titleEl && titleEl.innerHTML.includes('Google Chrome 36+')) {
		console.log("Reloading page")
	    window.location.reload(); //Reloads the page if the page shows the error
	}else{
		console.log("Loading scripts")		
		require(path.join(__dirname, 'logic.js'))
		
		
	}
}

