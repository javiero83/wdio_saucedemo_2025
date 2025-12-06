# Git Flow para Proyecto WDIO

Este documento resume el flujo de trabajo recomendado para tu proyecto WDIO usando Git + GitHub.

---

## 🚀 1. Ramas principales del proyecto

### **main**

* Rama estable
* Contiene código probado y funcional
* Solo recibe cambios mediante Pull Requests

### **dev**

* Rama de desarrollo
* Aquí trabajas día a día
* Todos los nuevos features salen desde aquí

---

## 🔧 2. Crear la rama `dev` (solo una vez)

```bash
git checkout -b dev
git push -u origin dev
```

---

## 🧑‍💻 3. Flujo diario de trabajo

### 1. Cambiarte a dev

```bash
git checkout dev
```

### 2. Traer lo más reciente de GitHub

```bash
git pull
```

### 3. Hacer cambios → agregar archivos → commit

```bash
git add .
git commit -m "Descripción del cambio"
```

### 4. Subir tus cambios

```bash
git push
```

---

## 🔀 4. Crear Pull Request (PR)

Cuando termines un feature:

1. Ve a tu repositorio en GitHub
2. Pulsa **Compare & Pull Request**
3. Verifica que sea:

   * **base:** main
   * **compare:** dev
4. Crea el PR
5. Haz **Merge** cuando esté listo

---

## ♻️ 5. Mantener tu entorno actualizado

Después de hacer merge de `dev → main` en GitHub:

### Actualiza tu main local

```bash
git checkout main
git pull
```

### Actualiza tu dev local con lo más reciente de main

```bash
git checkout dev
git merge main
```

(Así mantienes dev alineado con los últimos cambios.)

---

## 🗑️ 6. Limpieza opcional: borrar ramas locales

Si ya no usas una rama temporal:

```bash
git branch -d nombre-de-la-rama
```

Si existe en remoto:

```bash
git push origin --delete nombre-de-la-rama
```

---

## 🛑 7. Comandos útiles

### Ver todas las ramas

```bash
git branch -a
```

### Ver el estado

```bash
git status
```

### Ver remotos

```bash
git remote -v
```

---

## ✅ Resumen rápido

```
Trabajo diario → dev
Producción estable → main
Cambios grandes → Pull Request de dev → main
```

---

Si quieres agregar más secciones (por ejemplo: reglas para commits, manejo de conflictos, o flujos con ramas feature), puedo ampliarlo.

---

## 🧭 8. Convenciones de nombres para ramas

Usa nombres claros y consistentes:

### 🔹 Ramas de features (nuevas funciones)

```
feature/nombre-claro-de-la-funcionalidad
```

Ejemplos:

```
feature/login-tests
feature/add-cart-validation
```

### 🔹 Ramas de bugs

```
bugfix/arregla-nombre-del-issue
```

Ejemplos:

```
bugfix/fix-timeout-in-tests
bugfix/button-selector-error
```

### 🔹 Ramas de hotfix (problemas urgentes)

```
hotfix/descripcion-del-fix
```

Ejemplos:

```
hotfix/critical-login-failure
```

### 🔹 Ramas de release (opcional)

```
release/v1.0.0
```

---

## 📝 9. Reglas para escribir mensajes de commit

Un buen commit debe ser:

* Claro
* Conciso
* Describir exactamente qué cambió

### ✨ Formato recomendado

```
<tipo>: <descripción breve>
```

### Tipos sugeridos

* **feat** → nueva funcionalidad
* **fix** → corrección de bug
* **test** → cambios en pruebas
* **docs** → cambios en documentación
* **refactor** → cambio interno sin alterar comportamiento
* **chore** → tareas varias

### Ejemplos

```
feat: add login test with standard_user
fix: correct selector for inventory item
refactor: extract login method into page object
```

---

## 🔧 10. Cómo resolver conflictos de merge

Ocurren cuando dos ramas modifican la misma parte de un archivo.

### 1️⃣ Git te mostrará un mensaje de conflicto

Ejemplo típico en un archivo:

```
<<<<<< HEAD
código de tu rama actual
======
código de la otra rama
>>>>>> main
```

### 2️⃣ Elige qué sección conservar

Opciones:

* Lo tuyo
* Lo de la otra rama
* Una mezcla de ambos

### 3️⃣ Elimina las marcas y guarda el archivo

```
<<<<<<
======
>>>>>>
```

### 4️⃣ Añade y completa el merge

```bash
git add .
git commit
```

---

## 📦 11. Uso de git stash (guardar cambios sin hacer commit)

Si tienes cambios sin terminar y necesitas cambiar de rama:

### Guardar cambios temporalmente

```bash
git stash
```

### Ver lista de stashes

```bash
git stash list
```

### Recuperar el último stash

```bash
git stash pop
```

### Mantener el stash pero aplicarlo

```bash
git stash apply
```

---

## 🧱 12. Flujo extendido con ramas feature

1. Crear una rama de feature:

```bash
git checkout -b feature/nombre
```

2. Trabajar y hacer commits
3. Push al remoto:

