# 🚀 Guía Completa de Despliegue y Publicación en Servidor

Esta guía te explica paso a paso cómo publicar tu sitio web **Curso de Inteligencia Artificial** en internet para que cualquier persona pueda inscribirse desde su celular o computadora.

---

## 🛠️ ¿Qué archivos necesitas subir?

Asegúrate de que la carpeta de tu proyecto contenga la siguiente estructura exacta:

```text
mipagina/
├── index.html        # Página principal
├── styles.css        # Estilos CSS minimalistas
├── script.js         # Lógica JS y validaciones
└── assets/           # Carpeta con las imágenes
    └── hero-ai.png
```

---

## 📌 Opción 1: GitHub Pages (Gratis, Fácil y Rápido)

Es la mejor opción si quieres publicar el sitio sin pagar hosting y obtener una URL pública inmediata.

### Pasos:

1. **Crea una cuenta en GitHub**: Entra a [github.com](https://github.com) y regístrate si aún no tienes cuenta.
2. **Crea un nuevo Repositorio**:
   - Da clic en el botón `+` en la esquina superior derecha ➔ `New repository`.
   - Asigna un nombre (Ejemplo: `curso-ia-landing`).
   - Elige **Public**.
   - Haz clic en **Create repository**.
3. **Sube los archivos**:
   - En la página de tu repositorio, haz clic en **uploading an existing file**.
   - Arrastra los archivos `index.html`, `styles.css`, `script.js` y la carpeta `assets/`.
   - En la parte inferior, haz clic en **Commit changes**.
4. **Activa GitHub Pages**:
   - Entra a la pestaña **Settings** (Configuración) de tu repositorio.
   - En el menú izquierdo, selecciona **Pages**.
   - En *Build and deployment* ➔ *Branch*, selecciona `main` o `master` y la carpeta `/ (root)`.
   - Haz clic en **Save**.
5. **¡Listo!** En 1 o 2 minutos, GitHub te dará un enlace público tipo:
   `https://tu-usuario.github.io/curso-ia-landing/`

---

## ⚡ Opción 2: Netlify o Vercel (Gratis + Dominio Personalizado + SSL)

Ideal si quieres publicar en menos de 1 minuto arrastrando tu carpeta o conectando un dominio propio (ejemplo: `www.cursoiapro.com`).

### Pasos con Netlify (Arrastrar y Soltar):
1. Entra a [netlify.com](https://www.netlify.com) y crea una cuenta gratuita.
2. Ve a la sección **Sites** ➔ **Add new site** ➔ **Deploy manually**.
3. Arrastra tu carpeta entera `PAGINA` a la zona indicada.
4. En 5 segundos tendrás una URL en vivo con certificado de seguridad HTTPS.

---

## 🗄️ Opción 3: Hosting Tradicional (cPanel / Hostinger / GoDaddy)

Si contrataste un hosting con cPanel (Hostinger, GoDaddy, DonWeb, Namecheap):

1. Ingresa al panel de control de tu hosting (**cPanel** o **hPanel**).
2. Abre la herramienta **Administrador de Archivos** (*File Manager*).
3. Entra a la carpeta pública principal, que casi siempre se llama `public_html`.
4. Borra cualquier archivo de prueba (como `index.php` predeterminado).
5. Haz clic en **Subir / Upload** y carga:
   - `index.html`
   - `styles.css`
   - `script.js`
   - La carpeta `assets/`
6. Abre tu dominio en el navegador (`www.tudominio.com`) y el sitio estará en vivo.

---

## 🐧 Opción 4: Servidor VPS Linux (Nginx en Ubuntu)

Si usas un VPS (DigitalOcean, Linode, AWS EC2, Vultr):

### 1. Conéctate a tu servidor por SSH:
```bash
ssh root@tu_ip_servidor
```

### 2. Instala Nginx:
```bash
sudo apt update
sudo apt install nginx -y
```

### 3. Copia tus archivos al servidor:
Sube la carpeta de tu sitio a `/var/www/curso-ia/`

### 4. Configura el bloque de sitio Nginx:
Crea el archivo `/etc/nginx/sites-available/curso-ia`:

```nginx
server {
    listen 80;
    server_name tudominio.com www.tudominio.com;

    root /var/www/curso-ia;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

### 5. Activa el sitio y reinicia Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/curso-ia /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 📩 Configuración del Formulario para Recibir Registros Reales

Actualmente el formulario valida los datos y muestra una confirmación bonita en pantalla. Para que **los registros te lleguen a una Hoja de Cálculo de Google Sheets gratis**:

### Pasos rápidos con Google Sheets:
1. Abre [Google Sheets](https://sheets.new) y crea una hoja con encabezados en la Fila 1:
   `Nombre | Email | Telefono | Organizacion | Profesion | Edad | Ciudad | Experiencia | Fuente | Expectativas | Fecha`
2. Ve a **Extensiones ➔ Apps Script**.
3. Pega este código:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.nombre,
    data.email,
    data.telefono,
    data.organizacion,
    data.profesion,
    data.edad,
    data.ciudad,
    data.experiencia,
    data.fuente,
    data.expectativas,
    new Date()
  ]);
  return ContentService.createTextOutput(JSON.stringify({"result": "success"}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Haz clic en **Implementar ➔ Nueva implementación**.
5. Selecciona **Aplicación Web**, en *Quién tiene acceso* elige **Cualquier persona**.
6. Copia la **URL de la aplicación web** generada.
7. En tu archivo `script.js`, reemplaza la función `sendRegistrationDataToBackend`:

```javascript
async function sendRegistrationDataToBackend(payload) {
    const GOOGLE_SCRIPT_URL = "TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI";
    await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
}
```

---

## 🎯 Verificación Final Antes de Lanzar

- [x] Probar que el formulario no permita enviar campos vacíos.
- [x] Verificar que el botón de WhatsApp abra correctamente tu número.
- [x] Probar la vista en celular y computadora.
- [x] Confirmar que las imágenes de la carpeta `assets/` se carguen bien.
