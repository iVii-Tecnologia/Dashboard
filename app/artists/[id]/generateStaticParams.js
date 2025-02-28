// Este arquivo é um componente do servidor que gera parâmetros estáticos para as páginas de artistas

export function generateStaticParams() {
  // Define os IDs de artistas que serão pré-renderizados no momento da construção
  const artistIds = ['1', '2', '3', '4', '5', '6'];
  
  return artistIds.map((id) => ({
    id: id,
  }));
}