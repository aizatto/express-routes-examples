process.on('unhandledRejection', error => {
  console.error('Unhandled Promise Rejection:');
  console.error((error && error.stack) || error);
});
