export class Event
{
  public id: any;
  public name: string = '';
  public date: string;
  public time: string;
  public type: string = '';
  public description: string = '';
  public notification: boolean = false;
  public pathFile: string = '';
  public fileName: string = '';
  public fileURL: string = '';
  public geolocationLatitude: any;
  public geolocationLongitude: any;

    constructor()
    {
    }
}
