# Snacks Point — guía para editar el sitio

Oscar, este proyecto contiene el código del HTML que adjuntaste, separado y
comentado para que puedas editarlo. Conserva su contenido, imágenes, estilos y
lógica. No requiere instalar paquetes, usar una terminal ni contratar un servidor
para abrirlo en tu computadora.

## 1. Abre el proyecto

1. Extrae todo el ZIP en una carpeta de tu computadora. No trabajes dentro del ZIP.
2. Abre Visual Studio Code y elige **Archivo → Abrir carpeta**. Selecciona la carpeta
   que contiene `index.html`.
3. Desde el explorador de archivos de tu computadora, haz doble clic en
   `index.html` para abrir la página en tu navegador.
4. Mantén el editor y el navegador abiertos. Cada vez que cambies algo, guarda
   con **Ctrl + S** y actualiza el navegador con **Ctrl + R**.

En Mac, usa Cmd en lugar de Ctrl. Puedes usar otro editor de código si ya tienes
uno. Conserva la codificación UTF-8 para que se vean bien acentos y símbolos.

## 2. Qué contiene cada archivo

| Archivo | Qué puedes cambiar |
| --- | --- |
| `index.html` | Textos, secciones, productos, precios, teléfonos y enlaces. |
| `styles.css` | Colores, tamaños, espacios, distribución y reglas para celular. |
| `script.js` | Transición, zoom, navegación, buscador y simulador. |
| `assets/logo.png` | Logotipo extraído del HTML original. |
| `assets/maquina-isometrica.png` | Imagen usada al inicio. |
| `assets/maquina-frontal.png` | Imagen usada durante la segunda parte de la animación. |
| `LEEME.md` | Esta guía. |

Mi recomendación es comenzar por textos, seguir con colores y después ajustar la
animación. Haz un cambio a la vez para identificar fácilmente su efecto.

## 3. Primer cambio: el título principal

Abre `index.html`, presiona **Ctrl + F** y busca `Conoce la máquina`.
Encontrarás esta línea:

```html
<h1>Conoce la máquina <em>desde adentro.</em></h1>
```

Reemplázala por:

```html
<h1>Snacks y bebidas <em>sin complicaciones.</em></h1>
```

Guarda el archivo y actualiza el navegador. El texto dentro de `<em>` usa el
color naranja definido en el diseño. Cambia las palabras conservando las etiquetas.

Para modificar otros textos, búscalos tal como aparecen en la página.

## 4. Cambiar colores y tamaños

Al inicio de `styles.css` encontrarás las variables de color:

```css
:root {
  --bg: #080808;
  --text: #f7f7f4;
  --orange: #ff7a00;
  --orange2: #ff9d22;
}
```

Este es un extracto: edita los valores en el bloque que ya existe. Por ejemplo,
puedes cambiar `--orange: #ff7a00;` por `--orange: #ff8500;`.

Algunos colores están escritos directamente en sus reglas. La pantalla azul del
archivo original se controla con `.screen`, `.screen-top`, `.screen h2`,
`.screen p` y `.screen-footer`; cambiar `--orange` no cambia esa pantalla.

Para probar una pantalla naranja, puedes añadir al **final** de `styles.css`:

```css
/* Personalización opcional de la pantalla */
.screen {
  background: linear-gradient(145deg, #ff9d22, #ff7a00);
  color: #17100a;
  border-color: #b74f00;
  box-shadow: 0 0 26px rgba(255, 122, 0, 0.2);
}

.screen-top,
.screen p,
.screen-footer {
  color: #241307;
}

.screen h2 {
  text-shadow: none;
}
```

Es un cambio opcional; el proyecto entregado conserva los colores originales.

Para ajustar tamaños, busca estos selectores:

| Selector | Controla |
| --- | --- |
| `.story-copy h1` | Título principal. |
| `.machine-img` | Tamaño y posición de la máquina. |
| `.console-wrap` | Ancho y posición del menú. |
| `.key` | Tamaño y aspecto de los botones. |
| `.section` | Espacio vertical entre secciones. |

## 5. Cambiar imágenes

Puedes reemplazar los archivos de `assets` conservando exactamente el nombre y
la extensión, o cambiar su ruta en el atributo `src` de `index.html`:

```html
<img class="machine-img machine-front" id="front"
     src="assets/maquina-frontal.png"
     alt="Vista frontal de la máquina Hibou 52 Mixta">
```

Usa rutas relativas como `assets/maquina-frontal.png`, no rutas de tu computadora
como `C:\\Usuarios\\...`. Al mover o compartir el proyecto, incluye la carpeta completa.

**Sobre las dos vistas:** el HTML adjunto utiliza la misma imagen para la vista
isométrica y la frontal. Se extrajeron ambas con nombres diferentes para que
puedas sustituirlas por separado. La transición actual mezcla sus transparencias;
para mostrar una vista frontal real debes reemplazar `maquina-frontal.png`.
Además, la consola del menú es una capa de HTML independiente que aparece al
final del acercamiento. Cambiar solo la imagen puede requerir reajustar el zoom
para alinear el panel.

