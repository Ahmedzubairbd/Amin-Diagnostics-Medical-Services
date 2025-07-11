import payload from 'payload';

declare global {
  // eslint-disable-next-line no-var
  var payload: typeof payload | undefined;
}

if (!global.payload) {
  global.payload = payload;
}

export default payload;