export class Usuario {
    constructor(
      public id: string,
      public name: string,
      public CPF: string,
      public email: string,
      public telephone: number,
      public picture: string,
      public events?: string[],
      public confirmed?: boolean
    ) { }
  }
