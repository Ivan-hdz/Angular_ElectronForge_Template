# Angular +  Electron Forge Template
## Para desarrollo
### Paso 1
Correr el proyecto de angular con:
- ``npm start``

### Paso 2
Correr el proyecto de electron con:
- ``cd navegador-seguro``
- ``npm start``

## Para producción
### Paso 1
Compilar la aplicación de angular con:
- ``npm run build``

### Paso 2
Cambiar la bandera 'develop' a false del archivo: 
'./navegador-seguro/src/environments.ts'

### Paso 3
Empaquetar con electron forge con:
- ``npm run make``
