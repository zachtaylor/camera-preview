import './style.css'
import { Directory, Filesystem } from '@capacitor/filesystem'
import { Toast } from '@capacitor/toast'
import { CameraPreview, CameraPreviewOptions } from '../../dist/esm/index.js'

const app = document.querySelector<HTMLDivElement>('#app')!

const cameraPreviewOpts: CameraPreviewOptions = {
  parent: 'cameraPreview',
  position: 'rear',
  className: 'camera-preview',
  storeToFile: false,
  disableAudio: true,
  enableHighResolution: true,
  enableZoom: true,
  toBack: true,
};

setTimeout(() => {
  app.querySelector<HTMLButtonElement>('#startCamera')!.addEventListener('click', async () => {
    try {
      await CameraPreview.start(cameraPreviewOpts)
    }
    catch (e) {
      console.error(e)
    }
  })
  app.querySelector<HTMLButtonElement>('#cameraCapture')!.addEventListener('click', async () => {
    try {
      const result = await CameraPreview.capture({})
      console.log(result)

      // Save the captured image to the default Android images folder
      const fileName = `image_${new Date().getTime()}.jpg`
      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: result.value,
        directory: Directory.Documents,
      })
      await Toast.show({
        text: 'File saved',
      })

      console.log('Saved image:', savedFile)
    }
    catch (e) {
      console.error(e)
    }
  })
  app.querySelector<HTMLButtonElement>('#flipCamera')!.addEventListener('click', async () => {
    try {
      await CameraPreview.flip()
    }
    catch (e) {
      console.error(e)
    }
  })
  app.querySelector<HTMLButtonElement>('#stopCamera')!.addEventListener('click', async () => {
    try {
      await CameraPreview.stop()
    }
    catch (e) {
      console.error(e)
    }
  })
}, 1000)

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
  <div id="cameraPreview"></div>
  <div class="button-container">
    <button id="cameraCapture" class="camera-button">Capture image</button>
    <button id="startCamera" class="camera-button">Start Camera</button>
    <button id="stopCamera" class="camera-button">Stop Camera</button>
    <button id="flipCamera" class="camera-button">Flip Camera</button>
  </div>
`
