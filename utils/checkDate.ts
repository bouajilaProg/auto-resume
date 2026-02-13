export function checkDate(data: string): boolean {
  const mmYYYY = /^(0[1-9]|1[0-2])-(\d{4})$/;
  const yyyy = /^\d{4}$/;

  return mmYYYY.test(data) || yyyy.test(data);
}

