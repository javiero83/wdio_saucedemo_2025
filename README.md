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