```bash
git push -u origin feature/nombre
```

4. Crear Pull Request: `feature → dev`
5. Merge al aprobar
6. Borrar la rama:

```bash
git branch -d feature/nombre
```

---

## 🖥️ 13. Cómo clonar el proyecto en un ambiente local nuevo

Cuando necesites configurar el proyecto en una nueva computadora o entorno, sigue estos pasos:

### 1️⃣ Clonar el repositorio desde GitHub

```bash
git clone https://github.com/javiero83/wdio_saucedemo_2025.git
```

### 2️⃣ Entrar al directorio del proyecto

```bash
cd wdio_saucedemo_2025
```

### 3️⃣ Ver las ramas disponibles

```bash
git branch -a
```

### 4️⃣ Cambiarte a la rama `dev` (o la que necesites)

```bash
git checkout dev
```

Si la rama aún no existe localmente pero sí en GitHub:

```bash
git checkout -b dev origin/dev
```

### 5️⃣ Instalar dependencias del proyecto (muy importante)

Si es un proyecto WDIO con NPM:

```bash
npm install
```

Esto descargará todas las dependencias necesarias para correr las pruebas.

### 6️⃣ Probar que WDIO funciona correctamente

```bash
npx wdio run wdio.conf.js
```

### 7️⃣ Mantener el proyecto actualizado

Cada vez que vayas a trabajar:

```bash
git pull
```

Esto asegurará que tu entorno esté sincronizado con GitHub.

---

## 🧯 14. Si el proyecto cambia de configuración (ej: nueva rama main o dev)

Si clonas el proyecto y quieres asegurarte de estar alineado con las ramas remotas:

```bash
git fetch --all
```

Esto actualiza todas las referencias del repositorio remoto.

Luego puedes cambiar a cualquier rama remota:

```bash
git checkout nombre_rama
```

---

## 🚀 15. Comandos útiles al iniciar en un ambiente nuevo

### Verificar qué rama estás usando

```bash
git status
```

### Ver ramas remotas

```bash
git branch -r
```

### Descargar todos los cambios del remoto sin hacer merge

```bash
git fetch
```

### Crear una rama local basada en una remota

```bash
git checkout -b local_branch origin/remote_branch
```

---

Si quieres, puedo agregar una sección **"Checklist de instalación rápida"** en formato corto para que puedas copiar/pegar al iniciar en una máquina nueva.

---

## 📋 16. Checklist de instalación rápida (ambiente nuevo)

Para que no se te olvide nada cuando configures el proyecto en una nueva máquina:

```
1. git clone https://github.com/javiero83/wdio_saucedemo_2025.git
2. cd wdio_saucedemo_2025
3. git checkout dev
4. npm install
5. Verificar wdio.conf.js existe
6. Configurar credenciales o variables si aplica
7. Ejecutar: npx wdio run wdio.conf.js
8. Revisar que los tests corren sin errores
9. git pull (mantener dev actualizada)
10. Crear feature branch si vas a empezar trabajo
```

---

## 🛠️ 17. Configuración recomendada de VS Code para WDIO

Estas extensiones ayudan a trabajar más rápido y evitar errores:

### 🔹 Extensiones recomendadas

* **ESLint** → ayuda a mantener código limpio
* **Prettier** → formato automático
* **JavaScript and TypeScript Nightly** → mejor soporte TS
* **GitLens** → ver historial, blame, y PRs
* **DotENV** → resalta archivos `.env`
* **npm Intellisense** → autocompleta imports de node_modules

### 🔹 Ajustes sugeridos en VS Code

En *Settings → JSON* agrega:

```json
{
  "editor.formatOnSave": true,
  "files.autoSave": "onFocusChange",
  "javascript.updateImportsOnFileMove.enabled": "always",
  "typescript.updateImportsOnFileMove.enabled": "always"
}
```

---

## 🔐 18. Uso de variables de entorno (.env)

Si en algún momento el proyecto requiere credenciales:

### 1️⃣ Crear un archivo `.env` en la raíz

```
API_KEY=tu_clave
OTRO_VALOR=123
```

### 2️⃣ Instalar dotenv (si es necesario)

```bash
npm install dotenv
```

### 3️⃣ Cargar variables en WDIO (ejemplo)

En `wdio.conf.js`:

```js
require('dotenv').config();
```

Ahora puedes usar:

```js
process.env.API_KEY
```

---

## ⚠️ 19. Errores comunes al clonar y cómo resolverlos

### ❌ Error: `command not found wdio`

Solución:

```bash
npm install
```

WDIO está en node_modules.

---

### ❌ Error: `failed to push some refs`

Sucede cuando tu rama local no coincide con la remota.
Solución:

```bash
git pull --rebase
git push
```

---

### ❌ Error: `package-lock.json mismatch` después de clonar

Solución:

```bash
rm -rf node_modules
npm install
```

---

### ❌ WDIO no corre: `config not found`

Verifica que existe:

```
wdio.conf.js
```

O ejecuta:

```bash
npx wdio config
```
