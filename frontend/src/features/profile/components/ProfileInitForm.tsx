import { useState } from "react";
import { FormWrapper } from "../../../components/ui/FormWrapper";
import { SubmitInput, 
    TextInput, 
    RadioInput,
    RangeInput
} from "../../../components/ui/FormInput";
import { useInitializeProfile } from "../hooks/useInitializeProfile";
import { boulderGradeMapHueco, routeGradeMapYDS } from "../../../utils/conversions";


export const ProfileInitForm = () => {
    const { initProfile, isLoading, error } = useInitializeProfile();

    const disciplineOptions = ["Bouldering", "Sport Climbing", "Trad Climbing", "Other"];
    

    
    type ProfileOptionsInput = {
        dob: string;
        location: string;
        discipline: string;
        hardestBoulder: number;
        hardestRoute: number;
        height:number;
        weight:number;
        maxHang: number;
        maxPull: number;
        experience:string
    }
    const date = new Date();
    const [input, setInput] = useState<ProfileOptionsInput>({
        dob: "",
        location: "",
        discipline: "",
        hardestBoulder: 0,
        hardestRoute: 0,
        height: 0,
        weight: 0,
        maxHang: 60,
        maxPull: 60,
        experience: (date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()),
    });

    const [boulderingGrade, setBoulderingGrade] = useState<string>("N/A");
    const [routeGrade, setRouteGrade] = useState<string>("N/A");

    const handleChange = (e: any) => {
        if(e.target.id === "hardestBoulder") {
            setBoulderingGrade(boulderGradeMapHueco.get(parseInt(e.target.value)) as string);
        }
        if(e.target.id === "hardestRoute") {
            setRouteGrade(routeGradeMapYDS.get(parseInt(e.target.value)) as string);
        }
        setInput({
            ...input,
            [e.target.id]: e.target.value
        });
    };
    const handleSubmit = async (e:any) => {
        if(input.discipline === "Other") {
            input.discipline = (document.getElementById("discipline--other") as HTMLInputElement).value;
        }
        e.preventDefault();
        await initProfile(input);
    };
    return (
        <FormWrapper error={error} handleSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold leading-none">Personal Info<br></br><span className="text-sm text-gray-500 leading-tight">All of this information is optional and can be edited on your profile page at a later time</span></h1>
            <TextInput 
                label="Date of Birth" 
                id="dob" 
                type="date" 
                handleChange={handleChange} 
            />
            <TextInput 
                label="Location" 
                id="location" 
                handleChange={handleChange} 
            />
            <div className="flex gap-8">
                <TextInput 
                    type="number" 
                    label="Height (in)" 
                    id="height" 
                    handleChange={handleChange} 
                    inputStyles="w-24 md:w-28"
                />
                <TextInput 
                    type="number" 
                    label="Weight (lbs)" 
                    id="weight" 
                    handleChange={handleChange} 
                    inputStyles="w-24 md:w-28"
                />
            </div>
            <TextInput 
                label="When did you start climbing?" 
                id="experience"
                type="date" 
                handleChange={handleChange} 
            />
            <RadioInput 
                label="Favorite Discipline" id="discipline" 
                name="discipline" 
                options={disciplineOptions} 
                handleChange={handleChange} 
                selected={input.discipline}
            />
            <RangeInput 
                label="Hardest Boulder Climbed" 
                id="hardestBoulder" handleChange={handleChange} 
                min={0} 
                max={18} 
                step={1} 
                currentValue={input.hardestBoulder} 
                currentValueString={boulderingGrade} 
            />
            <RangeInput 
                label="Hardest Route Climbed" 
                id="hardestRoute" handleChange={handleChange} 
                min={0} 
                max={28} 
                step={1} 
                currentValue={input.hardestRoute} 
                currentValueString={routeGrade} 
            />           
            <RangeInput 
                label="Max Hang" 
                subLabel="Hang for ~5 seconds on 20mm edge" 
                id="maxHang" labelStyles="leading-tight" 
                handleChange={handleChange} 
                min={60} 
                max={220} 
                step={5} 
                currentValue={input.maxHang}
                currentValueString={input.maxHang == 60 ? "N/A" : (input.maxHang.toString() + "% Bodyweight")} 
            />
            <RangeInput 
                label="Max Pull-Up" 
                id="maxPull" 
                labelStyles="leading-tight"
                handleChange={handleChange} 
                min={60} 
                max={220} 
                step={5} 
                currentValue={input.maxPull} 
                currentValueString={input.maxPull == 60 ? "N/A" : (input.maxPull.toString() + "% Bodyweight")} 
            />

            <SubmitInput 
                value="Confirm Information"  
                id="loginSubmit" 
                disabled={isLoading}
            />

            {error && <p className="text-red-500">{error}</p>}
        </FormWrapper>
    )
}