export function emailValidacao(email) {
  const re = /\S+@\S+\.\S+/;
  if (!email) {
    return 'O email não pode estar vazio!';
  }
  if (!re.test(email)) {
    return 'Opa! Precisamos de um endereço de e-mail válido!';
  }
  return '';
}
