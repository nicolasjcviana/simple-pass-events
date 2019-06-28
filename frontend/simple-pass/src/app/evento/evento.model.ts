export class Evento {
  constructor(
    public id: string,
    public title: string,
    public desc: string,
    public fullDesc: string,
    public ticketValue: number,
    public location: string,
    public dateTime?: Date,
    public qtOfGuests?: number,
    public beginOfTheSells?: Date,
    public endOfTheSells?: Date,
    public picture: string = '../../assets/evento2.jpg',
    public guests?: string[],
    public guestsConfirmeds?: string[]
  ) { }
}
