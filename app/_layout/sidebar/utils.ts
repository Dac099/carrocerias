export function getTitleFromPath(pathname: string): string {
  if(pathname.startsWith('/generator')) return 'Generador';
  if(pathname.startsWith('/quotes')) return 'Cotizaciones';
  if(pathname.startsWith('/clients')) return 'Clientes';
  if(pathname.startsWith('/products')) return 'Productos';
  if(pathname.startsWith('/suppliers')) return 'Proveedores';
  return 'Inicio';
}