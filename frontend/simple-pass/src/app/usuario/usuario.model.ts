export class Usuario {
  constructor(
    public id: string,
    public name: string,
    public CPF: string,
    public email: string,
    public telephone: number,
    public picture: string,
    public promoter = false,
    public events?: string[]
  ) {
    }
    getSimpleName() : string {
      return this.name.split("\\s")[0];
    }
  }
