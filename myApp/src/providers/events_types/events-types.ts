export class EventsTypesProvider
{
    private static types: string[] =
    [
        'Rendez-vous',
        'Raid',
        'Sport'
    ];

    public static getTypes()
    {
        return this.types;
    }
}
