export function removeSpecialCharacters(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s]/g, "");
}

/**
 *
 * @param e texto referente a formatação de CNPJ ou CPF informada
 * @returns retorna o CNPJ ou CPF formatado
 */

export const handleFormatCnpjCpf = (e: string) => {
  if (e) {
    let documento = e.replace(/[^\d]/gi, "");

    if (documento.length === 11) {
      documento = documento.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        (regex, arg1, arg2, arg3, arg4) => `${arg1}.${arg2}.${arg3}-${arg4}`
      );
    } else if (documento.length > 11) {
      documento = documento.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        (regex, arg1, arg2, arg3, arg4, arg5) =>
          `${arg1}.${arg2}.${arg3}/${arg4}-${arg5}`
      );
    }
    return documento;
  }
  return e;
};
/**
 *
 * @param e texto referente a formatação de CNPJ ou CPF informada
 * @returns retorna o CNPJ ou CPF formatando ocultando os últimos digitos com um '*'
 */

export function handleHideLastDigitsCpfOrCnpj(document) {
  if (document.length === 18) {
    const cpfFormatted = document.replace(
      /(\d{3}\.\d{3}\.)(\d{3})(-\d{2})/,
      "$1***$3"
    );

    const splitCpf = cpfFormatted.split("/");

    const formatSplitCnpj = `${splitCpf[0]}/****-**`;

    return formatSplitCnpj;
  } else {
    const cpfFormatted = document.replace(
      /(\d{3}\.\d{3}\.)(\d{3})(-\d{2})/,
      "$1***$3"
    );

    const splitCpf = cpfFormatted.split("-");

    const formatSplitCpf = `${splitCpf[0]}-**`;

    return formatSplitCpf;
  }
}
