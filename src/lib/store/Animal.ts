import { get, writable, derived, type Writable, type Readable } from "svelte/store";

type globalInfoType = {
  specie:"dog"|"cat",
  currentWeight:number,
  bodyConditionScore:number,
  appliedEnergyNeed:number

};
type globalInfoSettingsType = {
  maintenanceEnergyNeededFactor:{dog:number, cat:number},
  idealWeightPow:{dog:number, cat:number},
  proteinFactor:{dog:number, cat:number}
};


const settings:globalInfoSettingsType={
    "maintenanceEnergyNeededFactor":{"dog":130, "cat":100},
    "idealWeightPow":{"dog":0.75, "cat":0.67},
    "proteinFactor":{"dog":60, "cat":65},
  }
export const globalInfo:Writable<globalInfoType> = writable(
  {
    specie:"dog",
    currentWeight:5,
    bodyConditionScore:5,
    appliedEnergyNeed:200,
  }
);

type calculatedInfoType = {
  idealWeight:number,
  maintenanceEnergyNeed:number,
  proteinNeed:number,
  calciumNeed:number,
  phosphoreNeed:number
};
export const calculatedInfo:Readable<calculatedInfoType> = derived( globalInfo, ($globalInfo)=>{
  let idealWeight = calculateIdealWeight($globalInfo);
  let maintenanceEnergyNeed = calculateMaintenanceEnergyNeed($globalInfo, idealWeight);
  let proteinNeed = calculateProteinNeed($globalInfo, maintenanceEnergyNeed);
  let calciumNeed = calculateCalciumNeed(maintenanceEnergyNeed);
  let phosphoreNeed = calculatePhosphorusNeed(maintenanceEnergyNeed);

  return{
    idealWeight,
    maintenanceEnergyNeed,
    proteinNeed,
    calciumNeed,
    phosphoreNeed
  };
});

// Fonction qui calcule le poids idéal à partir du poids actuel et du NEC
function calculateIdealWeight($globalInfo:globalInfoType):number{
  return Math.round($globalInfo.currentWeight * ( 1 - ( $globalInfo.bodyConditionScore - 5)/10 )*100)/100;
}

function calculateMaintenanceEnergyNeed($globalInfo:globalInfoType, $idealWeight:number):number{
  return Math.round(settings["maintenanceEnergyNeededFactor"][$globalInfo.specie] * Math.pow($idealWeight, settings["idealWeightPow"][$globalInfo.specie])*100)/100;
}

function calculateProteinNeed($globalInfo:globalInfoType, maintenanceEnergyNeed:number):number{
  return Math.round(maintenanceEnergyNeed * settings["proteinFactor"][$globalInfo.specie] / 1000*100)/100;
}
function calculateCalciumNeed(maintenanceEnergyNeed:number):number{
  return Math.round(maintenanceEnergyNeed * 1.6 / 1000*100)/100;
}
function calculatePhosphorusNeed(maintenanceEnergyNeed:number):number{
  return Math.round(maintenanceEnergyNeed * 1.2 / 1000*100)/100;
}

/** Store à mettre en "objetJS" / writable custom */



/** TODO : Store à simplifer */

class Animal {
  specie:Writable<"cat"|"dog">=writable("dog")
  globalInfo=writable({
    species:"cat",
    actualWeight:5

  });
  constructor() {
    
  }
  setSpecie(specie:"cat"|"dog"){
    this.specie.update((value:"cat"|"dog")=>{value = specie; return value;})
  }

  getGlobalInfo(){
    return this.globalInfo.subscribe;
  }
  getSpecie(){return this.specie;}
}
export const myAnimal:Animal = new Animal();