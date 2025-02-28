// This file is a server component that generates static params for the artist pages

export function generateStaticParams() {
  // Define the artist IDs that will be pre-rendered at build time
  const artistIds = ['1', '2', '3', '4', '5', '6'];
  
  return artistIds.map((id) => ({
    id: id,
  }));
}