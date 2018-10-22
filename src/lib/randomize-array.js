// This is the Fisher-Yates shuffle implemented by Mike Bostock:
// https://bost.ocks.org/mike/shuffle/
export default function randomizeArray(array) {
  if (!array) return [];

  let m = array.length,
    t, i;

  // While there are elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
