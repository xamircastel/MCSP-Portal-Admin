# Documento Funcional: Panel de Administración - Gamificación

## MCSP - Master Content & Services Provider

<img src="file:///C:/Users/XCAST/OneDrive/Escritorio/logonewry.png" title="" alt="**Innovación en Soluciones Móviles**" data-align="center">

---

## Información del Documento

| Campo       | Detalle                                                    |
| ----------- | ---------------------------------------------------------- |
| **Título**  | Documento Funcional - Panel de Administración Gamificación |
| **Versión** | 1.0                                                        |
| **Fecha**   | 17/10/2025                                                 |
| **Autor**   | Xamir Castelblanco                                         |
| **Estado**  | V.1.0 - Documento Funcional                                |

---

## 1. Descripción General

### 1.1 Objetivo de la Funcionalidad

Proveer una interfaz de administración centralizada que permita configurar todos los parámetros del módulo de gamificación del MCSP. Esta herramienta permitirá a los administradores gestionar la asignación de puntos, niveles de usuario, multiplicadores y todas las actividades que conforman el ecosistema de gamificación.

### 1.2 Alcance

El panel de administración abarca la configuración de:

- **Configuración General**: Valor monetario del punto y parámetros globales
- **Niveles de Usuario**: Rangos de puntos y multiplicadores por nivel
- **Minijuegos**: Puntos máximos diarios por juego
- **Interacciones y Frecuencia**: Puntos por login, registro, contrataciones, recargas
- **Misiones y Desafíos**: Configuración de misiones y recompensas
- **Ecosistema de Canje**: Productos telco, vouchers digitales y premios físicos

---

## 2. Configuración General del Sistema

### 2.1 Valor Monetario del Punto

**Descripción**: Configuración que establece la equivalencia entre puntos y valor monetario.

**Parámetros configurables**:

| Campo                      | Tipo     | Descripción                          | Ejemplo  |
| -------------------------- | -------- | ------------------------------------ | -------- |
| **Valor en USD por Punto** | Decimal  | Equivalencia monetaria de cada punto | 0.01 USD |
| **Moneda**                 | Selector | Moneda de referencia                 | USD      |

**Cálculo automático**: El sistema mostrará automáticamente cuánto representan X puntos en dinero.

**Ejemplo**:

- Configuración: 1 punto = 0.01 USD
- Usuario con 1000 puntos = 10 USD equivalentes

---

## 3. Configuración de Niveles de Usuario

### 3.1 Rangos de Puntos por Nivel

**Descripción**: Definición de los rangos de puntos acumulados que determinan cada nivel de usuario.

**Parámetros configurables**:

| Nivel      | Campo          | Tipo   | Descripción      | Valor por Defecto |
| ---------- | -------------- | ------ | ---------------- | ----------------- |
| **Bronce** | Puntos mínimos | Número | Inicio del rango | 0                 |
| **Bronce** | Puntos máximos | Número | Fin del rango    | 1000              |
| **Silver** | Puntos mínimos | Número | Inicio del rango | 1001              |
| **Silver** | Puntos máximos | Número | Fin del rango    | 2000              |
| **Gold**   | Puntos mínimos | Número | Inicio del rango | 2001              |
| **Gold**   | Puntos máximos | Número | Fin del rango    | Ilimitado         |

**Validaciones**:

- Los rangos no deben superponerse
- Punto máximo de un nivel debe ser menor que punto mínimo del siguiente
- Los cambios aplican inmediatamente para recalcular niveles de usuarios activos

### 3.2 Multiplicadores por Nivel

**Descripción**: Factores de multiplicación que se aplican a los puntos base según el nivel del usuario.

**Parámetros configurables**:

| Nivel      | Campo         | Tipo    | Descripción              | Valor por Defecto |
| ---------- | ------------- | ------- | ------------------------ | ----------------- |
| **Bronce** | Multiplicador | Decimal | Factor de multiplicación | 1.0               |
| **Silver** | Multiplicador | Decimal | Factor de multiplicación | 1.5               |
| **Gold**   | Multiplicador | Decimal | Factor de multiplicación | 2.0               |

