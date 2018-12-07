export class Event
{
  public pathFile: string;
  public fileName: string;
  public fileURL: string;

    constructor(public name: string, public type: string, public description: string, public notification: boolean)
    {
    }
}
