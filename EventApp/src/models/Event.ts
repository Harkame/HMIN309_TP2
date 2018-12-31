export class Event
{
  public id: any;
  public name: string = '';
  public date: string;
  public dateTime: number = 0;
  public time: string;
  public type: string = '';
  public description: string = '';
  public notification: boolean = false;
  public pathFile: string = '';
  public fileName: string = '';
  public fileURL: string = '';

  public address : string = '';
  public latitude: any;
  public longitude: any;

    constructor()
    {
      this.latitude = 48.856614;
      this.longitude = 2.3522219;
    }
}