**Validaciones**:

- Valor mínimo: 1.0 para todos los niveles
- Valor máximo recomendado: 5.0
- Multiplicador Silver debe ser ≥ Bronce
- Multiplicador Gold debe ser ≥ Silver

**Aplicación**:

- Los cambios aplican inmediatamente para nuevas transacciones
- Los puntos ya otorgados no se recalculan

---

## 4. Configuración de Minijuegos

### 4.1 Arquitectura de Gestión de Minijuegos

**Decisión Arquitectónica**: Según reunión del 21/10/2025, debido a limitaciones tecnológicas y arquitectónicas, la administración completa de minijuegos se realizará en la **plataforma Way**.

**Gestión en Way** incluye:

- Carga de imágenes de minijuegos
- Configuración de nombres y títulos descriptivos
- Establecimiento de fechas de caducidad
- Configuración de puntos por respuesta correcta (estándar actual)
- Cantidad de preguntas diarias permitidas (estándar actual)
- Activación/desactivación de minijuegos

### 4.2 Visualización en Telco

**Sección de Gamificación en Telco**: La visión Telco mostrará únicamente una sección informativa de "Gamificación" que incluye:

| Campo Mostrado        | Descripción                                  | Origen |
| --------------------- | -------------------------------------------- | ------ |
| **Estado del Juego**  | Activo/Inactivo                              | Way    |
| **Título del Juego**  | Nombre descriptivo del minijuego             | Way    |
| **Descripción**       | Detalle del funcionamiento del juego         | Way    |
| **Puntos por Acción** | Cantidad de puntos que otorga cada actividad | Way    |
| **Límite Diario**     | Máximo de preguntas/intentos por día         | Way    |

**Proceso de Edición**: Para cualquier modificación desde la visión Telco:

1. Se creará un ticket interno
2. La gestión se realizará a través de Way
3. Los cambios se reflejarán en la visualización Telco

**Consideración**: Este enfoque representa trabajo adicional (doble gestión) pero es necesario por las limitaciones arquitectónicas actuales.

### 4.3 Parámetros Configurables (Gestionados desde Way)

**Configuración Estándar Actual**:

| Minijuego            | Campo               | Tipo   | Descripción                   | Valor por Defecto |
| -------------------- | ------------------- | ------ | ----------------------------- | ----------------- |
| **Quiz Interactivo** | Puntos por pregunta | Número | Puntos por respuesta correcta | 10                |
| **Quiz Interactivo** | Preguntas diarias   | Número | Máximo de preguntas por día   | 10                |
| **Quiz Interactivo** | Estado              | Toggle | Activar/Desactivar            | Activo            |
| **Palabra Premiada** | Puntos por juego    | Número | Puntos por completar palabra  | 80                |
| **Palabra Premiada** | Intentos diarios    | Número | Máximo intentos por día       | 1                 |
| **Palabra Premiada** | Estado              | Toggle | Activar/Desactivar            | Activo            |

**Nota**: Se mantiene el estándar actual de parametrizar puntos por respuesta correcta y cantidad de preguntas/intentos diarios, según confirmación en reunión del 21/10/2025.

---

## 5. Configuración de Recompensas por Interacciones

### 5.1 Login Diario

**Descripción**: Puntos otorgados al usuario por realizar el primer login del día.

**Parámetros configurables**:

| Campo                     | Tipo   | Descripción                       | Valor por Defecto |
| ------------------------- | ------ | --------------------------------- | ----------------- |
| **Puntos por Login**      | Número | Cantidad de puntos base           | 50                |
| **Estado**                | Toggle | Activar/Desactivar recompensa     | Activo            |
| **Aplicar Multiplicador** | Toggle | Si aplica multiplicador por nivel | Activo            |

**Reglas**:

- Solo se otorgan puntos en el primer login del día
- Los puntos se acreditan automáticamente

### 5.2 Registro en el Portal

**Descripción**: Puntos de bienvenida otorgados al completar el registro.

**Parámetros configurables**:

