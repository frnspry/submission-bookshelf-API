// melakukan import Hapi dan routes dari routes.js
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

// melakukan inisialisasi server Hapi
const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // melakukan pendaftaran route yang telah didefinisikan pada routes.js
  server.route(routes);

  // menjalankan server
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

// menjalankan fungsi
init();
