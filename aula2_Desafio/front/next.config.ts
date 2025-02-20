/** @type {import('next').NextConfig} */
const nextConfig = {

  images:
  {
      remotePatterns: [
          {protocol: "https", 
          hostname: "rickandmortyapi.com"}]
  },

  rewrites: () => 
  { 
      return [
          {
              source: "/",  //nome que vai aparecer na url
              destination: "/home", //nome da pasta de destino identica

          },
      ]
  }
};

export default nextConfig;