| Campo                     | Tipo   | Descripción                       | Valor por Defecto |
| ------------------------- | ------ | --------------------------------- | ----------------- |
| **Puntos por Registro**   | Número | Cantidad de puntos                | 500               |
| **Estado**                | Toggle | Activar/Desactivar recompensa     | Activo            |
| **Aplicar Multiplicador** | Toggle | Si aplica multiplicador por nivel | Inactivo          |

**Nota**: Por defecto, el multiplicador NO aplica al registro ya que todos los usuarios inician en nivel Bronce.

### 5.3 Contratación de Suscripciones y Compras One-Shot

**Descripción**: Puntos otorgados por cada contratación o compra realizada.

**Parámetros configurables**:

| Campo                      | Tipo   | Descripción                       | Valor por Defecto |
| -------------------------- | ------ | --------------------------------- | ----------------- |
| **Puntos por Suscripción** | Número | Puntos fijos por suscripción      | 200               |
| **Puntos por One-Shot**    | Número | Puntos fijos por compra única     | 150               |
| **Estado**                 | Toggle | Activar/Desactivar recompensa     | Activo            |
| **Aplicar Multiplicador**  | Toggle | Si aplica multiplicador por nivel | Activo            |

**Reglas**:

- Cantidad fija de puntos por transacción exitosa
- Solo aplica en contratación inicial, no en renovaciones

### 5.4 Permanencia Activa en Múltiples Servicios

**Descripción**: Configuración de triggers que otorgan puntos por mantener múltiples suscripciones activas durante un período específico.

**Interfaz de Configuración**:

La sección incluirá:

- Lista de triggers activos
- Botón "Crear Nuevo Trigger"
- Opciones de editar/eliminar triggers existentes

**Parámetros para Crear Trigger**:

| Campo                         | Tipo              | Descripción                       | Ejemplo       |
| ----------------------------- | ----------------- | --------------------------------- | ------------- |
| **Nombre del Trigger**        | Texto             | Identificador descriptivo         | "Duo 30 días" |
| **Cantidad de Suscripciones** | Número (selector) | Servicios activos requeridos      | 2             |
| **Período de Permanencia**    | Número            | Días de permanencia continua      | 30            |
| **Puntos a Entregar**         | Número            | Recompensa al cumplir             | 300           |
| **Estado**                    | Toggle            | Activar/Desactivar trigger        | Activo        |
| **Aplicar Multiplicador**     | Toggle            | Si aplica multiplicador por nivel | Activo        |

**Ejemplo de Configuración**:

```
Trigger 1:
- Nombre: "Duo 30 días"
- Suscripciones: 2
- Permanencia: 30 días
- Puntos: 300
- Estado: Activo

Trigger 2:
- Nombre: "Trio 60 días"
- Suscripciones: 3
- Permanencia: 60 días
- Puntos: 600
- Estado: Activo
```

**Validaciones**:

- Mínimo 1 suscripción
- Mínimo 1 día de permanencia
- No pueden existir dos triggers idénticos (misma cantidad de suscripciones y días)

### 5.5 Recargas de Saldo

**Descripción**: Puntos otorgados por cada recarga de saldo notificada por la operadora.

**Parámetros configurables**:

| Campo                     | Tipo   | Descripción                       | Valor por Defecto |
| ------------------------- | ------ | --------------------------------- | ----------------- |
| **Puntos por Recarga**    | Número | Cantidad fija de puntos           | 50                |
| **Estado**                | Toggle | Activar/Desactivar recompensa     | Activo            |
| **Aplicar Multiplicador** | Toggle | Si aplica multiplicador por nivel | Activo            |

**Reglas**:

- Puntos fijos independientes del monto de recarga
- Solo para usuarios activos (no de baja NUA)

---

## 6. Configuración de Misiones y Desafíos

### 6.1 Misión de Producto Específico

**Descripción**: Configuración de misiones que requieren la contratación de un producto particular.

**Interfaz de Configuración**:

- Lista de misiones activas de producto específico
- Botón "Crear Nueva Misión de Producto"
- Opciones de editar/eliminar/duplicar misiones

**Parámetros para Crear Misión**:

