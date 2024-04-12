export default function sanitizeInput(input) {
  // Remove accents
  input = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // This regular expression matches any character that is not a letter, number, or space
  const regex = /[^a-z0-9 ]/gi;

  // Replace matched characters with an empty string
  return input.replace(regex, "");
}
