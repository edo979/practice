export const subjects = {
  hed: {
    6: ['Bosanski jezik', 'Engleski jezik', 'Njemački jezik'],
    7: ['Bosanski jezik', 'Engleski jezik', 'Njemački jezik'],
    8: [
      'Bosanski jezik',
      'Engleski jezik',
      'Njemački jezik',
      'Matematika',
      'Fizika',
      'Hemija',
      'Biologija',
      'Geografija',
      'Historija',
      'Tehnička kultura',
      'Informatika',
      'Likovna kultura',
      'Muzička kultura',
      'TiZo',
      'Islamska vjeronauka',
    ],
    9: ['Bosanski jezik', 'Engleski jezik', 'Njemački jezik'],
  } as Record<string, string[]>,
}

export enum Language {
  nje = 'Njemački',
  tur = 'Turski',
  nt = 'Njemački i Turski',
}
