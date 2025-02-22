
import { TFuel } from "@/app/types";

const getFuel=async():Promise<TFuel[]|null>=>{
    try{
        const res=await fetch(`${process.env.NEXTAUTH_URL}/api/fuel`);

        if(res.ok){
            const fuel=await res.json();
            return fuel;
        }

    }catch(error){
        console.log(error);
        
    }
    return null;
};


export default async function FuelList(){
    const fuel=await getFuel();

    return(
        <ul>
            {fuel && fuel.map((fuel:TFuel)=>(
                <>
                    <li key={fuel.id}>{fuel.FuelName}</li>
                </>
            ))}
        </ul>
    );
}