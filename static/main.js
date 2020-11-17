

ChequearServiceWorkerPorPWA();
//#region "PWA"
var swRegistration;
function ChequearServiceWorkerPorPWA() {
  try {
      var _HaySwInstalado = false;
      if (navigator.serviceWorker != undefined) {
          _HaySwInstalado = navigator.serviceWorker.controller != null;
      }
      if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('sw.js')
              .then(function (registration) {
                  console.warn('Service worker registrado OK!');
                  registration.addEventListener('updatefound', function () {
                      var installingWorker = registration.installing;
                      console.log('Un nuevo SW está instalándose.', installingWorker);
                      if (_HaySwInstalado) {
                          AccionSwActualizado();
                      }
                  });
              })
              .catch(function (error) {
                  console.log('Service worker registration failed:', error);
              });
      } else {
          console.log('Service workers are not supported.');
      }
  } catch (e) { console.log(e); }
}
function AccionSwActualizado() {
  try {
      // MostrarElemento("#ContenedorLoader");
      // MostrarMensajeInformativo("La aplicación se está actualizando, aguarde unos segundos...", 4, "#EB4212");
  } catch (e) { console.log(e); }
}
//#endregion