| Campo                     | Tipo        | Descripción                       | Ejemplo                             |
| ------------------------- | ----------- | --------------------------------- | ----------------------------------- |
| **Nombre de la Misión**   | Texto       | Título descriptivo                | "Descubre Netflix"                  |
| **Descripción**           | Texto largo | Detalle de la misión              | "Contrata Netflix Premium este mes" |
| **Producto**              | Selector    | Producto específico requerido     | Netflix Premium                     |
| **ID Producto**           | Texto       | Se autocompleta al seleccionar    | PROD_025                            |
| **Puntos a Entregar**     | Número      | Recompensa al completar           | 500                                 |
| **Fecha de Caducidad**    | Fecha       | Cuándo expira la misión           | 31/12/2025                          |
| **Estado**                | Toggle      | Activar/Desactivar misión         | Activo                              |
| **Aplicar Multiplicador** | Toggle      | Si aplica multiplicador por nivel | Activo                              |

**Capacidades**:

- Crear múltiples misiones simultáneas para diferentes productos
- Cada producto puede tener asignación de puntos independiente
- Configuración de fecha de inicio y caducidad

### 6.2 Misión de Cantidad de Productos

**Descripción**: Configuración de misiones que requieren contratar una cantidad específica de productos.

**Interfaz de Configuración**:

- Lista de misiones activas de cantidad
- Botón "Crear Nueva Misión de Cantidad"
- Opciones de editar/eliminar/duplicar misiones

**Parámetros para Crear Misión**:

| Campo                     | Tipo        | Descripción                       | Ejemplo                                   |
| ------------------------- | ----------- | --------------------------------- | ----------------------------------------- |
| **Nombre de la Misión**   | Texto       | Título descriptivo                | "Compra 3 Servicios"                      |
| **Descripción**           | Texto largo | Detalle de la misión              | "Realiza 3 compras on demand esta semana" |
| **Cantidad de Productos** | Número      | Productos requeridos              | 3                                         |
| **Tipo de Productos**     | Selector    | Cualquiera / Categoría específica | Cualquier producto                        |
| **Puntos a Entregar**     | Número      | Recompensa al completar           | 300                                       |
| **Fecha de Caducidad**    | Fecha       | Cuándo expira la misión           | 31/12/2025                                |
| **Estado**                | Toggle      | Activar/Desactivar misión         | Activo                                    |
| **Aplicar Multiplicador** | Toggle      | Si aplica multiplicador por nivel | Activo                                    |

**Capacidades**:

- Crear múltiples misiones con diferentes cantidades (2 productos, 3 productos, etc.)
- Cada misión con asignación de puntos independiente
- Permite misiones simultáneas con diferentes objetivos

**Ejemplo de Configuración**:

```
Misión 1:
- Nombre: "Compra 2 Servicios"
- Cantidad: 2 productos
- Puntos: 200
- Caducidad: 30/11/2025

Misión 2:
- Nombre: "Compra 3 Servicios"
- Cantidad: 3 productos
- Puntos: 400
- Caducidad: 31/12/2025
```

---

## 7. Configuración del Ecosistema de Canje

### 7.1 Productos Telco

**Descripción**: Configuración de productos telco canjeables con puntos, agrupados en tres categorías.

**Interfaz de Configuración**:

- Tres pestañas: Minutos, MegaBytes, SMS
- Lista de productos configurados en cada categoría
- Botón "Crear Nuevo Producto Telco"

**Parámetros para Crear Producto Telco**:

| Campo                   | Tipo        | Descripción                     | Ejemplo                                    |
| ----------------------- | ----------- | ------------------------------- | ------------------------------------------ |
| **Categoría**           | Selector    | Tipo de producto                | Minutos / MegaBytes / SMS                  |
| **Nombre del Producto** | Texto       | Título descriptivo              | "Bono 100 Minutos"                         |
| **Cantidad**            | Número      | Cantidad del bono               | 100                                        |
| **Unidad**              | Texto       | Se autocompleta según categoría | Minutos / MB / SMS                         |
| **Puntos Requeridos**   | Número      | Costo en puntos                 | 500                                        |
| **Descripción**         | Texto largo | Detalle del producto            | "100 minutos a cualquier destino nacional" |
| **Estado**              | Toggle      | Disponible/No disponible        | Activo                                     |
| **Stock**               | Selector    | Ilimitado / Limitado            | Ilimitado                                  |
| **Cantidad en Stock**   | Número      | Si stock es limitado            | 1000                                       |

