export const validateUsername = (username) => {
  if (!username || username.trim() === '') {
    return {
      isValid: false,
      message: 'Por favor, digite um nome de usuário'
    };
  }

  const trimmedUsername = username.trim();

  if (trimmedUsername.length > 39) {
    return {
      isValid: false,
      message: 'Nome de usuário muito longo (máximo 39 caracteres)'
    };
  }

  const usernameRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;
  
  if (!usernameRegex.test(trimmedUsername)) {
    return {
      isValid: false,
      message: 'Nome de usuário inválido. Use apenas letras, números e hífens'
    };
  }

  return {
    isValid: true,
    username: trimmedUsername
  };
};

export const debounce = (func, delay) => {
  let timeoutId;
  
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
