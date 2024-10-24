export default async () => {
    console.log("Rolling up data");
    const summary = await rollUpWeatherData()
    if(!summary)
        throw new Error("Something went wrong while data rolling up");
    
    console.log("Data rolled up successfully\n" + summary);
        
}