**Ejemplo de Configuración por Categoría**:

**Minutos**:

```
- Bono 50 Minutos: 250 puntos
- Bono 100 Minutos: 500 puntos
- Bono 200 Minutos: 900 puntos
```

**MegaBytes**:

```
- Bono 500 MB: 300 puntos
- Bono 1 GB: 550 puntos
- Bono 3 GB: 1500 puntos
```

**SMS**:

```
- Bono 50 SMS: 200 puntos
- Bono 100 SMS: 350 puntos
- Bono 200 SMS: 600 puntos
```

### 7.2 Productos Digitales (Vouchers)

**Descripción**: Configuración de vouchers digitales canjeables con puntos.

**Interfaz de Configuración**:

- Lista de vouchers digitales disponibles
- Botón "Crear Nuevo Voucher"
- Filtros por categoría, estado, puntos

**Parámetros para Crear Voucher**:

| Campo                     | Tipo        | Descripción              | Ejemplo                                           |
| ------------------------- | ----------- | ------------------------ | ------------------------------------------------- |
| **Nombre (Titular)**      | Texto       | Nombre del voucher       | "Descuento 20% Amazon"                            |
| **Descripción Detallada** | Texto largo | Información completa     | "Cupón de descuento del 20% válido en Amazon.com" |
| **Categoría**             | Selector    | Tipo de voucher          | E-commerce / Entretenimiento / Comida             |
| **Imagen del Voucher**    | Archivo     | Imagen descriptiva       | voucher_amazon.jpg                                |
| **Puntos Requeridos**     | Número      | Costo en puntos          | 1000                                              |
| **Valor del Voucher**     | Número      | Valor monetario real     | 10 USD                                            |
| **Stock**                 | Selector    | Ilimitado / Limitado     | Limitado                                          |
| **Cantidad en Stock**     | Número      | Vouchers disponibles     | 500                                               |
| **Estado**                | Toggle      | Disponible/No disponible | Activo                                            |
| **Fecha de Vencimiento**  | Fecha       | Validez del voucher      | 31/12/2025                                        |

**Funcionalidad de Carga Masiva**:

**Botón**: "Cargar Vouchers Masivamente"

**Proceso**:

1. Descargar plantilla CSV con formato requerido
2. Completar plantilla con códigos de vouchers
3. Cargar archivo CSV
4. Sistema valida formato y códigos únicos
5. Confirmación de cantidad de vouchers cargados

**Formato CSV**:

```csv
codigo_voucher,fecha_vencimiento,estado
AMZN-XXXX-YYYY-ZZZZ,31/12/2025,activo
AMZN-AAAA-BBBB-CCCC,31/12/2025,activo
```

**Gestión de Inventario**:

- Contador de vouchers disponibles vs canjeados
- Alertas cuando stock < 10% del total
- Historial de canjes por usuario

### 7.3 Premios Físicos (Sorteos)

**Descripción**: Configuración de premios físicos a sortear mediante tickets comprados con puntos.

**Interfaz de Configuración**:

- Lista de sorteos activos/programados/finalizados
- Botón "Crear Nuevo Sorteo"
- Estado de cada sorteo (activo, programado, en curso, finalizado)

**Parámetros para Crear Sorteo**:

