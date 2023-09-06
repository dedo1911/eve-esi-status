export async function load({ fetch, depends }) {
  depends('app:esistatus');
  try {
    const response = await fetch('https://esi.evetech.net/status.json?version=latest')
    return {
      esi: await response.json(),
      updateDate: new Date(),
      err: null
    }
  } catch (err) {
    return {
      err: err,
      esi: null,
      updateDate: new Date(),
    }
  }
}