## 6. Editar los botones del menú

En `index.html`, cada botón indica su destino con `data-go`:

```html
<button class="key" data-go="tecnica"><b>01</b><span>Información técnica</span></button>
```

El destino es una sección con el mismo identificador:

```html
<section class="section alt" id="tecnica">
```

Puedes editar el número y el texto del botón. Si cambias el destino, mantén la
coincidencia entre `data-go` e `id`.

| Destino | Sección |
| --- | --- |
| `tecnica` | Información técnica. |
| `ventajas` | Ventajas y operación. |
| `pagos` | Sistemas de pago. |
| `catalogo` | Catálogo y precios. |
| `negociacion` | Propuestas de negociación. |
| `monitoreo` | Monitoreo remoto. |
| `contacto` | Contacto. |

## 7. Productos, precios y contacto

Busca el nombre de un producto en `index.html`. Cada producto tiene esta forma:

```html
<div class="product" data-name="arizona"><span>Arizona</span><b>$25</b></div>
```

- Cambia `$25` para editar el precio visible.
- Cambia `Arizona` para editar el nombre visible.
- Actualiza también `data-name` en minúsculas: el buscador utiliza ese valor.
- Para agregar un producto, copia un bloque `.product` completo dentro de
  `catalogGrid`. Actualiza el texto inicial `18 productos` de `productCount`;
  después de escribir en el buscador, el contador se calcula automáticamente.

En contacto, cambia tanto el número visible como el enlace `href`.
En los enlaces de WhatsApp del archivo se usan dígitos con código de país,
sin espacios ni `+`; en los enlaces de llamada se usa `tel:+...`.

## 8. Ajustar la animación

La función `updateStory()` está en `script.js`. Su variable `p` va de 0 a 1
y representa qué tanto has avanzado por la sección inicial.

| Parte del código | Efecto actual |
| --- | --- |
| `(p - .16) / .26` | La mezcla de imágenes comienza al 16% y termina al 42%. |
| `(p - .42) / .42` | El acercamiento comienza al 42% y termina al 84%. |
| `1 + z * 3.35` | La escala final es 4.35 veces el tamaño inicial. |
| `-z * 33` | Desplaza la imagen hacia la izquierda durante el zoom. |
| `z * 24` | Desplaza la imagen hacia abajo durante el zoom. |
| `(p - .78) / .15` | El menú aparece entre el 78% y el 93% del recorrido. |

El punto de origen del zoom también depende de `transform-origin` en la regla
`.machine-front` de `styles.css`.

Para alargar o acortar el recorrido, busca `.scroll-story` en `styles.css`:
usa `height: 420vh` en la regla general y `height: 360vh` en celular.
Aumentar la altura hace que se necesite más desplazamiento para completar la
secuencia. Mantén la altura por encima de `100vh`.

Estas modificaciones requieren comprobar tanto el inicio como el final de la
animación en pantalla ancha y estrecha. La adaptación móvil existente está
conservada; no se ha rediseñado la transición en esta entrega de código.

## 9. Editar el simulador

El simulador utiliza las condiciones del **primer año**. Sus fórmulas están
en la función `calc()` de `script.js`:

```js
commissionResult.textContent = money(v * .20);
mixedResult.textContent = money(3000 + v * .10)
```

`v` es el estimado de ventas mensuales; `.20` equivale a 20% y `.10` a 10%.
Si cambias las condiciones, actualiza también los textos de las propuestas en
`index.html`. La renta fija de `$5,000` está escrita en el HTML: no la calcula
JavaScript. Los textos del segundo año tampoco controlan estas fórmulas.

## 10. Revisar la versión para celular

En `styles.css` están agrupadas las reglas para anchuras de hasta `900px` y
`560px`. Las reglas posteriores pueden reemplazar las generales.

Puedes empezar estrechando la ventana del navegador. En Chrome o Edge también
puedes abrir las herramientas de desarrollo con **F12** y activar la barra de
dispositivos con **Ctrl + Shift + M**. Esto simula tamaños de pantalla, pero conviene
revisar después la página en un teléfono real.

Comprueba que los textos se lean, el menú se pueda usar, las imágenes queden
alineadas y los botones lleven a la sección correcta.

## 11. Si un cambio no aparece

- Guarda el archivo correcto y confirma que el navegador abrió el `index.html`
  de esa misma carpeta.
- Actualiza la página; si conserva estilos antiguos, prueba **Ctrl + Shift + R**.
- Si falta el diseño, revisa que `styles.css` siga junto a `index.html`.
- Si falta una imagen, revisa su nombre, extensión y ruta `assets/...`.
- Si deja de funcionar un botón, revisa `data-go` y el `id` de destino.
- Usa **Ctrl + Z** en el editor para deshacer tu último cambio.

Editar estos archivos cambia tu copia local. Una dirección web publicada necesita
una publicación posterior para mostrar tus cambios. Este paquete es un sitio
estático: no incluye servidor, base de datos ni un sistema real de cobros.