| Campo                      | Tipo         | Descripción                                | Ejemplo                                     |
| -------------------------- | ------------ | ------------------------------------------ | ------------------------------------------- |
| **Nombre del Premio**      | Texto        | Título del sorteo                          | "iPhone 15 Pro Max"                         |
| **Descripción**            | Texto largo  | Detalle completo del premio                | "iPhone 15 Pro Max 256GB color negro..."    |
| **Imagen del Premio**      | Archivo      | Foto del premio físico                     | iphone15.jpg                                |
| **Puntos por Ticket**      | Número       | Costo de cada ticket                       | 100                                         |
| **Tickets Disponibles**    | Número       | Total de tickets del sorteo                | 1000                                        |
| **Tickets Mínimos**        | Número       | Mínimo para realizar sorteo                | 500                                         |
| **Fecha de Inicio**        | Fecha + Hora | Cuándo inicia venta de tickets             | 01/11/2025 10:00                            |
| **Fecha de Cierre**        | Fecha + Hora | Cuándo cierra venta de tickets             | 30/11/2025 23:59                            |
| **Fecha del Sorteo**       | Fecha + Hora | Cuándo se realiza el sorteo                | 01/12/2025 18:00                            |
| **Método de Sorteo**       | Selector     | Aleatorio / En vivo                        | Aleatorio                                   |
| **Estado**                 | Selector     | Programado / Activo / Cerrado / Finalizado | Programado                                  |
| **Términos y Condiciones** | Texto largo  | Bases del sorteo                           | "Participan usuarios mayores de 18 años..." |

**Gestión del Sorteo**:

**Durante Venta de Tickets**:

- Contador en tiempo real de tickets vendidos
- Lista de participantes
- Estadísticas de participación

**Ejecución del Sorteo**:

- Botón "Realizar Sorteo" (disponible después de fecha de cierre)
- Sistema selecciona ganador aleatoriamente
- Registro automático del ganador
- Notificación automática al ganador

**Después del Sorteo**:

- Visualización del ganador
- Historial de participantes
- Opción de exportar resultados
- Estado cambia a "Finalizado"

**Validaciones**:

- No se pueden vender más tickets que el total disponible
- Fecha de cierre debe ser anterior a fecha de sorteo
- No se puede realizar sorteo antes de la fecha programada
- Si no se alcanza tickets mínimos, opción de cancelar o extender

---

## 8. Funcionalidades Comunes del Panel

### 8.1 Dashboard General

**Visualización**:

- Resumen de puntos totales en circulación
- Total de usuarios por nivel (Bronce, Silver, Gold)
- Actividad de gamificación (últimos 7 días)
- Top 10 actividades que más puntos generan
- Gráficos de tendencias

### 8.2 Registro de Cambios

**Funcionalidad**:

- Historial completo de cambios de configuración
- Fecha, hora, usuario que realizó el cambio
- Configuración anterior vs nueva
- Exportación de logs de auditoría

### 8.3 Permisos de Administración

**Roles**:

| Rol             | Permisos                                             |
| --------------- | ---------------------------------------------------- |
| **Super Admin** | Acceso completo a todas las configuraciones          |
| **Admin**       | Configuración de puntos y misiones                   |
| **Editor**      | Solo edición de contenidos (descripciones, imágenes) |
| **Viewer**      | Solo visualización, sin capacidad de edición         |

### 8.4 Exportación e Importación

**Funcionalidades**:

- Exportar configuración completa en formato JSON
- Importar configuración desde archivo
- Plantillas predefinidas de configuración
- Backup automático antes de cambios importantes

---

## 9. Validaciones y Reglas Generales

### 9.1 Validaciones del Sistema

- Todos los campos numéricos deben ser mayores o iguales a cero
- Las fechas de caducidad deben ser futuras
- No se pueden crear rangos de niveles superpuestos
- Los multiplicadores deben mantener orden ascendente (Bronce ≤ Silver ≤ Gold)
- Los puntos requeridos para canjes deben ser mayores a cero

### 9.2 Confirmaciones Requeridas

El sistema solicitará confirmación antes de:

- Cambiar rangos de niveles (puede afectar usuarios activos)
- Modificar multiplicadores (impacta futuras transacciones)
- Desactivar actividades que otorgan puntos
- Eliminar misiones con usuarios participando
- Eliminar productos de canje con canjes pendientes

### 9.3 Notificaciones Automáticas

El sistema enviará alertas cuando:

- Stock de vouchers digitales < 10%
- Sorteo próximo a alcanzar tickets mínimos
- Misión próxima a caducar (7 días antes)
- Cambio de nivel de usuario (por cambios en rangos)

---

*Documento funcional para el Panel de Administración del módulo de Gamificación MCSP - Versión 1.0*
