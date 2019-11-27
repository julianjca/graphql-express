const app = require('./src');

const PORT = process.env.PORT || 8080;

app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`));
