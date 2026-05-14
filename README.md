# Marketplace Multi-Vertical Front Complete

Frontend React + Vite para marketplace multi-vertical.

## Incluye

- React con Vite y npm
- Ant Design + styled-components
- Redux Toolkit para auth, permisos, carrito, tema e idioma
- React Router con lazy routes
- Menús por rol: admin, seller, customer
- Menú público responsive
- Drawer de carrito global
- Storefront público por tienda: `/stores/:storeSlug`
- Página de tiendas: `/stores`
- Marketplace global: `/marketplace`
- Detalle de producto con galería y miniaturas
- Selector de variantes con preview por imagen
- Tabla reutilizable con buscador y filtros
- Modal CRUD reutilizable
- Servicios Axios separados
- Upload service
- Base de personalización visual por tienda
- Acceso demo por rol desde login para validar navegación sin backend

## Correr el proyecto

```bash
cd marketplace-front-complete
cp .env
npm install
npm run dev
```

En Windows:

```bash
copy .env
npm install
npm run dev
```

## Variables de entorno

```env
VITE_API_BASE_URL=http://localhost:4000/api
VITE_APP_NAME=Marketplace Multi-Vertical
VITE_DEFAULT_LOCALE=es
VITE_DEFAULT_PRIMARY_COLOR=#111111
VITE_ENABLE_STORE_THEMES=true
VITE_PUBLIC_ASSETS_URL=http://localhost:4000
```

## Rutas principales

- `/` inicio
- `/marketplace` marketplace global
- `/stores` listado de tiendas
- `/stores/tech-importados` storefront de tienda
- `/stores/tech-importados/products` productos de tienda
- `/seller` panel seller
- `/admin` panel admin
- `/customer/cart` carrito de cliente

## Nota

Los datos mock están en `src/data/mockData.js` para permitir revisar UI, permisos, menús y storefronts antes de conectar endpoints reales.
